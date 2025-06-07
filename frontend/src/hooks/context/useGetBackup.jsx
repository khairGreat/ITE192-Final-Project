import { createContext, useContext, useState, useEffect } from "react";

const BackupContext = createContext();

export const BackupProvider = ({ children }) => {
  const [backups, setBackups] = useState([]);

  const fetchBackups = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/backups/list", {
        method: "GET",
      });
      const { success, data, message } = await response.json();

      if (response.ok) {
        if (success) {
          setBackups(data);
          console.log("Backup data:", data);
        } else {
          console.warn(
            "Server responded with failure:",
            message || "No message provided"
          );
          
        }
      } else {
        console.error("HTTP error while fetching backups.");
        
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
