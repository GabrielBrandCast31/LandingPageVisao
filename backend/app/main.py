"""Entry point da API Visão."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import init_db
from .routers import health, leads, quiz


@asynccontextmanager
async def lifespan(_app: FastAPI):
    # Em dev/SQLite cria as tabelas automaticamente. Em produção (Supabase)
    # usaremos Alembic — basta remover esta chamada quando aplicável.
    if settings.is_sqlite:
        await init_db()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version="0.2.0",
    description="API do funil de qualificação da Visão.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(leads.router, prefix="/api")
app.include_router(quiz.router, prefix="/api")


@app.get("/", include_in_schema=False)
async def root() -> dict[str, str]:
    return {
        "name": settings.APP_NAME,
        "docs": "/docs",
        "health": "/api/health",
    }
