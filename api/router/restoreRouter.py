#
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse, Response
from db.admin import Admin
from os import path
from utility.logAct import log_act

restore_router = APIRouter()
admin = Admin()


@restore_router.get("/")
async def restore_root():
    return "at restore route"


# ? LOGICAL RESTORE
@restore_router.post("/logicalrestore")
async def logical_restore(request: Request):
    data = await request.json()

    db_name = data["db_name"]
    backup_path = data["backup_path"]

    if not path.isfile(backup_path):
        raise HTTPException(status_code=404, detail="Backup file not found.")

    try:
        result = admin.logical_restore(db_name=db_name, sql_file=backup_path)
        status_code = 200 if result["success"] else 400
        if status_code == 200:
            log_act(
                f"Successfully restored the backup {db_name}"
            )  # * SUCCESSFULL LOGGED
            admin.create_log(
                log_level="INFO",
                message=f"Restored a database {db_name}",
                module="RESTORE",
                target=db_name,
            )

        log_act(f"Failed to restore the backup {db_name}")  # ! FAILED LOGGED
        return JSONResponse(content=result, status_code=status_code)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ? RAW RESTORE
@restore_router.post("/rawrestore")
async def raw_backup(request: Request):
    data = await request.json()

    db_name = data["db_name"]
    backup_dir = data["backup_dir"]

    if not db_name and not backup_dir:
        return JSONResponse(
            content="Please provide the necessary data", status_code=400
        )
    else:

        try:
            result = admin.raw_restore(db_name=db_name, raw_backup_dir=backup_dir)
            if result["success"]:
                log_act(
                    f"Successfully restored the backup {db_name}"
                )  # * SUCCESSFULL LOGGED
                admin.create_log(
                    log_level="INFO",
                    message=f"Restored a database {db_name}",
                    module="RESTORE",
                    target=db_name,
                )
                return JSONResponse(content=result, status_code=200)
            log_act(f"Failed to restore the backup {db_name}")  # ! FAILED LOGGED
            return Response(
                content=f"Failed to create a raw backup for {db_name}", status_code=400
            )

        except Exception as error:
            print(error)
            return HTTPException(detail=str(error), status_code=500)
