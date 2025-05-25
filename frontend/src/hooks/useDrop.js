import {    } from "react";
import { useDatabase } from "./context/useDatabase";
import { useTables } from "./context/useTables";
import { useSuccess } from "./context/useSuccess";

export const useDropDb = () => {
    
    const  { setNotifData } = useSuccess();
    const  {  fetchDatabases } = useDatabase();
    const {  fetchTables } = useTables() ;
    
    const dropDb = async ( db_name ) => {
        const response = await fetch( `http://127.0.0.1:8000/dropdb/${db_name}` ,{
            method : "DELETE"
        })

        if ( response.ok) {

           setNotifData({
            success: true,
            message: `Succesfully droping ${db_name} database!`,
            severity: 'success',
            });

            await fetchDatabases()
            await fetchTables()

            console.log(`Succesfully droping ${db_name}`);
            
        } else {
            setNotifData({
                success: true,
                message: `Failed droping ${db_name} database!` ,
                severity: 'error',
            });

            console.error(`Failed droping ${db_name}`);
            
        }
    }
    
    return {  dropDb }
}


export const useDropTable = () => {

    const {  fetchTables } = useTables() ;
    const { fetchDatabases} = useDatabase();

     const  { setNotifData } = useSuccess();

    const droptable = async (db_name,table_name) => {
        const url = `http://127.0.0.1:8000/droptable/${db_name}/${table_name}`
        const response = await fetch( url  ,{
            method : "DELETE"
        })

        if (response.ok) {

            setNotifData({
                success: true,
                message: `Succesfully droping ${table_name} table!`,
                severity: 'success',
            });

            await fetchTables()
            await fetchDatabases();

            console.log(`Succesfully droping ${table_name} at ${db_name}`);
        } else {
            setNotifData({
                success: true,
                message: `Failed droping ${table_name} table!`,
                severity: 'error',
            });

            
            console.error(`Failed droping ${table_name} at ${db_name}`);
        }
    }

    return { droptable}

 } 
