import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function BackupSearchBtn({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center"  >
      <TextField
        label="Search Backup"
        variant="outlined"
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{ className: 'font-primary' }}
        InputLabelProps={{ className: 'font-primary' }}
        />
     <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
        sx={{
            bgcolor: 'black',
            fontFamily: 'var(--font-primary), sans-serif', // Replace with your actual font name or CSS variable
            color: 'white',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            '&:hover': {
            bgcolor: '#222',
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)'
            }
        }}
      >
        Search
    </Button>

    </Stack>
  );
}
