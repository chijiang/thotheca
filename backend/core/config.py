from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    NEO4J_URI: str
    NEO4J_USER: str
    NEO4J_PASSWORD: str
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings() 