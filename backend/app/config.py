"""Application configuration loaded from environment variables."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    APP_NAME: str = "Visão API"
    ENVIRONMENT: str = "development"

    # Database — SQLite local / PostgreSQL Supabase em produção
    DATABASE_URL: str = "sqlite+aiosqlite:///./visao.db"

    # CSV de origens (campo string para evitar o JSON-decode do pydantic-settings)
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"

    # E-mail transacional
    RESEND_API_KEY: str = ""
    EMAIL_FROM: str = "Visão <contato@visaobr.com.br>"
    EMAIL_REPLY_TO: str = "contato.visaobr@gmail.com"

    # Integrações
    CALENDAR_BOOKING_URL: str = "https://calendar.app.google/PLACEHOLDER"
    WHATSAPP_NUMBER: str = "5521997079059"
    PUBLIC_SITE_URL: str = "http://localhost:3000"

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    @property
    def is_sqlite(self) -> bool:
        return self.DATABASE_URL.startswith("sqlite")

    @property
    def email_backend(self) -> str:
        return "resend" if self.RESEND_API_KEY else "console"


settings = Settings()
