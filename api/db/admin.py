
from db.connection import base_engine 
from db.adminQuery import admin_query
from db.config import config
from utility.formatUptime import format_uptime
from sqlalchemy import text
import os , random , shutil , platform , socket, datetime, subprocess
from typing import Optional


class Admin:
    
    def __init__(self, username: str = "root", password: str = "admin123") -> None:
        self.username = username
        self.password = password  
    
    def authenticate(self, username: str, password: str) -> bool:
        return username == self.username and password == self.password

    def create_database(self, name: str):
        with base_engine.connect() as con:
            result = con.execute(text(admin_query(name)["create"][0]))
            con.commit()
            return result

    def list_databases(self):
    
        with base_engine.connect() as conn:
            result = conn.execute(text(admin_query()["db_metadata"]))
            rows = result.fetchall()

        databases_info = []
        for row in rows:
            creation_date = row.creation_date
            if creation_date is not None:
                creation_date = creation_date.strftime("%Y-%m-%d %H:%M:%S")
            else:
                creation_date = "No tables (unknown creation date)"

            databases_info.append({
                "db_name": row.db_name,
                "table_count": row.table_count,
                "size_mb": round(float(row.size_mb), 2),
                "creation_date": creation_date,
            })

        return databases_info

 
    def backup( self, db_name: str, table_name: Optional[str] = None, ):
        
        # export_dir = r"C:\Users\msu-wone\Downloads\ITE192-Final Project\backups"
        export_dir = os.path.join(os.getcwd(),'backups')
        os.makedirs(export_dir, exist_ok=True)
        
        yearnow = datetime.datetime.now().strftime("%Y")
        unique_number = random.randint(1000, 999999)  # 4-digit random number

        # Build file_tag (db or db_table)
        file_tag = f"{db_name}_({table_name})" if table_name else db_name
        file_name = f"{file_tag}__backup__{yearnow}-{unique_number}.sql"
        
        # Construct backup filename with the new format
        backup_file = os.path.join(
            export_dir, 
            file_name
        ) 
        
        cmd = [
            config["mysql"]["mysql_dump_path"],
            f"-h{config["host"]}",
            f"-P{config["port"]}",
            f"-u{config["user"]}"
        ]

        if config["password"]:
            cmd.append(f"-p{config["password"]}")

        cmd.append(db_name)
        if table_name:
            cmd.append(table_name)

        try:
            with open(backup_file, "w", encoding="utf-8") as f:
                result = subprocess.run(cmd, stdout=f, stderr=subprocess.PIPE, text=True)

            if result.returncode == 0:
                size_mb = round(os.path.getsize(backup_file) / (1024 * 1024), 2)
                created_at = datetime.datetime.fromtimestamp(os.path.getctime(backup_file)).strftime("%Y-%m-%d %H:%M:%S")
            
                return {
                    "success": True,
                    "file_name" : file_name,
                    "path": backup_file,
                    "size_mb": size_mb,
                    "created_at": created_at, 
                }
                
            else:
                return {
                    "success": False,
                    "error": result.stderr
                }

        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }


    def restore( self, sql_file: str,db_name: str,):

        if not os.path.exists(sql_file):
            return {"success": False, "error": f"SQL file not found: {sql_file}"}

        # Check if DB exists
        existing_dbs = [db['db_name'] for db in self.list_databases()]
        
        if db_name not in existing_dbs:
       
            create_db_cmd = [
                config["mysql"]["mysql_path"],
                f"-h{config["host"]}",
                f"-P{config["port"]}",
                f"-u{config["user"]}"
            ]
            if config["password"]:
                create_db_cmd.append(f"-p{config["password"]}")
                
            try:
                proc_create = subprocess.run(
                    create_db_cmd,
                    input= admin_query(db_name)["create"][0],
                    text=True,
                    capture_output=True
                )
                if proc_create.returncode != 0:
                    return {"success": False, "error": f"Failed to create database: {proc_create.stderr}"}
            except Exception as e:
                return {"success": False, "error": f"Database creation error: {str(e)}"}

        # Prepare restore command
        cmd = [
            config["mysql"]["mysql_path"],
            f"-h{config["host"]}",
            f"-P{config["port"]}",
            f"-u{config["user"]}"
        ]

        if config["password"]:
            cmd.append(f"-p{config["password"]}")

        cmd.append(db_name)

        try:
            with open(sql_file, "r", encoding="utf-8") as f:
                result = subprocess.run(cmd, stdin=f, stderr=subprocess.PIPE, text=True)

            if result.returncode == 0:
                size_mb = round(os.path.getsize(sql_file) / (1024 * 1024), 2)
                created_at = datetime.datetime.fromtimestamp(os.path.getctime(sql_file)).strftime("%Y-%m-%d %H:%M:%S")

                return {
                    "success": True,
                    "message": f"Database '{db_name}' restored successfully from {sql_file}",
                    "file_info": {
                        "path": sql_file,
                        "size_mb": size_mb,
                        "created_at": created_at
                    }
                }

            else:
                return {
                    "success": False,
                    "error": result.stderr
                }

        except Exception as e:
            return {"success": False, "error": str(e)}
        

    def getBackups(self):
        export_dir = os.path.join(os.getcwd(),'backups')
        backups = []
        
        for item in os.listdir(export_dir):
            item_path = os.path.join(export_dir, item)
            
            if os.path.isfile(item_path):
                size_bytes = os.path.getsize(item_path)
                item_type = "file"
                backup_type = "Logical"
            elif os.path.isdir(item_path):
                size_bytes = sum(
                    os.path.getsize(os.path.join(root, f))
                    for root, _, files in os.walk(item_path)
                    for f in files
                )
                item_type = "folder"
                backup_type = "Raw"
            else:
                continue  

            size_mb = round(size_bytes / (1024 * 1024), 2)
            created_timestamp = os.path.getctime(item_path)
            created_date = datetime.datetime.fromtimestamp(created_timestamp).strftime('%Y-%m-%d %H:%M:%S')

            base_name = os.path.basename(item)
            db_name = base_name.split('__backup__')[0].split('_')[0]

            backups.append({
                'file': item_path,
                'db_name': db_name,
                'size_mb': size_mb,
                'created': created_date,
                'type': item_type,
                "backup_type":  backup_type
            })

        return backups

    def getAllTables(self):
        
        with base_engine.connect() as conn:
            result = conn.execute(text(admin_query()["table_stats"]))
            rows = result.fetchall()

        database_tables = []
        for row in rows:
            table_info = {
                "database_name": row.database_name,
                "table_name": row.table_name,
                "size_mb": float(row.size_mb or 0),  # Defensive fallback in case of NULL
                "table_rows": int(row.table_rows or 0)  # Just in case table_rows is NULL
            }
            database_tables.append(table_info)

        return database_tables

    
    def drop(self, db_name: str, table_name: Optional[str] = None):
        print(f"db name : {db_name}")
        if table_name:
            # Drop a specific table
            query = admin_query(db_name,table_name)["drop"][1]
            target = f"table `{table_name}` from database `{db_name}`"
        else:
            # Drop the entire database
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

    def create_table(self, db_name: str, table_name: str):
    
        query = admin_query(db_name, table_name)["create"][1]

        try:
            with base_engine.connect() as conn:
                conn.execute(text(query))
                conn.commit()
        
            return {
                "success": True,
                "message": f"Table `{table_name}` created successfully in database `{db_name}`."
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
            

    def get_server_status(self):
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

            except Exception as e:
                return {"success": False, "error": str(e)}
    
    def get_logs(self): 
        with base_engine.connect() as con:
            con.execute(text(admin_query()["log"]["use"]))
            result = con.execute(text(admin_query()["log"]["selectAll"])).mappings()
            logs = []
            for row in result:
                log_dict = dict(row)
                
                if log_dict.get("log_time"):
                    log_dict["log_time"] = log_dict["log_time"].isoformat()
                logs.append(log_dict)
                
            return logs
        
    def create_log(self, log_level: str,  target : str,  message: str, module = None,):
        with base_engine.connect() as con:
            con.execute(text(admin_query()["log"]["use"]))
            insert_sql = text(admin_query()["log"]["insert"])
            con.execute(insert_sql, {"log_level": log_level, "message": message, "module": module, "target": target})
            con.commit() 