# import shutil
# import os
# import datetime
# import random
# from db.adminQuery import get_admin_query

# from db.admin import  Admin

# admin = Admin()

# def get_folder_size(folder_path):
#     total_size = 0
#     for dirpath, dirnames, filenames in os.walk(folder_path):
#         for f in filenames:
#             fp = os.path.join(dirpath, f)
#             # skip if it's a symlink
#             if not os.path.islink(fp):
#                 total_size += os.path.getsize(fp)
#     return total_size


# def raw_backup_specific_db(db_name, xampp_path=r"C:\New Folder", backup_dir='raw_backups'):

#     mysql_data_dir = os.path.join(xampp_path, "mysql", "data")
#     db_folder_path = os.path.join(mysql_data_dir, db_name)

#     if not os.path.exists(db_folder_path):
#         return {"success": False, "error": f"Database folder not found: {db_folder_path}"}

#     try:
#             os.makedirs(backup_dir, exist_ok=True)

#             now = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
#             unique_number = random.randint(1000, 9999)
#             backup_subdir = f"{db_name}_backup_{now}_{unique_number}"

#             full_backup_path = os.path.join(backup_dir, backup_subdir)

#             shutil.copytree(db_folder_path, full_backup_path)

#             folder_size_bytes = get_folder_size(full_backup_path)
#             mb = folder_size_bytes / (1024 * 1024)
#             return {
#                 "success": True,
#                 "backup_path": full_backup_path,
#                 "size_mb": mb,
#                 "message": f"Raw backup of database '{db_name}' completed."
#             }

#     except Exception as e:
#             return {"success": False, "error": str(e)}
        
# def print_backup_sizes(backup_dir='raw_backups'):
#     if not os.path.exists(backup_dir):
#         print(f"Backup directory '{backup_dir}' does not exist.")
#         return

#     # List all folders inside the backup_dir
#     for entry in os.listdir(backup_dir):
#         full_path = os.path.join(backup_dir, entry)
#         if os.path.isdir(full_path):
#             size_bytes = get_folder_size(full_path)
#             size_mb = size_bytes / (1024 * 1024)
#             print(f"Folder: {entry} | Size: {round(size_mb,2)} MB")
            

# def restore_raw_backup(backup_folder_path, db_name, xampp_path=r"C:\New Folder"):

#     try:
#         mysql_data_dir = os.path.join(xampp_path, "mysql", "data")
#         target_path = os.path.join(mysql_data_dir, db_name)

#         # Ensure the backup exists
#         if not os.path.exists(backup_folder_path):
#             return {"success": False, "error": f"Backup folder not found: {backup_folder_path}"}

#         # Remove existing database folder (if it exists)
#         if os.path.exists(target_path):
#             shutil.rmtree(target_path)

#         # Copy backup into MySQL data folder
#         shutil.copytree(backup_folder_path, target_path)

#         return {
#             "success": True,
#             "restored_to": target_path,
#             "message": f"Database '{db_name}' restored from raw backup."
#         }

#     except Exception as e:
#         return {"success": False, "error": str(e)}


from dotenv import load_dotenv
from os import getenv 

load_dotenv()

host = getenv("DB_HOST")
print(host)

password = getenv("DB_PASSWORD")
port = getenv("DB_PORT")
user = getenv("DB_USER")
print(password)
print(port)

from db.admin import Admin


admin = Admin()

result = admin.create_database('hahadb')

