import { useState, useEffect } from "react";

export const useHasData = () => {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const checkData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/");
        setHasData(response.ok);
      } catch (error) {
        console.error("Error checking data:", error);
        setHasData(false);
      }
    };

    checkData();
    
  }, []);

  return { hasData };
};
