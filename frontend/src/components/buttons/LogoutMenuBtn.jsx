import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';

export const LoginMenuBtn = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      startIcon={<Logout />}
      onClick={() => navigate('/')}
      className={className}
      sx={{
        bgcolor: 'black',
        borderRadius: '10px',
        mt: 'auto',
        boxShadow: 2,
        '&:hover': {
          bgcolor: '#1c1c1c',
        },
        mb : '20px'
      }}
    >
      <span className="font-primary text-white">Logout</span>
    </Button>
  );
};
