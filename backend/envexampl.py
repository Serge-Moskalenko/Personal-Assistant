from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    DB_HOST: str = "127.0.0.1"
    DB_PORT: int = 5432
    DATABASE_URL: str

    SECRET_KEY: str
    DEBUG: bool = False
    ALLOWED_HOSTS: list[str] = []

    AWS_STORAGE_BUCKET_NAME: str
    AWS_S3_REGION_NAME: str
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str

    EMAIL_HOST: str
    EMAIL_HOST_USER: str
    EMAIL_HOST_PASSWORD: str

    REDIS_URL: str
    REDIS_HOST: str
    REDIS_PORT: str
    REDIS_PASSWORD: str

    SITE_HOST_URL: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
