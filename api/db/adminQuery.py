
def admin_query(db_name : str =  "", table_name = None):
    return {
        "create" :  ["CREATE DATABASE IF NOT EXISTS {}".format(db_name) ,
            f"""
        CREATE TABLE IF NOT EXISTS `{db_name}`.`{table_name}` (
            `id` INT PRIMARY KEY AUTO_INCREMENT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """           
        ], 
        "drop" : [ "DROP DATABASE IF EXISTS {}".format(db_name) , f"DROP TABLE IF EXISTS `{db_name}`.`{table_name}`"] ,
        "use_db" : "USE {}".format(db_name), 
        "table_stats" : """
            SELECT 
                table_schema AS database_name,
                table_name,
                ROUND((IFNULL(data_length, 0) + IFNULL(index_length, 0)) / 1024 / 1024, 2) AS size_mb,
                table_rows
            FROM 
                information_schema.tables
            WHERE 
                table_schema NOT IN ('mysql', 'information_schema', 'performance_schema', 'sys', 'phpmyadmin', 'log')
            ORDER BY 
                table_schema, table_name;
        """ ,
        "db_metadata" : """
             SELECT
            s.schema_name AS db_name,
            COUNT(t.table_name) AS table_count,
            IFNULL(SUM(t.data_length + t.index_length), 0) / 1024 / 1024 AS size_mb,
            MIN(t.create_time) AS creation_date
            FROM
                information_schema.schemata s
            LEFT JOIN
                information_schema.tables t ON s.schema_name = t.table_schema
            WHERE
                s.schema_name NOT IN ('mysql', 'information_schema', 'performance_schema', 'sys', 'phpmyadmin','log')
            GROUP BY
                s.schema_name
            ORDER BY
                s.schema_name;
        """ , 
        "server_status" : {
            "version" : "SELECT VERSION()",
            "uptime" : "SHOW GLOBAL STATUS LIKE 'Uptime'",
            "create_time" : """
                        SELECT MIN(create_time) FROM information_schema.tables 
                        WHERE create_time IS NOT NULL
                    """ ,
            "size_mb" : """
                        SELECT SUM(data_length + index_length) / 1024 / 1024 AS total_mb
                        FROM information_schema.tables
                    """ 
        } , 
        "log" : {
            "insert"  : """
                INSERT INTO app_logs (log_level, message, module, target)
                VALUES (:log_level, :message, :module, :target)
            """ ,
            "use" : "USE log;" ,
            "selectAll" : 'SELECT * FROM app_logs'
        }
      
    }