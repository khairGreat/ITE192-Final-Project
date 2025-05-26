// components/inputs/BackupSearchBar.jsx
import { TextField, Stack, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function BackupSearchBtn({ query, setQuery, noMatch }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        label="Search Backup"
        variant="outlined"
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        error={noMatch}
        helperText={noMatch ? 'No matching backup found' : ''}
        InputProps={{
          className: 'font-primary',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color={noMatch ? 'error' : 'action'} />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{ className: 'font-primary' }}
      />
    </Stack>
  );
}
