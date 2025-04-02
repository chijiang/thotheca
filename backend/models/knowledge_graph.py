from typing import Optional
from pydantic import BaseModel

class Post(BaseModel):
    ipsos_id: str
    publish_date: str
    summary: str
    title: str
    content: str
    cover_page: str
    video_text: str
    url: str

class User(BaseModel):
    ipsos_id: str
    gender: str
    age: str
    account_type: str
    followers: int

class Company(BaseModel):
    name: str

class Brand(BaseModel):
    name: str

class Platform(BaseModel):
    name: str

class Location(BaseModel):
    province: str
    city: str

class Engagement(BaseModel):
    post_id: str
    total_engagements: int
    favorites: int
    likes: int
    comments: int
    shares: int
    views: int
    bullet_comments: int
    coins: int

class Opinion(BaseModel):
    post_id: str
    points_of_view: str
    points_attitude: str 