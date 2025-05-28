import {} from "react";

import { useDatabase } from "./context/useDatabase";
import { useTables } from "./context/useTables";
import { useGetBackup } from "./context/useGetBackup";
import { useSuccess } from "./context/useSuccess";

export function useCreateTable() {
  
  const { fetchDatabases } = useDatabase();
  const { fetchTables } = useTables();
  const { fetchBackups } = useGetBackup();
  const { setNotifData } = useSuccess();

  const addTable = async (db_name, table_name, saveBackup) => {
    const url = `http://127.0.0.1:8000/createtable/${db_name}/${table_name}`;
    const response = await fetch(url, { method: "POST" });

    if (saveBackup) {
      const tableBackup = await fetch(
        `http://127.0.0.1:8000/tablebackup/${db_name}/${table_name}`,
        {
          method: "POST",
        }
      );
      if (tableBackup.ok) {
        console.log(`Succesfully creating a backup for ${table_name}`);
        await fetchBackups();
      }
    }

    if (response.ok) {
      const message = `Successfully created ${table_name} table at ${db_name} database`;
      await fetchDatabases();
      await fetchTables();

      setNotifData({
        success: true,
        message: message,
        severity: "success",
      });
      console.log(message);
    } else {
      const message = `Failed to create ${table_name} table at ${db_name} database`;
     

      console.error(message);
    }
  };

  return { addTable };
}
