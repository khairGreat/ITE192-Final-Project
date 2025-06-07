import { createContext, useContext, useState, useEffect } from "react";

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [databases, setDatabases] = useState([]);

  const fetchDatabases = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/databases/list");

      if (res.ok) {
        const json = await res.json();
        const { success, data, message } = json;
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
