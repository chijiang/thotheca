# Thotheca

Thotheca是一个基于Electron + React + Python的文本管理和知识图谱系统。它提供了文本上传、管理、智能问答和知识图谱可视化等功能。

## 功能特点

- 文本上传和管理
- 智能问答系统
- 知识图谱可视化
- 数据统计和分析
- 现代化的用户界面

## 技术栈

- 前端：React + TypeScript + TailwindCSS
- 后端：Python + FastAPI
- 桌面应用：Electron
- 数据库：SQLite
- Python包管理：uv

## 安装说明

1. 克隆项目：
```bash
git clone git@github.com:chijiang/thotheca.git
cd thotheca
```

2. 安装uv（如果尚未安装）：
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

3. 安装依赖：
```bash
npm run install:all
```

4. 启动开发环境：
```bash
npm start
```

## 项目结构

```
thotheca/
├── frontend/          # React前端应用
├── backend/           # Python后端API
├── electron/          # Electron主进程
└── package.json       # 项目配置文件
```

## 开发说明

- 前端开发服务器运行在 http://localhost:5173
- 后端API服务器运行在 http://localhost:8000
- API文档可在 http://localhost:8000/docs 访问

## 构建说明

```bash
npm run build
```

## 测试

```bash
npm test
```

## 许可证

ISC 