"""Envio de leads para uma planilha Google via webhook (Apps Script).

A planilha de controle expõe um Web App do Google Apps Script que recebe
um POST JSON e faz `appendRow`. Mantemos a chamada isolada e tolerante a
falhas para que uma indisponibilidade do Sheets nunca quebre o funil.
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any

import httpx

from ..config import settings
from ..models.lead import Lead
from .profiles import PROFILES

logger = logging.getLogger(__name__)


def _serialize_lead(lead: Lead) -> dict[str, Any]:
    profile = PROFILES.get(lead.profile or "")
    created_at = lead.created_at or datetime.now(timezone.utc)
    return {
        "lead_id": lead.id,
        "created_at": created_at.isoformat(),
        "name": lead.name,
        "email": lead.email,
        "phone": lead.phone,
        "age": lead.age,
        "gender": lead.gender,
        "city": lead.city,
        "profile_id": lead.profile,
        "profile_name": profile.name if profile else None,
        "recommended_service": profile.recommended_service if profile else None,
        "source": lead.source,
        "lgpd_consent": lead.lgpd_consent,
        "quiz_answers": lead.quiz_answers or {},
    }


async def send_lead_to_sheets(lead: Lead) -> dict[str, Any]:
    """POST do lead para o webhook do Apps Script. Nunca levanta exceção."""
    webhook_url = settings.GOOGLE_SHEETS_WEBHOOK_URL
    if not webhook_url:
        return {"sent": False, "reason": "webhook_url_not_configured"}

    payload = _serialize_lead(lead)

    try:
        async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
            response = await client.post(webhook_url, json=payload)
            response.raise_for_status()
        logger.info("[sheets] lead %s registrado na planilha", lead.id)
        return {"sent": True, "status_code": response.status_code}
    except httpx.HTTPError as exc:
        logger.warning("[sheets] falha ao registrar lead %s: %s", lead.id, exc)
        return {"sent": False, "reason": str(exc)}
