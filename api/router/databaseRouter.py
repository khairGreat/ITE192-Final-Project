
from fastapi import APIRouter ,  Body,  HTTPException
from fastapi.responses import JSONResponse 
from db.admin import Admin

import os

admin = Admin()
db_router = APIRouter()

@db_router.get("/db")
async def db_route_root():
    return "at db router "

@db_router.post("/createdb/{db_name}")
async def create_db(db_name:str):
    try:
        
        result = admin.create_database(name=db_name)
        if result:
            admin.create_log(log_level="INFO", message=f'Created a database {db_name}', module='CREATE', target=db_name)
            return JSONResponse(
                content={
                    "success" : True , 
                    "message": f"Database `{db_name}` created."
                }, 
                status_code=200)
        return JSONResponse(content={
                "success" : False , 
                "message": f"Failed to create `{db_name}`"
            }, status_code=404)
    except Exception as error:
        return JSONResponse(content={
                "success" : True ,
                "message": error
            },status_code=500)
    


@db_router.get("/databases")
def get_databases():
    try:
         dbs = admin.list_databases()
         if dbs:
            return JSONResponse(content=dbs, status_code=200)
         return JSONResponse(content={
             "success" : True , 
             "message" : "Failed to fetch the databases" 
         }, status_code = 404)
         
    except Exception as error: 
        return JSONResponse(content={
            "success" : False ,
            "message" : error
        })
   


@db_router.post("/dbackup/{db_name}")
async def backup_db(db_name:str):
    admin.create_log(log_level="INFO", message=f'Created a database {db_name} backup', module='BACKUP', target=db_name)  
    result = admin.backup(db_name=db_name)
    return JSONResponse(content=result, status_code=200)



@db_router.post("/restore/{db_name}")
async def restore_file(
    db_name: str,
    data : dict = Body(...)
):
    admin.create_log(log_level="INFO", message=f'Restored a database {db_name}', module='RESTORE', target=db_name)
    backup_path   = data.get("backup_path")
    
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
    admin.create_log(log_level="WARNING", message=f'Deleted a database {db_name}', module='DELETE', target=db_name)
    result = admin.drop(db_name=db_name)
    return JSONResponse(content=result, status_code=200)


