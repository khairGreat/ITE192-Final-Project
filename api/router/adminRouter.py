from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from db.admin import Admin
from utility.logAct import log_act 

admin = Admin()
admin_router = APIRouter()


@admin_router.get("/")
async def admin_route_root():
    return "at admin router"


@admin_router.get("/auth/{username}/{password}")
async def admin_auth(username: str, password: str):
    log_act(message="At the admin authentication router")
    if admin.authenticate(username, password):
        return {"success": True, "message": "Authentication successful."}
    else:
        return {"success": False, "message": "Authentication failed."}


@admin_router.get("/logs")
async def get_admin_logs():

    logs = admin.get_logs()
    if logs.get("success"):
        log_act(message="Succesfully get the logs")
        return JSONResponse(content=logs, status_code=200)
    return JSONResponse(content=logs, status_code=500)


@admin_router.get("/status")
async def get_admin_status():
    
    result = admin.get_server_status()
    
    if result.get("success"):
        log_act(message="Successfully get the server status")
        return JSONResponse(content=result, status_code=200)
    return  HTTPException(
        status_code = 400 , 
        detail="No server status data is available"
    )
        