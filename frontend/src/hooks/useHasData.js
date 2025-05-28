import { useState, useEffect } from "react";

export const useHasData = () => {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const checkData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/");

        if (response.ok) {
          const { is_connected }  = await response.json()
          console.log(`is connected: ${is_connected}`);
          setHasData(is_connected);
          
        } else {
          setHasData(false);
        }
      } catch (error) {
        console.error("Error checking data:", error);
        setHasData(false);
      }
    };

    checkData();
  }, []);

  return { hasData };
};
