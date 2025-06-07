from db.config import config
from db.db_operations.database import list_databases
from datetime import datetime
from db.adminQuery import admin_query
import os , subprocess , shutil


# ? RESTORE BACKUP IN LOGICAL MANNER
def logical_restore( sql_file: str,db_name: str,):

        if not os.path.exists(sql_file):
            return {"success": False, "error": f"SQL file not found: {sql_file}"}

        # ? Check if DB existslist_databases
        existing_dbs = [db["db_name"] for db in list_databases()["data"]]
        
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
                created_at = datetime.fromtimestamp(os.path.getctime(sql_file)).strftime("%Y-%m-%d %H:%M:%S")

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
        



def raw_restore(raw_backup_dir: str, db_name: str):
    mysql_data_dir = config["mysql"]["data_dir"]  # e.g. "/var/lib/mysql" or your custom data dir

    # Path to where DB should be restored
    target_db_path = os.path.join(mysql_data_dir, db_name)

    if not os.path.exists(raw_backup_dir):
        return {"success": False, "error": f"Backup directory not found: {raw_backup_dir}"}

    if os.path.exists(target_db_path):
        return {"success": False, "error": f"Database folder '{db_name}' already exists at {target_db_path}"}

    try:
        # Stop MySQL service (must run as admin/root)
        stop_cmd = "sudo systemctl stop mysql"
        os.system(stop_cmd)

        # Copy the raw files to the data directory
        shutil.copytree(raw_backup_dir, target_db_path)

        # Fix ownership and permissions
        os.system(f"sudo chown -R mysql:mysql {target_db_path}")
        os.system(f"sudo chmod -R 750 {target_db_path}")

        # Start MySQL service again
        start_cmd = "sudo systemctl start mysql"
        os.system(start_cmd)

        return {
            "success": True,
            "message": f"Raw database '{db_name}' restored successfully from directory {raw_backup_dir}",
            "target_path": target_db_path
        }

    except Exception as e:
        return {"success": False, "error": str(e)}

restore_operations = {
    "logical_restore" : logical_restore , 
    "raw_restore" : raw_restore
}