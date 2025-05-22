from db.admin import Admin 


admin = Admin()

path = "./test/db1_db1_table1__backup__20253378.sql"
result = admin.restore(db_name="db1", sql_file=path)
print(result )