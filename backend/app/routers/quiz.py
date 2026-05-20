"""Endpoint principal do funil: recebe o quiz, classifica, persiste e dispara o e-mail."""

import asyncio

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession

from ..config import settings
from ..database import get_db
from ..models.lead import Lead
from ..schemas.quiz import ProfileOut, QuizResult, QuizSubmit
from ..services.email import send_diagnosis_email
from ..services.pdf import render_diagnosis_pdf
from ..services.profiles import get_profile
from ..services.scoring import classify
from ..services.sheets import send_lead_to_sheets

router = APIRouter(prefix="/quiz", tags=["quiz"])


@router.post("/submit", response_model=QuizResult, status_code=201)
async def submit_quiz(
    payload: QuizSubmit,
    background: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
) -> QuizResult:
    profile_id = classify(payload.answers)
    profile = get_profile(profile_id)

    lead = Lead(
        **payload.lead.model_dump(),
        profile=profile_id,
        quiz_answers=payload.answers,
    )
    db.add(lead)
    await db.commit()
    await db.refresh(lead)

    # Gera PDF e dispara e-mail em background — não bloqueia a resposta da API
    pdf_bytes = await asyncio.to_thread(render_diagnosis_pdf, lead)
    background.add_task(send_diagnosis_email, lead, pdf_bytes)
    background.add_task(send_lead_to_sheets, lead)

    return QuizResult(
        lead_id=lead.id,
        profile=ProfileOut(
            id=profile.id,
            name=profile.name,
            summary=profile.summary,
            diagnosis=profile.diagnosis,
            recommended_service=profile.recommended_service,
            signals=profile.signals,
            accent_color=profile.accent_color,
        ),
        pdf_url=f"/api/leads/{lead.id}/diagnosis.pdf",
        booking_url=settings.CALENDAR_BOOKING_URL,
        whatsapp_url=f"https://wa.me/{settings.WHATSAPP_NUMBER}",
        email_dispatch={"queued": True, "backend": settings.email_backend},
    )


@router.get("/leads/{lead_id}/diagnosis.pdf")
async def download_diagnosis(
    lead_id: str,
    db: AsyncSession = Depends(get_db),
) -> Response:
    lead = await db.get(Lead, lead_id)
    if not lead or not lead.profile:
        raise HTTPException(status_code=404, detail="Diagnóstico não encontrado")

    pdf_bytes = await asyncio.to_thread(render_diagnosis_pdf, lead)
    filename = f"diagnostico-visao-{lead.id[:8]}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'inline; filename="{filename}"'},
    )
