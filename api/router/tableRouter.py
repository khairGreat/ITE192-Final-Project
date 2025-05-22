
from fastapi import APIRouter

#  ? CREATE A TABLE for a specified database 
# ? Delete a table from a specified database 
# ? Update a table in a specified database


table_router = APIRouter()

@table_router.get("/table")
async def table_route_root():
    return "at table router"