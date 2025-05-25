import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function FormAddDb({ open, onClose, onSave }) {
  const [dbname, setDbname] = useState("");
  const [saveBackup, setSaveBackup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    if (!dbname.trim()) return;
    onSave({ dbname, saveBackup }); // pass both values    setDbname("");
    setSaveBackup(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
            sx={{
              input: { color: "black" },
              label: {
                color: "gray",
                fontFamily: "var(--font-primary)",
                "&.Mui-focused": { color: "black" },
              },
              "& .MuiOutlinedInput-root": {
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
            sx={{ mt: 2, fontFamily: "var(--font-primary)", color: "black" }}
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
                backgroundColor: "rgba(0, 0, 0, 0.04)", // subtle black hover effect, optional
              },
            }}
          >
            cancel
          </Button>

          <Button type="submit" variant="contained" sx={{ bgcolor: "black" }}>
            <span className="font-primary text-white">Save</span>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
