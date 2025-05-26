import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Slide,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const ConfirmDrop = ({
  open,
  onClose,
  onConfirm,
  type = "", // 'table' or 'database'
  name = "",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      PaperProps={{
        sx: {
          position: "absolute",
          top: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          minWidth: 360,
          fontFamily: "var(--font--primary)",
          padding: "10px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontFamily: "var(--font--primary)",
        }}
      >
        <WarningAmberIcon color="warning" />
        <Typography
          variant="h6"
          component="div"
          sx={{ fontFamily: "var(--font--primary)" }}
        >
          Confirm Drop
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ fontFamily: "var(--font--primary)" }}>
          <div className="text-[1.2rem] font-bold">
            You are about to delete a {type}{" "}
            <span className="uppercase font-bold">{name}.</span>
          </div>
          <div className="text-center">Are you sure ?</div>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "black",
            borderColor: "black",
            fontFamily: "var(--font--primary)",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{ fontFamily: "var(--font--primary)" }}
        >
          confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
