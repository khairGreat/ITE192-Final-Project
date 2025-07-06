from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from db.admin import Admin
from db.connection import is_connected, ModelBase, base_engine

#  ? ROUTERS
from router.adminRouter import admin_router
from router.databaseRouter import db_router
from router.tableRouter import table_router
from router.backupRouter import backup_router
from router.restoreRouter import restore_router

app = FastAPI()
admin = Admin()


origins = [
    "http://localhost:5173",  # your React dev server URL
    "http://127.0.0.1:8000",
    # add other origins you want to allow
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods (GET, POST, etc)
    allow_headers=["*"],  # allow all headers
)

app.include_router(db_router, prefix="/databases")
app.include_router(table_router, prefix="/tables")
app.include_router(admin_router, prefix="/admin")
app.include_router(backup_router, prefix="/backups")
app.include_router(restore_router, prefix="/restore")


@app.get("/")
async def root():
    connected = is_connected()
    if connected:
        try:
            with base_engine.connect() as connection:
                connection.execute(text("USE log;"))
                ModelBase.metadata.create_all(bind=connection)
                print("✅ Successfully established a connection")
        except Exception as e:
            print(f"❌ Failed to initialize DB: {e}")

        return JSONResponse(content={"is_connected": True}, status_code=200)
    else:
        print("❌ Failed to connect to the database.")
        return JSONResponse(content={"is_connected": False}, status_code=500)
