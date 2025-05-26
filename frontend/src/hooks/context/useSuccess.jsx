import React, { createContext, useContext, useState, useEffect } from 'react';

const SuccessContext = createContext();

export const SuccessProvider = ({ children }) => {
  const [notifData, setNotifData] = useState({
    success: false,
    message: '',
    severity: 'success',
  });
  
  
  useEffect(() => {
    if (notifData.success) {
      const timer = setTimeout(() => {
        setNotifData(prev => ({ ...prev, success: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifData.success]);

  return (
    <SuccessContext.Provider value={{ ...notifData, setNotifData }}>
      {children}
    </SuccessContext.Provider>
  );
};

export const useSuccess = () => useContext(SuccessContext);
