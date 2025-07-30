import { createContext, useContext, useState, useEffect } from "react";
import request from "../request";

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [databases, setDatabases] = useState([]);

  const fetchDatabases = async () => {
    try {
      ;
      const response = await request.get("/databases/list")

      if (response.status) {
        
        const { success, data, message } = response.data;

        if (success) {
          setDatabases(data);
          console.log("databases: ", data);
        } else {
          console.warn(
            "Server responded with failure:",
            message || "No message provided"
          );
        }
      } else {
        console.log('Server error');        
      }
    } catch (error) {
      console.error("Error fetching databases:", error);
      alert("Network or server error while fetching databases.");
    }
  };

  useEffect(() => {
    fetchDatabases();
  }, []);

  return (
    <DatabaseContext.Provider value={{ databases, fetchDatabases }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
