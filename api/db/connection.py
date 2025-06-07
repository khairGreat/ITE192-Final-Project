from db.config import config 
from sqlalchemy import create_engine, text

# Add password too!
MYSQL_URL = f"mysql+pymysql://{config['user']}:{config['password']}@{config['host']}:{config['port']}"

base_engine = create_engine(MYSQL_URL, echo=True)

def is_connected():
    try:
        with base_engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            print("Connection is active.")
            return True
    except Exception as e:
        print(f" Connection failed: {e}")
        return False

if is_connected():
    print('Successfully established a connection')
else:
    print('Failed to established a connection')
