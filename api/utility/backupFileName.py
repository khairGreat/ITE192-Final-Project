from datetime import datetime
from uuid import uuid4


def file_name( db_name , table_name) :
    
    yearnow = datetime.now().strftime("%Y")
    unique_number = uuid4().hex[:6]
    
    file_tag = f"{db_name}_({table_name})" if table_name else db_name
    file_name = f"{file_tag}__backup__{yearnow}-{unique_number}.sql"
    
    return file_name