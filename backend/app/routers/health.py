"""Health-check endpoint usado pelo frontend para validar a conexão."""

from fastapi import APIRouter

from ..config import settings

router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict[str, str]:
    return {
        "status": "ok",
        "app": settings.APP_NAME,
        "environment": settings.ENVIRONMENT,
        "database": "sqlite" if settings.is_sqlite else "postgresql",
    }
