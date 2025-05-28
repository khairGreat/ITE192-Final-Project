from dotenv import load_dotenv
from os import getenv

load_dotenv()

config = {
    "host" : f"{getenv("DB_HOST")}" ,
    "user" : f"{getenv("DB_USER")}" , 
    "password" : f"{getenv("DB_PASSWORD")}" ,
    "port" : getenv("DB_PORT")    , 
    "mysql" : {
        "mysql_path" : r"C:\New folder\mysql\bin\mysql.exe" , 
        "mysql_dump_path" : r"C:\New folder\mysql\bin\mysqldump.exe"
    }  
}
