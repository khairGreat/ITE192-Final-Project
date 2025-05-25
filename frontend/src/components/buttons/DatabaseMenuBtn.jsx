import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Storage } from '@mui/icons-material'; // Import a database-like icon

export const DatabaseMenuBtn =()=> {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      startIcon={<Storage />} // Add icon
      onClick={() => navigate('/admin/database')}
      sx={{
        bgcolor: 'black',
        borderRadius: '10px',
        
      }}
    >
      <span className="text-[0.8rem] font-primary text-white">Database</span>
    </Button>
  );
}
