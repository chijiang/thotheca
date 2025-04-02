from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
import pandas as pd
from core.database import Neo4jDatabase
from services.knowledge_graph import KnowledgeGraphService
from schemas.knowledge_graph import CSVUploadResponse, ErrorResponse
import io

router = APIRouter()

def get_kg_service():
    db = Neo4jDatabase()
    driver = db.connect()
    if not db.verify_connectivity():
        raise HTTPException(
            status_code=500,
            detail="无法连接到Neo4j数据库"
        )
    return KnowledgeGraphService(driver)

@router.post("/upload-csv", 
            response_model=CSVUploadResponse,
            responses={400: {"model": ErrorResponse}, 500: {"model": ErrorResponse}})
async def upload_csv(
    file: UploadFile = File(...),
    kg_service: KnowledgeGraphService = Depends(get_kg_service)
):
    try:
        # 读取CSV文件
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        
        # 验证必要的列是否存在
        required_columns = [
            "Publish Date", "Summary", "Points of View", "Points Attitude",
            "URL", "Platform", "Followers", "Province", "City",
            "Total Engagements", "Favorites", "Likes", "Comments",
            "Shares", "Views", "Bullet Comments", "Coins",
            "Company", "Brand", "Gender", "Age", "Account Type",
            "Title", "Content", "Cover Page", "Video Text", "Ipsos ID"
        ]
        
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            raise HTTPException(
                status_code=400,
                detail=f"CSV文件缺少必要的列: {', '.join(missing_columns)}"
            )
        
        # 处理CSV数据
        processed_rows, errors = kg_service.process_csv(df)
        
        return CSVUploadResponse(
            message="CSV文件处理完成",
            processed_rows=processed_rows,
            errors=errors if errors else None
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"处理CSV文件时发生错误: {str(e)}"
        ) 