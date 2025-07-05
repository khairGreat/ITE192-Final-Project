from utility.logAct import log_act
from db.config import config
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker


MYSQL_URL = f"mysql+pymysql://{config['user']}:{config['password']}@{config['host']}:{config['port']}/log"

base_engine = create_engine(MYSQL_URL, echo=True)
ModelBase = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=base_engine)


def is_connected():
    try:
        with base_engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            return True
    except Exception as e:
        print(f" Connection failed: {e}")
        return False


if is_connected():
    log_act(message="Succesfully Established a database connection")
else:
    log_act("Failed to established a database connection")
