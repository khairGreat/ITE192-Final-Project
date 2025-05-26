import re
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from router.databaseRouter import db_router
from router.tableRouter import table_router
from fastapi.middleware.cors import CORSMiddleware
from db.admin import Admin
from router.adminRouter import admin_router

app = FastAPI()
admin = Admin()

origins = [
    "http://localhost:5173",  # your React dev server URL
    "http://127.0.0.1:8000",
    # add other origins you want to allow
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # or ["*"] to allow all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],        # allow all HTTP methods (GET, POST, etc)
    allow_headers=["*"],        # allow all headers
)
app.include_router(db_router)
app.include_router(table_router)
app.include_router(admin_router)

@app.get('/')
async def root():
    return 'hello khair'




