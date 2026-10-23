from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    redis_url: str = "redis://localhost:6379"
    upload_dir: str = "uploads"
    max_file_size: int = 10485760
    allowed_extensions: str = "jpg,jpeg,png,pdf"
    
    class Config:
        env_file = ".env"

settings = Settings()