from fastapi import FastAPI
from pydantic_settings import BaseSettings

# base settings model
class Settings(BaseSettings):
    files_folder: str = '/usr/share/files'

settings = Settings()