from db.connection import base_engine
from db.adminQuery import admin_query
from sqlalchemy import text
from db.config import config
import platform , shutil , socket
from utility.rowSerialize import row_serialize


#  ? LIST OF DATABASES
def list_databases():
    
        with base_engine.connect() as conn:
            result = conn.execute(text(admin_query()["db_metadata"]))
            
            if not result:
                return {
                    "success" : False , 
                    "message" : "Failed to fetch the databases" ,
                    "result" : str(result)
                }
                
            rows = result.fetchall()

        databases = row_serialize(type='databases' , rows= rows)
        return { "success": True, "count" : len(databases) ,  "data": databases}


# ? CREATE DATABASE
def create_database( db_name: str):
        
        db_exist = any(db["db_name"] == db_name  for db in list_databases()["data"])
        
        if db_exist:
            return {
                "success" : False , 
                "message" : "Failed to create, database exist"
            }
        
        query = admin_query(db_name)["create"][0]
        
        with base_engine.connect() as con:
            result = con.execute(text(query))
            con.commit()
            
            if result:
                
                return {
                    "success" : True ,
                    "message": f"Database` created successfully `{db_name}`." ,
                }
                
        return {
            "success" : False , 
            "message": f"Failed to create a database {db_name}"
        }
        

# ? SERVER STATUS DBMS
def get_server_status():
            try:
                with base_engine.connect() as conn:
                    
                    # Uptime (in seconds)
                    uptime_result = conn.execute(text(admin_query()["server_status"]["uptime"])).fetchone()
                    uptime_seconds = int(uptime_result[1]) if uptime_result else 0
                    
                    # Earliest creation time from tables
                    creation_result = conn.execute(text(admin_query()["server_status"]["create_time"])).scalar()
                    

                    # Total DB size
                    size_result = conn.execute(text(admin_query()["server_status"]["size_mb"])).scalar()
                    total_db_size_mb = round(float(size_result or 0), 2)

                # Disk Info (where Python is running)
                total_disk, used_disk, free_disk = shutil.disk_usage("/")
                total_gb = round(total_disk / (1024 ** 3), 2)
                used_gb = round(used_disk / (1024 ** 3), 2)
                free_gb = round(free_disk / (1024 ** 3), 2)

                # Local or Remote
                is_local = "localhost" in config["host"] or "127.0.0.1" in config["host"]
                environment = "Local Machine" if is_local else "Remote"

                return {
                    "success" : True , 
                    "data" : {
                        "dbms": 'MySQL',
                        "uptime":uptime_seconds,
                        "total_database_size_mb": total_db_size_mb,
                        "storage": {
                            "total_gb": total_gb,
                            "used_gb": used_gb,
                            "free_gb": free_gb
                        },
                        "host": config["host"],
                        "environment": environment,
                        "os": platform.system(),
                        "machine": platform.node(),
                        "ip_address": socket.gethostbyname(socket.gethostname())
                    }
                }

            except Exception as e:
                return {"success": False, "error": str(e)}
            
            
def delete_db(db_name: str):
        print(f"db name : {db_name}")

        query = admin_query(db_name)["drop"][0]
        target = f"database `{db_name}`"

        try:
            with base_engine.connect() as conn:
                conn.execute(text(query))
                conn.commit()
            return {
                "success": True,
                "message": f"Successfully dropped {target}."
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

database_operations = {
    "list_databases" : list_databases , 
    "create_database" : create_database ,
    "server_status" : get_server_status , 
    "delete_db" : delete_db
}