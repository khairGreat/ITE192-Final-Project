from fastapi import FastAPI
from router.databaseRouter import db_router
from router.tableRouter import table_router


app = FastAPI()

app.include_router(db_router)
app.include_router(table_router)


@app.get('/')
async def root():
    return 'hello khair'