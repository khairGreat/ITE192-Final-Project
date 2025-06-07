import { createContext, useContext, useState, useEffect } from "react";

const ServerStatusContext = createContext();

export const ServerStatusProvider = ({ children }) => {
  const [serverStatus, setServerStatus] = useState(null);

  const fetchServerStatus = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/status"); // customize URL
      const { success, data } = await res.json();
      if (success) {
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
