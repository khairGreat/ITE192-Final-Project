

def db_obj(row):
    creation_date = row.creation_date
    if creation_date is not None:
        creation_date = creation_date.strftime("%Y-%m-%d %H:%M:%S")
    else:
        creation_date = "No tables (unknown creation date)"

    return {
        "db_name": row.db_name,
        "table_count": row.table_count,
        "size_mb": round(float(row.size_mb), 2),
        "creation_date": creation_date,
    }


def table_obj(row):
    return {
        "database_name": row.database_name,
        "table_name": row.TABLE_NAME,
        "size_mb": float(row.size_mb or 0),  # Defensive fallback in case of NULL
        "table_rows": int(row.TABLE_ROWS or 0),  # Just in case table_rows is NULL
    }


def row_serialize(rows, type: str):

    list_of_rows = []

    match type:
        case "databases":
            for row in rows:
                list_of_rows.append(db_obj(row))
        case "tables":
            for row in rows:
                list_of_rows.append(table_obj(row))
                
    return list_of_rows
