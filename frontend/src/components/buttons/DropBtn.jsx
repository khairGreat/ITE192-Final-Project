import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const DropBtn = ( {dropDbFunc}) => {
  return (
    <Button
      onClick={ dropDbFunc }
      variant="contained"
      startIcon={<DeleteIcon />}
      className="font-primary normal-case"
      sx={{
        backgroundColor: '#dc2626', // Tailwind's red-600
        color: 'white',
      
        borderRadius: '0.5rem',
        '&:hover': {
          backgroundColor: '#b91c1c', // Tailwind's red-700
        },
      }}
    >
        <span  className='font-primary'>Drop</span>
    </Button>
  );
};
