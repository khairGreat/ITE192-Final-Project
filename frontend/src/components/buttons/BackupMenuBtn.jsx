import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Backup } from '@mui/icons-material'; // <-- import the icon

export const BackupMenuBtn = () => {
  const navigate = useNavigate( );

  return (
    <Button
    
     variant='contained'
     sx={{
        bgcolor: 'black' }}
      startIcon={<Backup />} // <-- add icon here
      onClick={() => navigate('/admin/backup')}
    >
      <span className="text-[0.8rem] font-primary text-white">Backup</span>
    </Button>
  );
};
