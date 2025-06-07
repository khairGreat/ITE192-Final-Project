import {} from "react";
import { useGetBackup } from "./context/useGetBackup";
import { useSuccess } from "./context/useSuccess";

export const useCreateBackup = () => {
  const { fetchBackups } = useGetBackup();

  const { setNotifData } = useSuccess();

  const createBackup = async (dbName, tableName = "") => {
    const response = await fetch(`http://127.0.0.1:8000/backups/createlogical`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        db_name: dbName,
        table_name: tableName,
      }),
    });

    if (response.ok) {
      if (tableName.length != 0) {
        setNotifData({
          success: true,
          message: `Succesfully created a backup for ${tableName} table!`,
          severity: "success",
        });

        console.log(`Succesfully created a backup for ${tableName} table!`);
      }

      setNotifData({
        success: true,
        message: `Succesfully created a backup for ${dbName} database!`,
        severity: "success",
      });

      fetchBackups();
      console.log(`Succesfully created a backup for ${dbName} database!`);
    } else {
      if (tableName.length != 0) {
        setNotifData({
          success: true,
          message: `Failed to create a backup for ${tableName} table!`,
          severity: "error",
        });
        console.error(`Failed to create a backup for ${tableName} table!`);
      }

      setNotifData({
        success: true,
        message: `Faled to create backup for ${dbName} database!`,
        severity: "error",
      });

      console.error(`Database ${dbName} Failed to create backup`);
    }
  };

  return { createBackup };
};
