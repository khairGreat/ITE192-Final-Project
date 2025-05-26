import React, { useState, useEffect, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Slide,
} from "@mui/material";
import { useDatabase } from "../../hooks/context/useDatabase";

// Slide Transition from bottom
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormAddDb({ open, onClose, onSave }) {
  const [dbname, setDbname] = useState("");
  const [saveBackup, setSaveBackup] = useState(false);
  const [error, setError] = useState(false);
  const { databases } = useDatabase();

  // Check for duplicate name
  useEffect(() => {
    const nameExists = databases.some(
      (db) => db.db_name.toLowerCase() === dbname.trim().toLowerCase()
    );
    setError(nameExists);
  }, [dbname, databases]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dbname.trim() || error) return;

    onSave({ dbname: dbname.trim(), saveBackup });
    setDbname("");
    setSaveBackup(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle
        sx={{
          bgcolor: "black",
          color: "white",
          fontWeight: "bold",
          borderBottom: "2px solid white",
        }}
      >
        <div className="font-primary text-center">Add New Database</div>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ bgcolor: "white" }}>
          <TextField
            className="font-primary"
            autoFocus
            margin="dense"
            label="Database Name"
            type="text"
            fullWidth
            variant="outlined"
            value={dbname}
            onChange={(e) => setDbname(e.target.value)}
            error={error}
            helperText={error ? "Database name already exists." : ""}
            sx={{
              input: {
                color: "black",
                fontFamily: "var(--font-primary)",
              },
              label: {
                color: "gray",
                fontFamily: "var(--font-primary)",
                "&.Mui-focused": { color: "black" },
              },
              "& .MuiOutlinedInput-root": {
                fontFamily: "var(--font-primary)",
                "& fieldset": { borderColor: "gray" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={saveBackup}
                onChange={(e) => setSaveBackup(e.target.checked)}
                sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
              />
            }
            label="Save a Backup"
            sx={{
              mt: 2,
              fontFamily: "var(--font-primary)",
              color: "black",
            }}
          />
        </DialogContent>

        <DialogActions sx={{ bgcolor: "white" }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              fontFamily: "var(--font-primary)",
              color: "black",
              borderColor: "black",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={!dbname.trim() || error}
            sx={{
              bgcolor: "black",
              fontFamily: "var(--font-primary)",
              "&:disabled": {
                bgcolor: "gray",
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
