from sqlalchemy import create_engine , text

MYSQL_URL : str = "mysql+pymysql://root:@localhost:3306"
base_engine = create_engine(MYSQL_URL, echo = True) 

try: 
    with base_engine.connect() as con : 
        con.execute(text('SELECT 1'))
except Exception as error:
    print(error)