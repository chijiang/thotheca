from typing import List, Optional
from pydantic import BaseModel

class CSVUploadResponse(BaseModel):
    message: str
    processed_rows: int
    errors: Optional[List[str]] = None

class ErrorResponse(BaseModel):
    detail: str
    code: str 