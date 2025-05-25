import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableChart } from '@mui/icons-material';

export const TableMenuBtn = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      startIcon={<TableChart />}
      onClick={() => navigate('/admin/table')}
      sx={{
        bgcolor: 'black',
        borderRadius: '10px',
        boxShadow: 2,
        '&:hover': {
          bgcolor: '#1c1c1c',
        },
      }}
    >
      <span className="text-[0.8rem] font-primary text-white">Table</span>
    </Button>
  );
};
