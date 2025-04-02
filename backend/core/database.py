from neo4j import GraphDatabase
from .config import get_settings

class Neo4jDatabase:
    def __init__(self):
        settings = get_settings()
        self.uri = settings.NEO4J_URI
        self.user = settings.NEO4J_USER
        self.password = settings.NEO4J_PASSWORD
        self.driver = None

    def connect(self):
        self.driver = GraphDatabase.driver(self.uri, auth=(self.user, self.password))
        return self.driver

    def close(self):
        if self.driver:
            self.driver.close()

    def verify_connectivity(self):
        try:
            self.driver.verify_connectivity()
            return True
        except Exception as e:
            print(f"连接错误: {str(e)}")
            return False 