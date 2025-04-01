from fastapi import APIRouter
from .endpoints import text, chat, knowledge

router = APIRouter()

router.include_router(text.router, prefix="/text", tags=["text"])
router.include_router(chat.router, prefix="/chat", tags=["chat"])
router.include_router(knowledge.router, prefix="/knowledge", tags=["knowledge"]) 