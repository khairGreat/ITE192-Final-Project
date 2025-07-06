
from utility.rowSerialize import row_serialize
from db.connection import base_engine
from db.adminQuery import admin_query
from sqlalchemy import text 



def list_tables():
      try:  
            with base_engine.connect() as conn:
                result = conn.execute(text(admin_query()["table_stats"]))
                if not result:
                    return {
                        "success" : False , 
                        "message" : 'Failed to fetch the data' ,
                        "result" : str(result)
                    }
                rows = result.fetchall()
            
            tables = row_serialize(rows=rows , type='tables')
            return { "success" : True , "count" : len(tables),  "data" : tables  }
        
      except Exception as error:
            return {
                "success" : False ,
                "errorMessage"  : error
            }
    
def create_table( db_name: str, table_name: str): 
        does_tables_exist = any(table["table_name"] == table_name for table in list_tables()["data"])
        
        if does_tables_exist:
            return {
                "success" : False , 
                "message" : f"Failed to create table {table_name} exist in {db_name}"
            } 
        
        query = admin_query(db_name, table_name)["create"][1]
        
        try:
            with base_engine.connect() as conn:
                conn.execute(text(query))
                conn.commit()
        
            return {
                "success": True,
                "message": f"Table `{table_name}` created successfully in database `{db_name}`." ,
            }
            
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

def delete_table( db_name: str, table_name: str ):
        print(f"db name : {db_name} ---- table name: {table_name}" )
            
        query = admin_query(db_name,table_name)["drop"][1]
        target = f"table `{table_name}` from database `{db_name}`"
        
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



      
table_operation = {
    "list_tables" : list_tables , 
    "create_table" : create_table ,
    "delete_table" : delete_table 
} 