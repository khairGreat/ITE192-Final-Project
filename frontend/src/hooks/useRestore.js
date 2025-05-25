import {  } from "react";
import { useTables } from "./context/useTables";
import { useDatabase } from "./context/useDatabase";
import { useSuccess } from "./context/useSuccess";

export const useRestore = () => {
const  { setNotifData } = useSuccess();
  
  const { fetchTables } = useTables();
  const { fetchDatabases } = useDatabase();

  const restore = async (dbname, backupPath) => {
 
    const url = `http://127.0.0.1:8000/restore/${dbname}`;

  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ backup_path: backupPath }),
      });

      if (response.ok) {

         await response.json();
         await fetchTables()
         await fetchDatabases();

         setNotifData({
            success: true,
            message: `Restore Succesful!`,
            severity: 'success',
        });

         
        console.log(`Database ${dbname} restored successfully from ${backupPath}`);
      } else  {

        
         setNotifData({
            success: true,
            message: `Restore Failed!`,
            severity: 'success',
        });
       
        console.error(`Failed to restore database ${dbname} from ${backupPath}`);
        
      }

     
   
  };

  return { restore };
};
