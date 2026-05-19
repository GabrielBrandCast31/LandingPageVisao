"""Schemas Pydantic para o quiz de qualificação."""

from typing import Any

from pydantic import BaseModel, EmailStr, Field


class QuizLead(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    phone: str = Field(..., min_length=8, max_length=32)
    age: int | None = Field(None, ge=14, le=120)
    gender: str | None = Field(None, max_length=32)
    city: str | None = Field(None, max_length=120)
    lgpd_consent: bool = True
    source: str | None = Field(None, max_length=64)


class QuizSubmit(BaseModel):
    answers: dict[str, str] = Field(
        ...,
        description="Mapeamento question_id -> answer_id. Ex.: {'1': '1a', '2': '2c'}.",
    )
    lead: QuizLead


class ProfileOut(BaseModel):
    id: str
    name: str
    summary: str
    diagnosis: str
    recommended_service: str
    signals: list[str]
    accent_color: str


class QuizResult(BaseModel):
    lead_id: str
    profile: ProfileOut
    pdf_url: str
    booking_url: str
    whatsapp_url: str
    email_dispatch: dict[str, Any]
