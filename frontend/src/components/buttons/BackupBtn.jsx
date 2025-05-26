import React from "react";
import { Button } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";

export default function BackupBtn({ backupFunc }) {
  return (
    <Button
      onClick={backupFunc}
      variant="contained"
      startIcon={<BackupIcon />}
      sx={{
        backgroundColor: "#3b82f6", // Tailwind's blue-800
        color: "white",

        borderRadius: "0.5rem",
        "&:hover": {
          backgroundColor: "#1d4ed8", // Tailwind's blue-700
        },
      }}
    >
      <span className="font-primary">Backup</span>
    </Button>
  );
}
