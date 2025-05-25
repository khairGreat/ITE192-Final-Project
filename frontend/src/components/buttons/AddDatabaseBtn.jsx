import React from 'react';
import { Button } from '@mui/material';
import { Add } from "@mui/icons-material";

export default function AddDatabaseBtn( { onClick} ) {
  return (
    <Button
     onClick={ onClick }
      variant="contained"
      startIcon={<Add />}
      className="font-primary"
      sx={{
        bgcolor: 'black',
        color: 'white',
        borderRadius: '12px',
        padding: '12px 24px',
        fontWeight: 600,
        textTransform: 'uppercase',
        fontFamily: 'var(--font-primary), sans-serif', // ensure primary font is used
        boxShadow: '0px 8px 0px rgba(0, 0, 0, 0.7)',
        transform: 'translateY(-2px)',
        transition: 'all 120ms ease',

        '&:hover': {
          bgcolor: '#1a1a1a',
          boxShadow: '0px 4px 0px rgba(0, 0, 0, 0.5)',
          transform: 'translateY(0)'
        },

        '&:active': {
          bgcolor: '#111',
          boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.3)',
          transform: 'translateY(1px)'
        }
      }}
    >
      Add Database
    </Button>
  );
}
