from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse, Response
from db.admin import Admin
from utility.logAct import log_act


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
        if dbs.get("success"):
            log_act("Succesfully get the list of databases") # * SUCCESSFULL LOG
            return JSONResponse(content=dbs, status_code=200)
        log_act("Failed get the list of databases") # ! FAILED LOG
        return JSONResponse(
            content={"success": False, "message": "Failed to fetch the databases"},
            status_code=404,
        )

    except Exception as error:
        return JSONResponse(content={"success": False, "message": error})


# ? Create database
@db_router.post("/create")
async def create_db(request: Request):
    data = await request.json()
    db_name = data["db_name"]
    log_act(f"db_name: {db_name}")

    try:

        result = admin.create_database(db_name=db_name)

        if result["success"]:
            log_act("Succesfully created a database") # * SUCCESSFULL LOG
            admin.create_log(
                log_level="INFO",
                message=f"Created a database {db_name}",
                module="CREATE",
                target=db_name,
            )

            return JSONResponse(content=result, status_code=201)
        log_act("Failed to create a database")  # ! FAILED LOG
        return JSONResponse(content=result, status_code=401)

    except Exception as error:
        print(error)
        return JSONResponse(content={"message": error}, status_code=500)


@db_router.delete("/delete")
async def drop_db(request: Request):
    data = await request.json()
    db_name = data["db_name"]
    try:
        result = admin.drop_db(db_name=db_name)
        if result["success"]:
            log_act("Succesfully dropped a database") # * SUCCESS LOG
            admin.create_log(
                log_level="WARNING",
                message=f"Deleted a database {db_name}",
                module="DELETE",
                target=db_name,
            )
            return JSONResponse(content=result, status_code=200)
        log_act("Failed to drop a database") # ! FAILED LOG
        return JSONResponse(content=result, status_code=200)
    except Exception as error:
        return Response(content=str(error), status_code=500)
