import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Typography,
  Slide,
} from "@mui/material";
import { FormatDateTime } from "../../utils/FormatDateTime";

// Slide transition for smooth animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Helper function to determine log level chip color
const getLogLevelColor = (level) => {
  switch (level?.toUpperCase()) {
    case "INFO":
      return "info";
    case "WARN":
      return "warning";
    case "ERROR":
      return "error";
    case "DEBUG":
      return "default";
    default:
      return "primary";
  }
};

export const LogTableModal = ({ open, onClose, logs }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Transition}         // Add smooth slide transition here
      transitionDuration={{ enter: 300, exit: 200 }}  // Customize animation duration
    >
      <DialogTitle className="font-primary text-xl font-semibold tracking-wide">
        <div className="font-primary uppercase text-center">Activity Logs</div>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          padding: 0,
          maxHeight: "50vh",
          overflowY: "auto",
        }}
      >
        <Table
          stickyHeader
          sx={{
            fontFamily: "'Cascadia Code', monospace",
            minWidth: 650,
            "& th": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
              textAlign: "center",
            },
            "& td": {
              verticalAlign: "top",
            },
            "& tr:nth-of-type(odd)": { backgroundColor: "#fafafa" },
            "& tr:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <div className="font-primary font-bold">Log Level</div>
              </TableCell>
              <TableCell>
                <div className="font-primary font-bold">Message</div>
              </TableCell>
              <TableCell>
                <div className="font-primary font-bold">Target</div>
              </TableCell>
              <TableCell>
                <div className="font-primary font-bold">Operation</div>
              </TableCell>
              <TableCell>
                <div className="font-primary font-bold">Log Time</div>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {logs && logs.length > 0 ? (
              [...logs]
                .reverse()
                .map((log, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <Chip
                        label={log.log_level}
                        color={getLogLevelColor(log.log_level)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        <div className="text-center font-primary">
                          {log.message}
                        </div>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        <div className="text-center font-primary">
                          {log.target || "-"}
                        </div>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        <div
                          className={`text-center font-primary px-2 py-1 rounded text-white ${
                            log.module?.toLowerCase() === "restore"
                              ? "bg-blue-500"
                              : log.module?.toLowerCase() === "create"
                              ? "bg-green-500"
                              : log.module?.toLowerCase() === "delete"
                              ? "bg-red-500"
                              : log.module?.toLowerCase() === "backup"
                              ? "bg-purple-500"
                              : "bg-gray-300 text-black"
                          }`}
                        >
                          {log.module || "-"}
                        </div>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        <div className="text-center font-primary">
                          {FormatDateTime(log.timestamp)}
                        </div>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" fontStyle="italic">
                    No log data available.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          sx={{ color: "black", borderColor: "black" }}
          onClick={onClose}
          variant="outlined"
        >
          <div className="font-primary">Close</div>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
