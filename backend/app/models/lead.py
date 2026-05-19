"""Modelo Lead — captura o resultado do quiz e os dados de contato."""

from datetime import datetime, timezone
from uuid import uuid4

from sqlalchemy import JSON, Boolean, DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid4())
    )

    # Dados de contato (coletados na última tela do quiz)
    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[str] = mapped_column(String(32))
    age: Mapped[int | None] = mapped_column(Integer, nullable=True)
    gender: Mapped[str | None] = mapped_column(String(32), nullable=True)
    city: Mapped[str | None] = mapped_column(String(120), nullable=True)

    # Resultado do quiz
    profile: Mapped[str | None] = mapped_column(String(64), nullable=True, index=True)
    quiz_answers: Mapped[dict | None] = mapped_column(JSON, nullable=True)

    # Atribuição e consentimento
    source: Mapped[str | None] = mapped_column(String(64), nullable=True)
    lgpd_consent: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_utcnow, nullable=False
    )
