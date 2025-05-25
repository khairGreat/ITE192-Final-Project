
from fastapi import APIRouter , UploadFile, Body, Request, Query, HTTPException
from fastapi.responses import JSONResponse 
from fastapi.encoders import jsonable_encoder
from db.admin import Admin
import shutil
import os


admin = Admin()

db_router = APIRouter()

@db_router.get("/db")
async def db_route_root():
    return "at db router "


@db_router.post("/createdb/{db_name}")
async def create_db(db_name:str):
    admin.create_database(name=db_name)
    return {"message": f"Database `{db_name}` created."}


@db_router.get("/databases")
def get_databases():
    dbs = admin.list_databases()
    return JSONResponse(content=dbs, status_code=200)


@db_router.post("/dbackup/{db_name}")
async def backup_db(db_name:str):
    result = admin.backup(db_name=db_name)
    return JSONResponse(content=result, status_code=200)



@db_router.post("/restore/{db_name}")
async def restore_file(
    db_name: str,
    data : dict = Body(...)
):
    backup_path = data.get("backup_path")
    
    if not os.path.isfile(backup_path):
        raise HTTPException(status_code=404, detail="Backup file not found.")

    try:
        result = admin.restore(db_name=db_name, sql_file=backup_path)
        return JSONResponse(content=result, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@db_router.get("/backups")
async def get_backups():
    result = admin.getBackups()
    return result

@db_router.delete("/dropdb/{db_name}")
async def drop_db(db_name:str):
    result = admin.drop(db_name=db_name)
    return JSONResponse(content=result, status_code=200)


