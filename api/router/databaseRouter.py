
from fastapi import APIRouter , UploadFile, File
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




@db_router.post("/dackup/{db_name}")
async def backup_db(db_name:str):
    result = admin.backup(db_name=db_name)
    return JSONResponse(content=result, status_code=200)


@db_router.post("/drestore/{db_name}")
async def restore_db(db_name: str, sql_file: UploadFile = File(...)):
    # Save uploaded file to a temp location
    temp_dir = "temp_uploads"
    os.makedirs(temp_dir, exist_ok=True)

    temp_path = os.path.join(temp_dir, f"temp_{sql_file.filename}")
    
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(sql_file.file, buffer)

    # Call your restore logic here
    result = admin.restore(db_name=db_name, sql_file=temp_path)

    # Optional: clean up the temp file
    os.remove(temp_path)

    return JSONResponse(content=result, status_code=200)