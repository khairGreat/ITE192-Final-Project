
from typing import Optional

# ? operations or services
from db.db_operations.backup import backup_operations
from db.db_operations.database import database_operations
from db.db_operations.table import table_operation
from db.db_operations.logger import log_operations
from db.db_operations.restore import restore_operations 
from db.config import config 
class Admin:
    
    def __init__(self ) -> None:
        self.username = config["admin_cred"]["admin_username"]
        self.password = config["admin_cred"]["admin_password"]
    
    def list_databases(self):
        return database_operations["list_databases"]()
    
    def list_backups(self):
        return backup_operations["list_backups"]()

    def list_tables(self):
        return table_operation["list_tables"]()
    
    
    def authenticate(self, username: str, password: str) -> bool:
        return username == self.username and password == self.password

    def create_database(self, db_name: str):
        return database_operations["create_database"](db_name)
        
        
    def create_table(self, db_name: str, table_name: str): 
       return table_operation["create_table"](db_name,table_name)
    
    
    def logical_backup( self, db_name: str, table_name: Optional[str] = None, ):
        return backup_operations["logical_backup"](db_name,table_name)
    
    def raw_backup (self, db_name : str, ):
        return backup_operations["raw_backup"](db_name)
        

    def logical_restore( self, sql_file: str,db_name: str,):
        return restore_operations["logical_restore"](sql_file,db_name)
    
    def raw_restore(self, raw_backup_dir : str , db_name : str  ):
        return restore_operations["raw_restore"](raw_backup_dir , db_name) 

  
    def drop_db(self, db_name: str):
        return database_operations["delete_db"](db_name)

    def drop_table(self, db_name : str , table_name : str ) :
        return database_operations["delete_table"](db_name,table_name)
            
    def get_server_status(self):
        return database_operations["server_status"]()
    
    
    #  ? LOGS   
    
    def get_logs(self): 
        return log_operations["logs"]()
        
    def create_log(self, log_level: str,  target : str,  message: str, module = None,):
       return log_operations["create_log"](
           log_level , target, message, module
       )