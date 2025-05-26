import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Dashboard } from '@mui/icons-material'; // Dashboard icon
 
export const DashboardBtn = ( { className = ""}) => {
  const navigate = useNavigate();

  return (
    <Button
    className =  {className}
      variant="contained"
      startIcon={<Dashboard />} // Add icon
      onClick={() => navigate("/admin/dashboard")}
      sx={{
        bgcolor: 'black',
        mt : "40px"
      }}
    >
      <span className="text-[0.8rem] font-primary text-white">Dashboard</span>
    </Button>
  );
};
