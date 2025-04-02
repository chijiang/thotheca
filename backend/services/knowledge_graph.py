import pandas as pd
from neo4j import GraphDatabase
from typing import Dict, Any, List
from models.knowledge_graph import Post, User, Company, Brand, Platform, Location, Engagement, Opinion

class KnowledgeGraphService:
    def __init__(self, driver: GraphDatabase.driver):
        self.driver = driver

    def create_constraints(self):
        with self.driver.session() as session:
            constraints = [
                "CREATE CONSTRAINT post_id IF NOT EXISTS FOR (p:Post) ON (p.ipsos_id) IS UNIQUE",
                "CREATE CONSTRAINT user_id IF NOT EXISTS FOR (u:User) ON (u.ipsos_id) IS UNIQUE",
                "CREATE CONSTRAINT company_name IF NOT EXISTS FOR (c:Company) ON (c.name) IS UNIQUE",
                "CREATE CONSTRAINT brand_name IF NOT EXISTS FOR (b:Brand) ON (b.name) IS UNIQUE",
                "CREATE CONSTRAINT platform_name IF NOT EXISTS FOR (p:Platform) ON (p.name) IS UNIQUE",
                "CREATE CONSTRAINT location_id IF NOT EXISTS FOR (l:Location) ON (l.province, l.city) IS UNIQUE"
            ]
            for constraint in constraints:
                session.run(constraint)

    def create_post(self, data: Dict[str, Any]):
        with self.driver.session() as session:
            query = """
            MERGE (p:Post {ipsos_id: $ipsos_id})
            SET p.publish_date = $publish_date,
                p.summary = $summary,
                p.title = $title,
                p.content = $content,
                p.cover_page = $cover_page,
                p.video_text = $video_text,
                p.url = $url
            """
            session.run(query, data)

    def create_user(self, data: Dict[str, Any]):
        with self.driver.session() as session:
            query = """
            MERGE (u:User {ipsos_id: $ipsos_id})
            SET u.gender = $gender,
                u.age = $age,
                u.account_type = $account_type,
                u.followers = $followers
            """
            session.run(query, data)

    def create_company(self, name: str):
        with self.driver.session() as session:
            query = "MERGE (c:Company {name: $name})"
            session.run(query, {"name": name})

    def create_brand(self, name: str):
        with self.driver.session() as session:
            query = "MERGE (b:Brand {name: $name})"
            session.run(query, {"name": name})

    def create_platform(self, name: str):
        with self.driver.session() as session:
            query = "MERGE (p:Platform {name: $name})"
            session.run(query, {"name": name})

    def create_location(self, province: str, city: str):
        with self.driver.session() as session:
            query = "MERGE (l:Location {province: $province, city: $city})"
            session.run(query, {"province": province, "city": city})

    def create_engagement(self, post_id: str, data: Dict[str, Any]):
        with self.driver.session() as session:
            query = """
            MATCH (p:Post {ipsos_id: $post_id})
            MERGE (e:Engagement {post_id: $post_id})
            SET e.total_engagements = $total_engagements,
                e.favorites = $favorites,
                e.likes = $likes,
                e.comments = $comments,
                e.shares = $shares,
                e.views = $views,
                e.bullet_comments = $bullet_comments,
                e.coins = $coins
            MERGE (p)-[:HAS_ENGAGEMENT]->(e)
            """
            session.run(query, {"post_id": post_id, **data})

    def create_opinion(self, post_id: str, data: Dict[str, Any]):
        with self.driver.session() as session:
            query = """
            MATCH (p:Post {ipsos_id: $post_id})
            MERGE (o:Opinion {post_id: $post_id})
            SET o.points_of_view = $points_of_view,
                o.points_attitude = $points_attitude
            MERGE (p)-[:EXPRESSES]->(o)
            """
            session.run(query, {"post_id": post_id, **data})

    def create_relationships(self, post_id: str, user_id: str, platform: str, 
                           brand: str, company: str, province: str, city: str):
        with self.driver.session() as session:
            # 创建用户发帖关系
            query = """
            MATCH (u:User {ipsos_id: $user_id})
            MATCH (p:Post {ipsos_id: $post_id})
            MERGE (u)-[:POSTS]->(p)
            """
            session.run(query, {"user_id": user_id, "post_id": post_id})

            # 创建平台关系
            query = """
            MATCH (p:Post {ipsos_id: $post_id})
            MATCH (pl:Platform {name: $platform})
            MERGE (p)-[:PUBLISHED_ON]->(pl)
            """
            session.run(query, {"post_id": post_id, "platform": platform})

            # 创建品牌关系
            if brand:
                query = """
                MATCH (p:Post {ipsos_id: $post_id})
                MATCH (b:Brand {name: $brand})
                MERGE (p)-[:TAGGED_WITH]->(b)
                """
                session.run(query, {"post_id": post_id, "brand": brand})

            # 创建公司关系
            if company:
                query = """
                MATCH (p:Post {ipsos_id: $post_id})
                MATCH (c:Company {name: $company})
                MERGE (p)-[:MENTIONS]->(c)
                """
                session.run(query, {"post_id": post_id, "company": company})

            # 创建地理位置关系
            query = """
            MATCH (p:Post {ipsos_id: $post_id})
            MATCH (l:Location {province: $province, city: $city})
            MERGE (p)-[:LOCATED_IN]->(l)
            """
            session.run(query, {"post_id": post_id, "province": province, "city": city})

    def process_csv(self, df: pd.DataFrame) -> tuple[int, List[str]]:
        errors = []
        processed_rows = 0

        try:
            # 创建约束
            self.create_constraints()

            # 处理每一行数据
            for index, row in df.iterrows():
                try:
                    # 创建基本实体
                    self.create_post({
                        "ipsos_id": row["Ipsos ID"],
                        "publish_date": row["Publish Date"],
                        "summary": row["Summary"],
                        "title": row["Title"],
                        "content": row["Content"],
                        "cover_page": row["Cover Page"],
                        "video_text": row["Video Text"],
                        "url": row["URL"]
                    })

                    self.create_user({
                        "ipsos_id": row["Ipsos ID"],
                        "gender": row["Gender"],
                        "age": row["Age"],
                        "account_type": row["Account Type"],
                        "followers": row["Followers"]
                    })

                    if pd.notna(row["Company"]):
                        self.create_company(row["Company"])

                    if pd.notna(row["Brand"]):
                        self.create_brand(row["Brand"])

                    self.create_platform(row["Platform"])

                    if pd.notna(row["Province"]) and pd.notna(row["City"]):
                        self.create_location(row["Province"], row["City"])

                    # 创建互动数据
                    self.create_engagement(row["Ipsos ID"], {
                        "total_engagements": row["Total Engagements"],
                        "favorites": row["Favorites"],
                        "likes": row["Likes"],
                        "comments": row["Comments"],
                        "shares": row["Shares"],
                        "views": row["Views"],
                        "bullet_comments": row["Bullet Comments"],
                        "coins": row["Coins"]
                    })

                    # 创建观点数据
                    if pd.notna(row["Points of View"]) or pd.notna(row["Points Attitude"]):
                        self.create_opinion(row["Ipsos ID"], {
                            "points_of_view": row["Points of View"],
                            "points_attitude": row["Points Attitude"]
                        })

                    # 创建关系
                    self.create_relationships(
                        row["Ipsos ID"],
                        row["Ipsos ID"],
                        row["Platform"],
                        row["Brand"] if pd.notna(row["Brand"]) else None,
                        row["Company"] if pd.notna(row["Company"]) else None,
                        row["Province"] if pd.notna(row["Province"]) else None,
                        row["City"] if pd.notna(row["City"]) else None
                    )

                    processed_rows += 1
                except Exception as e:
                    errors.append(f"处理第 {index + 1} 行时发生错误: {str(e)}")

            return processed_rows, errors

        except Exception as e:
            errors.append(f"处理CSV文件时发生错误: {str(e)}")
            return 0, errors 