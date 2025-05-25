import { createContext, useContext, useState, useEffect } from 'react';

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [databases, setDatabases] = useState([]);

  const fetchDatabases = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/databases');
      const data = await res.json();
      setDatabases(data);
    } catch (error) {
      console.error('Error fetching databases:', error);
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
