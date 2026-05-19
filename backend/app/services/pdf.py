"""Gerador do diagnóstico em PDF (ReportLab Platypus).

Layout em 2 páginas alinhado à nova identidade visual da Visão:
  Página 1: capa em gradient hero (dark → primary) + badge da cor do perfil
  Página 2: fundo claro pra leitura, com cor do perfil nos títulos e CTA final
"""

from __future__ import annotations

import io

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas as canvas_module
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)

from ..config import settings
from ..models.lead import Lead
from .profiles import get_profile

PAGE_W, PAGE_H = A4

# Tokens espelhados do theme.css
INK = HexColor("#120E1A")
TEXT_DARK = HexColor("#322B41")
PRIMARY = HexColor("#8350F2")
PRIMARY_DARK = HexColor("#311E59")
PRIMARY_900 = HexColor("#1E1633")
ACCENT = HexColor("#F2E850")
SUPPORT = HexColor("#C0F685")


def _styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "tag_white": ParagraphStyle(
            "tag_white",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            textColor=white,
            spaceAfter=4,
            leading=12,
        ),
        "title_cover": ParagraphStyle(
            "title_cover",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=40,
            leading=46,
            textColor=white,
            alignment=TA_LEFT,
            spaceAfter=14,
        ),
        "summary_cover": ParagraphStyle(
            "summary_cover",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=14,
            leading=20,
            textColor=white,
            alignment=TA_LEFT,
        ),
        "h1": ParagraphStyle(
            "h1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=26,
            textColor=INK,
            spaceAfter=12,
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=18,
            textColor=PRIMARY,
            spaceBefore=14,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=11,
            leading=17,
            textColor=TEXT_DARK,
            spaceAfter=8,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=11,
            leading=16,
            textColor=TEXT_DARK,
            leftIndent=14,
            bulletIndent=4,
            spaceAfter=4,
        ),
        "cta": ParagraphStyle(
            "cta",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=18,
            textColor=INK,
            alignment=TA_CENTER,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8,
            leading=12,
            textColor=TEXT_DARK,
            alignment=TA_CENTER,
        ),
    }


def _gradient_fill(
    canvas: canvas_module.Canvas,
    top: HexColor,
    bottom: HexColor,
    *,
    steps: int = 40,
) -> None:
    """Simula um gradient vertical desenhando faixas horizontais."""
    band = PAGE_H / steps
    tr, tg, tb = top.red, top.green, top.blue
    br, bg, bb = bottom.red, bottom.green, bottom.blue
    for i in range(steps):
        t = i / (steps - 1)
        r = tr + (br - tr) * t
        g = tg + (bg - tg) * t
        b = tb + (bb - tb) * t
        canvas.setFillColorRGB(r, g, b)
        canvas.rect(0, PAGE_H - (i + 1) * band, PAGE_W, band + 1, stroke=0, fill=1)


def _draw_cover_background(
    canvas: canvas_module.Canvas, accent: HexColor
) -> None:
    """Capa com gradient hero (dark → primary) + decorações orbitais + badge."""
    canvas.saveState()
    _gradient_fill(canvas, INK, PRIMARY, steps=50)

    # Orbitais translúcidas (alinhadas ao sistema visual)
    canvas.setStrokeColor(white)
    canvas.setLineWidth(0.4)
    canvas.setStrokeAlpha(0.18)
    for r in (200, 260, 320):
        canvas.ellipse(
            PAGE_W / 2 - r,
            PAGE_H * 0.18 - r * 0.4,
            PAGE_W / 2 + r,
            PAGE_H * 0.18 + r * 0.4,
            stroke=1,
            fill=0,
        )

    # Orbe accent
    canvas.setFillColor(accent)
    canvas.setFillAlpha(0.18)
    canvas.circle(PAGE_W - 30 * mm, PAGE_H - 60 * mm, 70 * mm, stroke=0, fill=1)
    canvas.setFillAlpha(1)
    canvas.setStrokeAlpha(1)

    # Wordmark
    canvas.setFillColor(white)
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(20 * mm, PAGE_H - 20 * mm, "VISÃO")
    canvas.setFont("Helvetica", 8)
    canvas.drawString(
        20 * mm,
        PAGE_H - 25 * mm,
        "Consultoria Financeira & Contábil Humanizada",
    )

    # Badge com a cor do perfil — pequeno marcador na altura do título
    badge_y = PAGE_H - 95 * mm
    canvas.setFillColor(accent)
    canvas.circle(22 * mm, badge_y, 5, stroke=0, fill=1)
    canvas.setFillColor(white)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(30 * mm, badge_y - 3, "SEU PERFIL FINANCEIRO")

    # Slogan
    canvas.setFillColor(accent)
    canvas.setFont("Helvetica-Oblique", 18)
    canvas.drawString(20 * mm, 25 * mm, "Pega a Visão!")
    canvas.setFillColor(white)
    canvas.setFont("Helvetica", 9)
    canvas.drawString(20 * mm, 18 * mm, "Clareza para decidir. Estrutura para crescer.")
    canvas.restoreState()


def _draw_inner_chrome(canvas: canvas_module.Canvas, _doc) -> None:
    """Rodapé minimalista nas páginas internas (fundo claro)."""
    canvas.saveState()
    # Faixa superior estreita com a cor do perfil — alinhado ao acento
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(TEXT_DARK)
    canvas.drawString(20 * mm, 12 * mm, "Visão · diagnóstico personalizado")
    canvas.drawRightString(
        PAGE_W - 20 * mm, 12 * mm, settings.PUBLIC_SITE_URL.replace("https://", "")
    )
    canvas.restoreState()


def render_diagnosis_pdf(lead: Lead) -> bytes:
    """Gera o PDF do diagnóstico para um lead já classificado."""
    if not lead.profile:
        raise ValueError("Lead sem perfil definido — rode o scoring primeiro.")

    profile = get_profile(lead.profile)
    accent = HexColor(profile.accent_color)
    styles = _styles()

    buffer = io.BytesIO()
    doc = BaseDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=35 * mm,
        bottomMargin=20 * mm,
        title=f"Diagnóstico — {profile.name}",
        author="Visão",
    )

    cover_frame = Frame(
        20 * mm,
        50 * mm,
        PAGE_W - 40 * mm,
        PAGE_H - 130 * mm,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        showBoundary=0,
    )
    inner_frame = Frame(
        20 * mm,
        20 * mm,
        PAGE_W - 40 * mm,
        PAGE_H - 50 * mm,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
        showBoundary=0,
    )

    doc.addPageTemplates([
        PageTemplate(
            id="cover",
            frames=[cover_frame],
            onPage=lambda c, _d: _draw_cover_background(c, accent),
        ),
        PageTemplate(
            id="inner",
            frames=[inner_frame],
            onPage=_draw_inner_chrome,
        ),
    ])

    first_name = lead.name.split(" ")[0]

    story: list = []

    # ---- Capa ----
    story.append(Paragraph(profile.name, styles["title_cover"]))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph(profile.summary, styles["summary_cover"]))
    story.append(Spacer(1, 14 * mm))
    story.append(
        Paragraph(
            f"Olá, {first_name}. Esse diagnóstico foi feito a partir das suas "
            f"respostas no quiz.",
            styles["summary_cover"],
        )
    )

    # ---- Página 2 ----
    story.append(PageBreak())
    story.append(Paragraph(f"Oi, {first_name}!", styles["h1"]))
    story.append(
        Paragraph(
            "Esse é um retrato curto da sua situação financeira agora — sem "
            "julgamento e sem economês. A leitura leva 3 minutos.",
            styles["body"],
        )
    )

    h2_accent = ParagraphStyle(
        "h2_accent", parent=styles["h2"], textColor=accent
    )

    story.append(Paragraph("O que vimos", h2_accent))
    story.append(Paragraph(profile.diagnosis, styles["body"]))

    story.append(Paragraph("3 sinais que confirmam esse perfil", h2_accent))
    for sign in profile.signals:
        story.append(Paragraph(f"• {sign}", styles["bullet"]))

    story.append(Paragraph("Próximo passo recomendado", h2_accent))
    story.append(
        Paragraph(
            f"Pra você, o caminho é começar pela <b>{profile.recommended_service}</b>. "
            "Na primeira reunião (gratuita) a gente desenha o seu plano juntos.",
            styles["body"],
        )
    )

    story.append(Spacer(1, 12 * mm))
    story.append(
        Paragraph(
            f'<para alignment="center"><b>Agende sua reunião gratuita</b><br/>'
            f'{settings.CALENDAR_BOOKING_URL}</para>',
            styles["cta"],
        )
    )
    story.append(Spacer(1, 6 * mm))
    story.append(
        Paragraph(
            "Pega a Visão · Azevedo Guimarães Produções LTDA · CNPJ "
            "54.589.204/0001-39",
            styles["footer"],
        )
    )

    doc.build(story)
    return buffer.getvalue()
