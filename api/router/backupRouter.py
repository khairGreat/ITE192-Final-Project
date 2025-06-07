from fastapi import APIRouter  , Request
from fastapi.responses import JSONResponse, Response
from db.admin import Admin
from os import path 


backup_router = APIRouter()

admin = Admin() 

@backup_router.get('/list')
async def get_backups():
    try:
        result = admin.list_backups()
        if result["success"]:
           return JSONResponse(
               content=result , 
               status_code=200
           ) 
        
        return JSONResponse(
            content=result,
            status_code=200
        )
        
    except Exception as error:
        return Response(
            content = {
                "message" : str(error) ,
            } , 
            status_code=500
        )

@backup_router.post('/createlogical')
async def create_logical_db_backup(request: Request):
    data = await request.json()
    db_name = data["db_name"]
    table_name = data.get("table_name")


    try:
        result = admin.logical_backup(db_name=db_name, table_name=table_name or None)

        if result.get("success"):
            target = db_name if not table_name else table_name
            
            print(f"Succesfully created a backup for {target}")
            
            admin.create_log(
                log_level="INFO",
                message=f"Created a database logical {db_name} backup",
                module="BACKUP",
                target=target
            )
            return JSONResponse(content=result, status_code=201)

        return JSONResponse(content=result, status_code=404)

    except Exception as error:
        print(error)
        return JSONResponse(content={"success": False, "error": str(error)}, status_code=500)

@backup_router.post("/createraw")
async def create_raw_db_backup(request: Request):
    try:
        raw_body = await request.body()
       

        data = await request.json()
        db_name = data["db_name"]
        result = admin.raw_backup(db_name=db_name)
        
        if result["success"]:
            admin.create_log(
                log_level="INFO",
                message=f"Created a database raw {db_name} backup",
                module="BACKUP",
                target= db_name
            )
            return JSONResponse(content=result, status_code=200)

        return JSONResponse(
            content="Failed to create a raw backup" ,
            status_code=400
        )
    except Exception as error:
        return JSONResponse(content={"error": str(error)}, status_code=500)




    
    
    