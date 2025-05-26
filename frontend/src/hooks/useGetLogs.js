import { useEffect, useState } from "react" ;

export const useGetLogs = () => {
    const [ logs , setLogs] = useState([]) ;

    const getLogs = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/admin/logs") ;
            if (!response.ok) {
                throw new Error("Failed to fetch logs") ;
            }
            const data = await response.json() ;
            setLogs(data) ;
        } catch (error) {
            console.error("Error fetching logs:", error) ;
        }
    } ;

    useEffect(() => {
        getLogs() ;
    }, []) 

    return { logs }

}