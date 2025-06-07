from db.connection import base_engine
from db.config import config
from db.adminQuery import admin_query
from sqlalchemy import text

# ? LIST OF LOGS
def get_logs(): 
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
        

# ? CREATE LOG
def create_log( log_level: str,  target : str,  message: str, module = None,):
        with base_engine.connect() as con:
            con.execute(text(admin_query()["log"]["use"]))
            insert_sql = text(admin_query()["log"]["insert"])
            con.execute(insert_sql, {"log_level": log_level, "message": message, "module": module, "target": target})
            con.commit() 

log_operations = {
    "logs" : get_logs , 
    "create_log" : create_log
}