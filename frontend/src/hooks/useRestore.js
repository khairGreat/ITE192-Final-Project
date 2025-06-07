import {} from "react";
import { useTables } from "./context/useTables";
import { useDatabase } from "./context/useDatabase";
import { useSuccess } from "./context/useSuccess";

export const useRestore = () => {
  const { setNotifData } = useSuccess();

  const { fetchTables } = useTables();
  const { fetchDatabases } = useDatabase();

  const restore = async (dbname, backupPath , type ) => {
    const url = `http://127.0.0.1:8000/restore/logicalrestore`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        db_name: dbname,
        backup_path: backupPath,
        type : type 
      }),
    });

    if (response.ok) {
      await response.json();
      await fetchTables();
      await fetchDatabases();

      setNotifData({
        success: true,
        message: `Restore Succesful!`,
        severity: "success",
      });

      console.log(
        `Database ${dbname} restored successfully from ${backupPath}`
      );
    } else {
      setNotifData({
        success: true,
        message: `Restore Failed!`,
        severity: "error",
      });

      console.error(`Failed to restore database ${dbname} from ${backupPath}`);
    }
  };

  return { restore };
};
