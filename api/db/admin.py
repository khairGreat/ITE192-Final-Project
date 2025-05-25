import db
from db.config import base_engine 
from sqlalchemy import text

import subprocess
import os
import datetime
from typing import Optional
import random

class Admin:
    
    def __init__(self, username: str = "root", password: str = "admin123") -> None:
        self.username = username
        self.password = password   

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
            MIN(t.create_time) AS oldest_table_creation_time
        FROM
            information_schema.schemata s
        LEFT JOIN
            information_schema.tables t ON s.schema_name = t.table_schema
        WHERE
            s.schema_name NOT IN ('mysql', 'information_schema', 'performance_schema', 'sys')
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
            oldest_time = row.oldest_table_creation_time
            if oldest_time is not None:
                oldest_time = oldest_time.strftime("%Y-%m-%d %H:%M:%S")  # convert datetime to string
            else:
                oldest_time = "No tables"

            databases_info.append({
                "db_name": row.db_name,
                "table_count": row.table_count,
                "size_mb": round(float(row.size_mb),2),
                "oldest_table_creation_time": oldest_time
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
        file_tag = f"{db_name}_{table_name}" if table_name else db_name
        file_name = f"{file_tag}__backup__{yearnow}{unique_number}.sql"
        
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
        
        for file in os.listdir(export_dir):
            file_path = os.path.join(export_dir, file)
            
            if os.path.isfile(file_path):
                size_bytes = os.path.getsize(file_path)
                size_mb = round(size_bytes / (1024 * 1024), 2)
                created_timestamp = os.path.getctime(file_path)
                created_date = datetime.datetime.fromtimestamp(created_timestamp).strftime('%Y-%m-%d %H:%M:%S')
                
                base_name = os.path.basename(file)
                # Get the portion before '__backup__', then split again at '_'
                db_name = base_name.split('__backup__')[0].split('_')[0]

                backups.append({
                    'file': file_path,
                    'db_name': db_name,
                    'size_mb': size_mb,
                    'created': created_date, 
                })
        
        return backups

    def getAllTables(self):
        query = """
        SELECT 
            table_schema AS database_name,
            table_name,
            ROUND((data_length + index_length) / 1024 / 1024, 2) AS size_mb,
            table_rows
        FROM 
            information_schema.tables
        WHERE 
            table_schema NOT IN ('mysql', 'information_schema', 'performance_schema', 'sys')
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
                "size_mb": float(row.size_mb),
                "table_rows": int(row.table_rows)
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


            
