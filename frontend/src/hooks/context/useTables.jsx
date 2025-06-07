// src/hooks/TablesContext.js
import { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context
const TablesContext = createContext();

// 2. Provider component
export const TablesProvider = ({ children }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTables = async () => {
    const response = await fetch("http://127.0.0.1:8000/tables/list", { method: "GET" });

    if (response.ok) {
      const { data , success , message } = await response.json();
      if (success) {
        setTables(data)
        setLoading(false);
        console.log("tables:", data);
      } else { 
        console.log("Failed to fetch tables: ", message);
      }
    
    } else {
      console.error("Failed to fetch tables");
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <TablesContext.Provider value={{ tables, loading, fetchTables }}>
      {children}
    </TablesContext.Provider>
  );
};

// 3. Custom hook to use the context
export const useTables = () => useContext(TablesContext);
