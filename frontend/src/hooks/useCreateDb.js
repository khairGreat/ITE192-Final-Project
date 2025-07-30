import {} from "react";
import { useSuccess } from "./context/useSuccess";
import { useDatabase } from "./context/useDatabase";
import { useTables } from "./context/useTables";
import { useGetBackup } from "./context/useGetBackup"
import request from "./request";

export const useCreateDb = () => {
  const { setNotifData } = useSuccess();
  const { fetchDatabases } = useDatabase();
  const { fetchTables } = useTables();
  const { fetchBackups } = useGetBackup()
  const addDb = async (db_name, saveBackup) => {
    const url = `http://127.0.0.1:8000/databases/create`;
    const response = await fetch(url, {
      method: "POST",
      body : JSON.stringify({db_name : db_name})
    });

    if (saveBackup) {
      const backupResponse = await fetch(
        `http://127.0.0.1:8000/backups/createlogical`,
        {
          method: "POST",
          body : JSON.stringify({
            db_name : db_name
          })
        }
      );
      
      if (backupResponse.ok) {
        console.log(`Succesfully created backup for ${db_name}`);
        await fetchBackups()
        
      }
    }
    if (response.ok) {
      await fetchDatabases();
      await fetchTables();
      setNotifData({
        success: true,
        message: `Successfully created database ${db_name}`,
        severity: "success",
      });
    } else {
      setNotifData({
        success: true,
        message: `Failed to create database ${db_name}`,
        severity: "error",
      });
      console.error(`Failed to create database ${db_name}`);
    }
  };

  return { addDb };
};
