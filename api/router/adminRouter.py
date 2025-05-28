
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from db.admin import Admin

admin = Admin()

admin_router = APIRouter()


@admin_router.get("/admin")
async def admin_route_root():
    return "at admin router"

@admin_router.get("/admin/auth/{username}/{password}")
async def admin_auth(username : str, password: str):

    if admin.authenticate(username, password):
        return {
            "success": True,
            "message": "Authentication successful."}
    else:
        return {
            "success": False,  
            "message": "Authentication failed."}
        
@admin_router.get("/admin/logs")
async def get_admin_logs():
    logs = admin.get_logs()
    return JSONResponse(content=logs, status_code=200)

@admin_router.get("/admin/status")
async def get_admin_status():
    result = admin.get_server_status()
    return JSONResponse(content=result , status_code=200)