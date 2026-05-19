"""Endpoints CRUD básicos para Leads.

A criação é pública (vem do quiz da landing page). A listagem está aberta no
Sprint 0 para facilitar o teste; será protegida por auth em sprint futuro.
"""

import asyncio

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..models.lead import Lead
from ..schemas.lead import LeadCreate, LeadOut
from ..services.pdf import render_diagnosis_pdf

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("", response_model=LeadOut, status_code=status.HTTP_201_CREATED)
async def create_lead(
    payload: LeadCreate,
    db: AsyncSession = Depends(get_db),
) -> Lead:
    lead = Lead(**payload.model_dump())
    db.add(lead)
    await db.commit()
    await db.refresh(lead)
    return lead


@router.get("", response_model=list[LeadOut])
async def list_leads(
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
) -> list[Lead]:
    result = await db.execute(
        select(Lead).order_by(Lead.created_at.desc()).limit(limit)
    )
    return list(result.scalars().all())


@router.get("/{lead_id}", response_model=LeadOut)
async def get_lead(lead_id: str, db: AsyncSession = Depends(get_db)) -> Lead:
    lead = await db.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    return lead


@router.delete("/{lead_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_lead(lead_id: str, db: AsyncSession = Depends(get_db)) -> None:
    """Exclusão LGPD — direito ao esquecimento."""
    lead = await db.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    await db.delete(lead)
    await db.commit()


@router.get("/{lead_id}/diagnosis.pdf")
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
