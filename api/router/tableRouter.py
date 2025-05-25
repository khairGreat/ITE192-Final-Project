
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from db import admin
from db.admin import Admin

#  ? CREATE A TABLE for a specified database 
# ? Delete a table from a specified database 
# ? Update a table in a specified database

admin =Admin()

table_router = APIRouter()

@table_router.get("/table")
async def table_route_root():
    return "at table router"

@table_router.get("/tables")
async def get_all_tables():
    tables = admin.getAllTables()
    return JSONResponse(content=tables, status_code=200)


@table_router.post("/tablebackup/{db_name}/{table_name}")
async def backup_table(db_name:str, table_name:str):
    result = admin.backup(db_name=db_name, table_name=table_name)
    return JSONResponse(content=result, status_code=200)

@table_router.delete("/droptable/{db_name}/{table_name}")
async def drop_db(db_name:str, table_name:str):
    result = admin.drop(db_name=db_name, table_name=table_name)
    return JSONResponse(content=result, status_code=200)