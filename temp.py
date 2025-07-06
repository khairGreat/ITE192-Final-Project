from pydantic import BaseModel 
from fastapi import FastAPI
import passlib 


class UserLogin(BaseModel):
    username : str 
    password : str
    

class TokenResponse(BaseModel):
    access_token : str
    token_type : str 
    

