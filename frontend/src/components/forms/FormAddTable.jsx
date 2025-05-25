import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useDatabase } from '../../hooks/context/useDatabase';

export default function FormAddTable({ open, onClose, onSave }) {
  const { databases } = useDatabase(); // Get databases from context
  const [tableName, setTableName] = useState('');
  const [selectedDb, setSelectedDb] = useState('');
  const [saveBackup, setSaveBackup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tableName.trim() || !selectedDb.trim()) return;

    onSave({ tableName, selectedDb, saveBackup });
    setTableName('');
    setSelectedDb('');
    setSaveBackup(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          bgcolor: 'black',
          color: 'white',
          fontWeight: 'bold',
          borderBottom: '2px solid white',
        }}
      >
        <div className='font-primary text-center'>Add New Table</div>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ bgcolor: 'white' }}>
          <TextField
            className="font-primary"
            autoFocus
            margin="dense"
            label="Table Name"
            type="text"
            fullWidth
            variant="outlined"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            sx={{
              input: { color: 'black' },
              label: {
                color: 'gray',
                fontFamily: 'var(--font-primary)',
                '&.Mui-focused': { color: 'black' },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'gray' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
              },
            }}
          />

          <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
            <InputLabel
              id="select-db-label"
              sx={{
                color: 'gray',
                fontFamily: 'var(--font-primary)',
                '&.Mui-focused': { color: 'black' },
              }}
            >
              Choose Database
            </InputLabel>
            <Select
              labelId="select-db-label"
              value={selectedDb}
              onChange={(e) => setSelectedDb(e.target.value)}
              label="Choose Database"
              sx={{
                color: 'black',
                fontFamily: 'var(--font-primary)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              }}
            >
              {databases.map((db, index) => (
                <MenuItem key={index} value={db}>
                  {db.db_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={saveBackup}
                onChange={(e) => setSaveBackup(e.target.checked)}
                sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }}
              />
            }
            label="Save a Backup"
            sx={{ mt: 2, fontFamily: 'var(--font-primary)', color: 'black' }}
          />
        </DialogContent>

        <DialogActions sx={{ bgcolor: 'white' }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              fontFamily: 'var(--font-primary)',
              color: 'black',
              borderColor: 'black',
              '&:hover': {
                borderColor: 'black',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            cancel
          </Button>

          <Button type="submit" variant="contained" sx={{ bgcolor: 'black' }}>
            <span className='font-primary text-white'>Save</span>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
