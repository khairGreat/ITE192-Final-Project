import { useState } from "react";

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
 
  const checkAdmin = async (username, password) => {
   
    setIsAdmin(false); // reset before checking
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/admin/auth/${username}/${password}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        console.error("Failed to authenticate admin");
        setIsAdmin(false);
   
        return false;
      }

      const data = await response.json();
      setIsAdmin(data.success);
      return data.success;
    } catch (error) {
      console.error("Error during admin auth:", error);
      setIsAdmin(false);
      return false;
    }
  };

  return { checkAdmin, isAdmin };
};
