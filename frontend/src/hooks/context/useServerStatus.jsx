import { createContext, useContext, useState, useEffect } from "react";
import request  from "../request";

const ServerStatusContext = createContext();

export const ServerStatusProvider = ({ children }) => {
  const [serverStatus, setServerStatus] = useState(null);

  const fetchServerStatus = async () => {
    try {
      const res = await request.get("/admin/status"); 

      if (res.status) {
        const { data  } = res.data ;
        
        setServerStatus(data);  
        console.log("server status:", data);
      }
    } catch (error) {
      console.error("Error fetching server status:", error);
    }
  };

  useEffect(() => {
    fetchServerStatus();
  }, []);

  return (
    <ServerStatusContext.Provider value={{ serverStatus, fetchServerStatus }}>
      {children}
    </ServerStatusContext.Provider>
  );
};

export const useServerStatus = () => useContext(ServerStatusContext);
