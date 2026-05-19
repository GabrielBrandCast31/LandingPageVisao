"""Async SQLAlchemy engine + session factory.

Funciona tanto com SQLite (driver aiosqlite) quanto com PostgreSQL/Supabase
(driver asyncpg). A escolha é feita apenas pela DATABASE_URL.
"""

from collections.abc import AsyncIterator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from .config import settings


class Base(DeclarativeBase):
    """Base declarativa para todos os modelos."""


_engine_kwargs: dict = {"echo": False, "future": True}
if settings.is_sqlite:
    # SQLite + aiosqlite roda single-threaded; o pool padrão já basta.
    _engine_kwargs["connect_args"] = {"check_same_thread": False}

engine = create_async_engine(settings.DATABASE_URL, **_engine_kwargs)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


async def get_db() -> AsyncIterator[AsyncSession]:
    """FastAPI dependency que entrega uma sessão por requisição."""
    async with AsyncSessionLocal() as session:
        yield session


async def init_db() -> None:
    """Cria as tabelas do metadata. Útil para SQLite/dev.

    Em produção (Supabase) usaremos Alembic — esta função vira no-op opcional.
    """
    # Garante que os modelos foram importados antes de chamar create_all
    from . import models  # noqa: F401

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
