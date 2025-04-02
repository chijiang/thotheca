from fastapi import APIRouter
from .endpoints import knowledge_graph

api_router = APIRouter()
api_router.include_router(knowledge_graph.router, prefix="/knowledge-graph", tags=["knowledge-graph"]) 