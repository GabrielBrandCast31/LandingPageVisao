"""Schemas Pydantic para o recurso Lead."""

from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    phone: str = Field(..., min_length=8, max_length=32)
    age: int | None = Field(None, ge=14, le=120)
    gender: str | None = Field(None, max_length=32)
    city: str | None = Field(None, max_length=120)
    profile: str | None = Field(None, max_length=64)
    quiz_answers: dict[str, Any] | None = None
    source: str | None = Field(None, max_length=64)
    lgpd_consent: bool = False


class LeadOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    email: EmailStr
    phone: str
    age: int | None
    gender: str | None
    city: str | None
    profile: str | None
    quiz_answers: dict[str, Any] | None
    source: str | None
    lgpd_consent: bool
    created_at: datetime
