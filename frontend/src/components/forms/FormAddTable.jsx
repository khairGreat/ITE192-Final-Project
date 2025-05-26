import React, { useState, useEffect } from 'react';
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
  Slide,
} from '@mui/material';
import { useDatabase } from '../../hooks/context/useDatabase';
import { useTables } from '../../hooks/context/useTables';

// Transition component for slide animation from bottom
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormAddTable({ open, onClose, onSave }) {
  const { databases } = useDatabase();
  const { tables } = useTables();

  const [tableName, setTableName] = useState('');
  const [selectedDb, setSelectedDb] = useState(''); // store db_name as string
  const [saveBackup, setSaveBackup] = useState(false);
  const [error, setError] = useState(false);

  // Check for duplicate table name in the selected database
  useEffect(() => {
    const nameExists = tables.some(
      (table) =>
        table.table_name.toLowerCase() === tableName.trim().toLowerCase() &&
        table.database_name === selectedDb
    );
    setError(nameExists);
  }, [tableName, selectedDb, tables]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tableName.trim() || !selectedDb || error) return;

    const selectedDatabase = databases.find((db) => db.db_name === selectedDb);

    onSave({
      tableName: tableName.trim(),
      selectedDb: selectedDatabase,
      saveBackup,
    });

    setTableName('');
    setSelectedDb('');
    setSaveBackup(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}  // <-- slide animation added here
    >
      <DialogTitle
        sx={{
          bgcolor: 'black',
          color: 'white',
          fontWeight: 'bold',
          borderBottom: '2px solid white',
        }}
      >
        <div className="font-primary text-center">Add New Table</div>
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
            error={error}
            helperText={error ? 'Table name already exists in this database.' : ''}
            sx={{
              input: { color: 'black', fontFamily: 'var(--font-primary)' },
              label: {
                color: 'gray',
                fontFamily: 'var(--font-primary)',
                '&.Mui-focused': { color: 'black' },
              },
              '& .MuiOutlinedInput-root': {
                fontFamily: 'var(--font-primary)',
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
                <MenuItem key={index} value={db.db_name}>
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

          <Button
            type="submit"
            variant="contained"
            disabled={!tableName.trim() || !selectedDb || error}
            sx={{
              bgcolor: 'black',
              fontFamily: 'var(--font-primary)',
              '&:disabled': {
                bgcolor: 'gray',
              },
            }}
          >
            <span className="font-primary text-white">Save</span>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
