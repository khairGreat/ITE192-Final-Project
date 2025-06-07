
from fastapi import APIRouter ,Request
from fastapi.responses import JSONResponse , Response
import db
from db.admin import Admin

import os

admin = Admin()
db_router = APIRouter()

@db_router.get("/db")
async def db_route_root():
    return "at db router "


# ? getDatabases
@db_router.get("/list")
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


# ? Create database   
@db_router.post("/createDb")
async def  create_database( request : Request ):
    data = await request.json()
    db_name = data["db_name"]
    
    try:
        
        result = admin.create_database(db_name=db_name)
            
        if result["success"]:
            admin.create_log(
                log_level="INFO", 
                message=f'Created a database {db_name}', 
                module='CREATE', 
                target=db_name
            )
            
            return JSONResponse(
                content=result , 
                status_code = 201
            )
        
        return JSONResponse(
            content = result ,
            status_code = 401
        )
      
            
    except Exception as error:
        print(error)
        return JSONResponse(content={"message":error}, status_code=500)


@db_router.delete("/deleteDb")
async def drop_db(request:Request):
    data = await request.json() 
    db_name = data["db_name"]
    try:
        result = admin.drop_db(db_name=db_name)
        if result["success"]:
            admin.create_log(
                log_level="WARNING", 
                message=f'Deleted a database {db_name}', 
                module='DELETE', 
                target=db_name
            )
            return JSONResponse(content=result, status_code=200)
        
        return JSONResponse(content=result, status_code=200) 
    except Exception as error:
        return Response(
            content=str(error) ,
            status_code=500
        )
    
    

 


