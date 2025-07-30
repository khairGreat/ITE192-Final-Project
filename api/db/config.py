from dotenv import load_dotenv
from os import getenv

load_dotenv()

config = {
    "host" : f"{getenv("DB_HOST")}" ,
    "user" : f"{getenv("DB_USER")}" , 
    "password" : f"{getenv("DB_PASSWORD")}" ,
    "port" : getenv("DB_PORT")    , 
    "mysql" : {
        "mysql_path" : r"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" , 
        "mysql_dump_path" : r"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"
    }  , 
    "admin_cred" : {
        "admin_username" : getenv("ADMIN_USERNAME") ,
        "admin_password" : getenv("ADMIN_PASSWORD")  
    } 
}
