import { } from "react"
import { useGetBackup } from "./context/useGetBackup"
import { useSuccess } from "./context/useSuccess"


export const useCreateBackupDb = () => {

    const { fetchBackups } = useGetBackup()
   
    const { setNotifData } = useSuccess();
    
    const createBackupDb = async (dbname) => {

        const response = await fetch(`http://127.0.0.1:8000/dbackup/${dbname}`, {
                method : "POST"})
        if (response.ok) { 

            setNotifData({
                success: true,
                message: `Succesfully created a backup for ${dbname} table!` , 
                severity: 'success',
            });

            fetchBackups()
            console.log(`Database ${dbname} Backup created successfully`)
        } else {

            setNotifData({
                success: true,
                message: `Faled to create backup for ${dbname} database!`,
                severity: 'error',
            });
            console.error(`Database ${dbname} Failed to create backup`)
            
        }
    }

    return { createBackupDb  }

}

export const useCreateBackupTable = () => { 

    const { fetchBackups } = useGetBackup()
    const { setNotifData } = useSuccess();

    const createBackupTable = async (dbname, tablename) => {

        const response = await fetch(`http://127.0.0.1:8000/tablebackup/${dbname}/${tablename}`, {
                method : "POST"})

        if (response.ok) {

             setNotifData({
                success: true,
                message: `Succesfully created a backup for ${tablename} table!`,
                severity: 'success',
            });

            fetchBackups()
            console.info(`Table ${tablename} at Datbase ${dbname} Backup created successfully`)

         } else {

             setNotifData({
                success: true,
                message: `Faled to create backup for ${tablename} table!`,
                severity: 'error',
            });
            console.error(`Table ${tablename} at Datbase ${dbname} Failed to create backup`)
            
         }
    } 

    return { createBackupTable }
}