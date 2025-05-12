from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    POSTGRES_DB: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: int
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

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
