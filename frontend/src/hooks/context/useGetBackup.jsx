import { createContext, useContext, useState, useEffect } from "react";

const BackupContext = createContext();

export const BackupProvider = ({ children }) => {
  const [backups, setBackups] = useState([]);

  const fetchBackups = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/backups", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setBackups(data);
        console.log("backup data:", data);
      } else {
        console.error("Failed to fetch backups");
      }
    } catch (error) {
      console.error("Error fetching backups:", error);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  return (
    <BackupContext.Provider value={{ backups, fetchBackups }}>
      {children}
    </BackupContext.Provider>
  );
};

// Custom hook to access backups context, keeping your original hook name
export const useGetBackup = () => useContext(BackupContext);
