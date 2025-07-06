from fastapi import APIRouter, Response, Request
from fastapi.responses import JSONResponse
from db.admin import Admin
from utility.logAct import log_act

#  ? CREATE A TABLE for a specified database
# ? Delete a table from a specified database
# ? Update a table in a specified database

admin = Admin()

table_router = APIRouter()


@table_router.get("/table")
async def table_route_root():
    return "at table router"


@table_router.get("/list")
async def get_all_tables():
    tables = admin.list_tables()
    try:
        if tables["success"]:
            log_act("Successfully get the list of tables") # * LOGGED SUCCESSFULL
            return JSONResponse(content=tables, status_code=200)
        
        log_act("Failed to get the list of tables") # ! LOGGED FAILED
        return JSONResponse(content=tables, status_code=400)

    except Exception as error:
        return Response(content=str(error), status_code=500)


@table_router.delete("/delete")
async def drop_db(request: Request):

    data = await request.json()
    db_name = data["db_name"]
    table_name = data["table_name"]

    try:
        result = admin.drop_table(db_name=db_name, table_name=table_name)

        if result["success"]:
            log_act(message=f"Succesfully dropping the table {table_name}") # * LOGGED SUCCESSFUL
            admin.create_log(
                log_level="WARNING",
                message=f"Deleted a table {table_name}",
                module="DELETE",
                target=table_name,
            )

            return JSONResponse(content=result, status_code=200)
        
        log_act(message=f"Failed to drop the table {table_name}") # ! LOGGED FAILED
        
        return JSONResponse(content=result, status_code=400)

    except Exception as error:
        return Response(content=str(error), status_code=500)


@table_router.post("/create")
async def create_table(request: Request):

    data = await request.json()
    db_name = data["db_name"]
    table_name = data["table_name"]

    try:
        result = admin.create_table(db_name=db_name, table_name=table_name)

        if result["success"]:
            log_act(f"Successfully created a table {table_name}") # * LOGGED SUCCESSFUL
            admin.create_log(
                log_level="INFO",
                message=f"Created a database {table_name}",
                module="CREATE",
                target=table_name,
            )
            return JSONResponse(content=result, status_code=200)
        
        log_act(f"Failed to create a table {table_name}") # ! LOGGED FAILED
        
        return JSONResponse(content=result, status_code=400)

    except Exception as error:

        return Response(content=str(error), status_code=500)
