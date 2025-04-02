from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1.router import api_router

app = FastAPI(
    title="知识图谱转换API",
    description="将CSV数据转换为Neo4j知识图谱的API服务",
    version="1.0.0"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {
        "message": "欢迎使用知识图谱转换API",
        "version": "1.0.0",
        "docs_url": "/docs"
    } 