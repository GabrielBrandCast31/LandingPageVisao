"""Serviço de e-mail transacional com dois backends:

  * ConsoleEmailBackend — escreve em `backend/outbox/` (dev local).
  * ResendEmailBackend  — usa a API da Resend (produção).

A escolha é automática conforme `settings.RESEND_API_KEY`. O código que
consome `send_diagnosis_email` não precisa saber qual backend está ativo.
"""

from __future__ import annotations

import asyncio
import base64
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Protocol

import httpx

from ..config import settings
from ..models.lead import Lead
from .profiles import get_profile

OUTBOX_DIR = Path(__file__).resolve().parent.parent.parent / "outbox"


class EmailBackend(Protocol):
    async def send(
        self,
        *,
        to: str,
        subject: str,
        html: str,
        pdf_filename: str,
        pdf_bytes: bytes,
    ) -> dict[str, Any]: ...


class ConsoleEmailBackend:
    """Grava o e-mail e o PDF no diretório outbox/ — útil para dev."""

    def __init__(self, outbox: Path = OUTBOX_DIR) -> None:
        self.outbox = outbox
        self.outbox.mkdir(parents=True, exist_ok=True)

    async def send(
        self,
        *,
        to: str,
        subject: str,
        html: str,
        pdf_filename: str,
        pdf_bytes: bytes,
    ) -> dict[str, Any]:
        ts = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
        safe_email = re.sub(r"[^a-zA-Z0-9_.-]", "_", to)
        stem = self.outbox / f"{ts}_{safe_email}"

        # Grava HTML + PDF lado a lado
        await asyncio.to_thread((stem.with_suffix(".html")).write_text, html, "utf-8")
        await asyncio.to_thread(
            (stem.with_suffix(f".{pdf_filename.rsplit('.', 1)[-1]}")).write_bytes,
            pdf_bytes,
        )

        print(f"[email/console] → {to} · {subject} · {stem}.html")
        return {"backend": "console", "outbox": str(stem) + ".html"}


class ResendEmailBackend:
    """Wrapper minimalista da API da Resend."""

    def __init__(
        self,
        api_key: str,
        from_addr: str,
        reply_to: str | None = None,
    ) -> None:
        self.api_key = api_key
        self.from_addr = from_addr
        self.reply_to = reply_to

    async def send(
        self,
        *,
        to: str,
        subject: str,
        html: str,
        pdf_filename: str,
        pdf_bytes: bytes,
    ) -> dict[str, Any]:
        payload = {
            "from": self.from_addr,
            "to": [to],
            "subject": subject,
            "html": html,
            "attachments": [
                {
                    "filename": pdf_filename,
                    "content": base64.b64encode(pdf_bytes).decode("ascii"),
                }
            ],
        }
        if self.reply_to:
            payload["reply_to"] = self.reply_to

        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json=payload,
            )
            response.raise_for_status()
            return {"backend": "resend", **response.json()}


def get_backend() -> EmailBackend:
    if settings.RESEND_API_KEY:
        return ResendEmailBackend(
            api_key=settings.RESEND_API_KEY,
            from_addr=settings.EMAIL_FROM,
            reply_to=settings.EMAIL_REPLY_TO,
        )
    return ConsoleEmailBackend()


def _render_html(lead: Lead) -> tuple[str, str]:
    """Retorna (subject, html) do e-mail de diagnóstico."""
    profile = get_profile(lead.profile or "consumidor_calorico")
    first_name = lead.name.split(" ")[0]

    subject = f"{first_name}, seu diagnóstico chegou — Pega a Visão!"
    booking = settings.CALENDAR_BOOKING_URL
    site = settings.PUBLIC_SITE_URL

    html = f"""\
<!doctype html>
<html lang="pt-BR">
<body style="margin:0;padding:0;background:#120e1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#f9faf9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#211b2d;border-radius:20px;overflow:hidden;border:1px solid #453a58;">
        <tr><td style="background:linear-gradient(135deg, #120e1a 0%, #311E59 48%, #8350F2 100%);padding:36px 32px 30px 32px;color:#ffffff;">
          <div style="display:inline-block;height:8px;width:8px;border-radius:999px;background:{profile.accent_color};vertical-align:middle;margin-right:8px;"></div>
          <span style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;opacity:.9;font-weight:600;vertical-align:middle;">Seu perfil financeiro</span>
          <div style="font-size:30px;font-weight:800;margin-top:14px;line-height:1.1;">{profile.name}</div>
          <div style="margin-top:12px;font-size:15px;line-height:1.55;opacity:.95;">{profile.summary}</div>
        </td></tr>

        <tr><td style="padding:30px 32px 8px 32px;color:#cfc9dc;">
          <p style="margin:0 0 14px 0;font-size:16px;line-height:1.55;color:#f9faf9;">Oi, {first_name}! Bom te receber por aqui.</p>
          <p style="margin:0 0 14px 0;font-size:15px;line-height:1.65;">{profile.diagnosis}</p>
          <p style="margin:0 0 6px 0;font-size:15px;line-height:1.65;color:#f9faf9;"><b>Próximo passo recomendado:</b> {profile.recommended_service}. A primeira conversa é gratuita.</p>
        </td></tr>

        <tr><td style="padding:22px 32px 32px 32px;" align="center">
          <a href="{booking}" style="display:inline-block;background:linear-gradient(135deg,#F2E850 0%,#C0F685 100%);color:#120e1a;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:999px;font-size:15px;">Agendar reunião gratuita</a>
          <div style="margin-top:14px;font-size:13px;color:#a99fbd;">O PDF completo está em anexo neste e-mail.</div>
        </td></tr>

        <tr><td style="padding:20px 32px 28px 32px;border-top:1px solid #453a58;font-size:12px;color:#a99fbd;line-height:1.6;">
          <div style="font-family:'Caveat',cursive;font-size:18px;color:#C0F685;">Pega a Visão!</div>
          Clareza para decidir. Estrutura para crescer.<br/>
          <a href="{site}" style="color:#9a6af7;text-decoration:none;">{site}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""
    return subject, html


async def send_diagnosis_email(lead: Lead, pdf_bytes: bytes) -> dict[str, Any]:
    subject, html = _render_html(lead)
    backend = get_backend()
    return await backend.send(
        to=lead.email,
        subject=subject,
        html=html,
        pdf_filename=f"diagnostico-visao-{lead.id[:8]}.pdf",
        pdf_bytes=pdf_bytes,
    )
