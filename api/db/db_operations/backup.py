import os, subprocess, shutil, random
from datetime import datetime
from db.config import config
from typing import Optional
from utility.backupDir import backup_dir 
from utility.folderSize import get_folder_size
from utility.backupFileName import file_name


# ? LIST OF BACKUPS
def list_backups():
    try:
       
        export_dir = os.path.join(os.getcwd(), backup_dir())
      
        if not os.path.exists(export_dir):
            return {"success": False, "message": "Backup directory does not exist"}

        backups = []

        for item in os.listdir(export_dir):
            item_path = os.path.join(export_dir, item)

            try:
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
                created_date = datetime.fromtimestamp(created_timestamp).strftime(
                    "%Y-%m-%d %H:%M:%S"
                )

                base_name = os.path.basename(item)
                db_name = base_name.split("__backup__")[0].split("_")[0]

                backups.append(
                    {
                        "file": item_path,
                        "db_name": db_name,
                        "size_mb": size_mb,
                        "created": created_date,
                        "type": item_type,
                        "backup_type": backup_type,
                    }
                )

            except Exception as file_err:

                continue

        return {"success": True, "count": len(backups), "data": backups}

    except Exception as e:
        return {"success": False, "message": str(e)}


# ? LOGICAL BACKUP
def logical_backup( db_name: str, table_name: Optional[str] = "" ):
    
    export_dir = os.path.join(os.getcwd(), backup_dir())
    os.makedirs(export_dir, exist_ok=True)
    backup_file = os.path.join(export_dir, file_name(db_name,table_name))

    cmd = [
        config["mysql"]["mysql_dump_path"],
        f"-h{config["host"]}",
        f"-P{config["port"]}",
        f"-u{config["user"]}",
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
            created_at = datetime.fromtimestamp(os.path.getctime(backup_file)).strftime(
                "%Y-%m-%d %H:%M:%S"
            )

            return {
                "success": True,
                "file_name": file_name(db_name,table_name),
                "path": backup_file,
                "size_mb": size_mb,
                "created_at": created_at,
            }

        else:
            return {"success": False, "error": result.stderr}

    except Exception as e:
        return {"success": False, "error": str(e)}




def raw_backup(db_name, xampp_path=r"C:\New Folder", backup_dir="backups"):

    mysql_data_dir = os.path.join(xampp_path, "mysql", "data")
    db_folder_path = os.path.join(mysql_data_dir, db_name)

    if not os.path.exists(db_folder_path):
        return {
            "success": False,
            "error": f"Database folder not found: {db_folder_path}",
        }

    try:
        
        os.makedirs(backup_dir, exist_ok=True)

        now = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_number = random.randint(1000, 9999)
        backup_subdir = f"{db_name}_backup_{now}_{unique_number}"

        full_backup_path = os.path.join(backup_dir, backup_subdir)

        shutil.copytree(db_folder_path, full_backup_path)

        folder_size_bytes = get_folder_size(full_backup_path)
        mb = folder_size_bytes / (1024 * 1024)

        return {
            "success": True,
            "backup_path": full_backup_path,
            "size_mb": mb,
            "message": f"Raw backup of database '{db_name}' completed.",
        }

    except Exception as e:
        return {"success": False, "error": str(e)}


backup_operations = {
    "list_backups": list_backups,
    "logical_backup": logical_backup,
    "raw_backup": raw_backup,
}
