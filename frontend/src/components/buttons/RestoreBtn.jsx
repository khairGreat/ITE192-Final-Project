import React from 'react';
import { Button } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';

export default function RestoreBtn( { restoreFunc}) {
  return (
    <Button
     onClick={ restoreFunc }
      variant="contained"
      startIcon={<RestoreIcon />}
      className="font-primary" 
      sx={{
        backgroundColor: '#3b82f6', // blue
        color: 'white',
        borderRadius: '0.5rem', // Tailwind's rounded-md
        px: 2,
        py: 1,
        '&:hover': {
          backgroundColor: '#1565c0',
        },
      }}
    >
      <span className='font-primary'>Restore</span>
    </Button>
  );
}
