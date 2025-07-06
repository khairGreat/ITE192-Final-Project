
import os

cur_dir :str = os.getcwd()

def backup_dir() -> str:
    if cur_dir.endswith("api"):
        return "backups"
    else: 
        return "api/backups"