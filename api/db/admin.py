
from db.config import base_engine 
from sqlalchemy import text
import subprocess
import os
import datetime
from typing import Optional
import random
import shutil
import platform
import socket


class Admin:
    
    def __init__(self, username: str = "root", password: str = "admin123") -> None:
        self.username = username
        self.password = password  
    
    def authenticate(self, username: str, password: str) -> bool:
        return username == self.username and password == self.password

    def create_database(self, name: str):
        with base_engine.connect() as con:
            con.execute(text(f"CREATE DATABASE IF NOT EXISTS `{name}`"))
            con.commit()



    def drop_database(self, name: str):
        with base_engine.connect() as conn:
            conn.execute(text(f"DROP DATABASE IF EXISTS `{name}`"))
            conn.commit()
    


    def list_databases(self):
        query = """
        SELECT
            s.schema_name AS db_name,
            COUNT(t.table_name) AS table_count,
            IFNULL(SUM(t.data_length + t.index_length), 0) / 1024 / 1024 AS size_mb,
            MIN(t.create_time) AS creation_date
        FROM
            information_schema.schemata s
        LEFT JOIN
            information_schema.tables t ON s.schema_name = t.table_schema
        WHERE
            s.schema_name NOT IN ('mysql', 'information_schema', 'performance_schema', 'sys', 'phpmyadmin','log')
        GROUP BY
            s.schema_name
        ORDER BY
            s.schema_name;
        """

        with base_engine.connect() as conn:
            result = conn.execute(text(query))
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




    def backup(
        self, 
        db_name: str, 
        table_name: Optional[str] = None, 
        user: str = "root", 
        password: str = "", 
        host: str = "localhost", 
        port: int = 3306
    ):
        export_dir = r"C:\Users\msu-wone\Downloads\ITE192-Final Project\backups"  # Update path as needed
        os.makedirs(export_dir, exist_ok=True)
        
        yearnow = datetime.datetime.now().strftime("%Y")
        unique_number = random.randint(1000, 9999)  # 4-digit random number

        # Build file_tag (db or db_table)
        file_tag = f"{db_name}_({table_name})" if table_name else db_name
        file_name = f"{file_tag}__backup__{yearnow}-{unique_number}.sql"
        
        # Construct backup filename with the new format
        backup_file = os.path.join(
            export_dir, 
            file_name
        )

        mysqldump_path = r"C:\New folder\mysql\bin\mysqldump.exe"

        cmd = [
            mysqldump_path,
            f"-h{host}",
            f"-P{port}",
            f"-u{user}"
        ]

        if password:
            cmd.append(f"-p{password}")

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


    def restore(
        self,
        sql_file: str,
        db_name: str,
        user: str = "root",
        password: str = "",
        host: str = "localhost",
        port: int = 3306
    ):
        mysql_path = r"C:\New folder\mysql\bin\mysql.exe"  # Update path as needed

        if not os.path.exists(sql_file):
            return {"success": False, "error": f"SQL file not found: {sql_file}"}

        # Check if DB exists
        existing_dbs = [db['db_name'] for db in self.list_databases()]
        if db_name not in existing_dbs:
            # Create the DB using subprocess
            create_db_cmd = [
                mysql_path,
                f"-h{host}",
                f"-P{port}",
                f"-u{user}"
            ]
            if password:
                create_db_cmd.append(f"-p{password}")

            # Run CREATE DATABASE IF NOT EXISTS
            create_db_sql = f"CREATE DATABASE IF NOT EXISTS `{db_name}`;"
            try:
                proc_create = subprocess.run(
                    create_db_cmd,
                    input=create_db_sql,
                    text=True,
                    capture_output=True
                )
                if proc_create.returncode != 0:
                    return {"success": False, "error": f"Failed to create database: {proc_create.stderr}"}
            except Exception as e:
                return {"success": False, "error": f"Database creation error: {str(e)}"}

        # Prepare restore command
        cmd = [
            mysql_path,
            f"-h{host}",
            f"-P{port}",
            f"-u{user}"
        ]

        if password:
            cmd.append(f"-p{password}")

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
        export_dir = r"C:\Users\msu-wone\Downloads\ITE192-Final Project\backups"
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
                continue  # Skip if not file or folder

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
        query = """
        SELECT 
            table_schema AS database_name,
            table_name,
            ROUND((IFNULL(data_length, 0) + IFNULL(index_length, 0)) / 1024 / 1024, 2) AS size_mb,
            table_rows
        FROM 
            information_schema.tables
        WHERE 
            table_schema NOT IN ('mysql', 'information_schema', 'performance_schema', 'sys', 'phpmyadmin', 'log')
        ORDER BY 
            table_schema, table_name;
        """

        with base_engine.connect() as conn:
            result = conn.execute(text(query))
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
            query = f"DROP TABLE IF EXISTS `{db_name}`.`{table_name}`"
            target = f"table `{table_name}` from database `{db_name}`"
        else:
            # Drop the entire database
            query = f"DROP DATABASE IF EXISTS `{db_name}`"
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
    
        query = f"""
        CREATE TABLE IF NOT EXISTS `{db_name}`.`{table_name}` (
            `id` INT PRIMARY KEY AUTO_INCREMENT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """

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
            
    def get_mysql_data_folder_size(data_dir="C:/xampp/mysql/data"):
        total_size = 0
        for dirpath, dirnames, filenames in os.walk(data_dir):
            for f in filenames:
                fp = os.path.join(dirpath, f)
                if os.path.isfile(fp):
                    total_size += os.path.getsize(fp)
        total_mb = round(total_size / (1024 * 1024), 2)
        return total_mb


    def get_server_status(self, host="localhost"):
            try:
                # Determine DBMS Type
                with base_engine.connect() as conn:
                    version_result  = conn.execute(text("SELECT VERSION()")).scalar()
                    dbms_type = "MySQL" if "mysql" in version_result.lower() else "MySQL"
                    version_result = version_result.replace("MariaDB", "MySQL")
                    # Uptime (in seconds)
                    uptime_result = conn.execute(text("SHOW GLOBAL STATUS LIKE 'Uptime'")).fetchone()
                    uptime_seconds = int(uptime_result[1]) if uptime_result else 0

                    # Earliest creation time from tables
                    creation_result = conn.execute(text("""
                        SELECT MIN(create_time) FROM information_schema.tables 
                        WHERE create_time IS NOT NULL
                    """)).scalar()
                    server_creation = creation_result.strftime("%Y-%m-%d %H:%M:%S") if creation_result else "Unknown"

                    # Total DB size
                    size_result = conn.execute(text("""
                        SELECT SUM(data_length + index_length) / 1024 / 1024 AS total_mb
                        FROM information_schema.tables
                    """)).scalar()
                    total_db_size_mb = round(float(size_result or 0), 2)

                # Disk Info (where Python is running)
                total_disk, used_disk, free_disk = shutil.disk_usage("/")
                total_gb = round(total_disk / (1024 ** 3), 2)
                used_gb = round(used_disk / (1024 ** 3), 2)
                free_gb = round(free_disk / (1024 ** 3), 2)

                # Local or Remote
                is_local = "localhost" in host or "127.0.0.1" in host
                environment = "Local" if is_local else "Remote"

                return {
                    "dbms": dbms_type,
                    
                    "uptime_seconds": uptime_seconds,
                 
                    "total_database_size_mb": total_db_size_mb,
                    "storage": {
                        "total_gb": total_gb,
                        "used_gb": used_gb,
                        "free_gb": free_gb
                    },
                    "host": host,
                    "environment": environment,
                    "os": platform.system(),
                    "machine": platform.node(),
                    "ip_address": socket.gethostbyname(socket.gethostname())
                }

            except Exception as e:
                return {"success": False, "error": str(e)}
    
    def get_logs(self): 
        with base_engine.connect() as con:
            con.execute(text("USE log; "))
            result = con.execute(text('SELECT * FROM app_logs')).mappings()
            logs = []
            for row in result:
                log_dict = dict(row)
                # parse log_time datetime object to string, e.g. ISO 8601 format
                if log_dict.get("log_time"):
                    log_dict["log_time"] = log_dict["log_time"].isoformat()
                logs.append(log_dict)
            return logs
        
    def create_log(self, log_level: str,  target : str,  message: str, module: str = None,):
        with base_engine.connect() as con:
            con.execute(text("USE log;"))
            sql = text("""
                INSERT INTO app_logs (log_level, message, module, target)
                VALUES (:log_level, :message, :module, :target)
            """)
            con.execute(sql, {"log_level": log_level, "message": message, "module": module, "target": target})
            con.commit() 