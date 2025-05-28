
from db.config import config 
from sqlalchemy import create_engine , text

MYSQL_URL : str = f"mysql+pymysql://{config["user"]}:@{config["host"]}:{config["port"]}"
base_engine = create_engine(MYSQL_URL, echo = True) 

def is_connected():
        
    try: 
        with base_engine.connect() as connection :
            connection.execute(text("SELECT 1"))
            return True
    except Exception as error:
        print(error)
        return False
        

    
