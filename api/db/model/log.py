from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from utility.logAct import log_act
from db.connection import ModelBase 

class Logs(ModelBase):  
    __tablename__ = "logs"
   
    log_id = Column(Integer, primary_key=True, autoincrement=True)
    log_level = Column(String(250), nullable=False)
    message = Column(String(500), nullable=False) 
    module = Column(String(250), nullable=False)
    target = Column(String(250), nullable=False)
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)  
    
log_act(message="Log model loaded Succesfully")
