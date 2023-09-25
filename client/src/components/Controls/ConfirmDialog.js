import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import CustomButton from "./CustomButton";

const ConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props;

  const handleClose = () => {
    setConfirmDialog(false);
  };

  return (
    <Dialog
      open={confirmDialog.isOpen}
      onClose={handleClose}
      maxWidth="xs"
      sx={{
        position: "absolute",
        top: "-30rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DialogContent style={{ padding: "20px 40px" }}>
        <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">{confirmDialog.subtitle}</Typography>
      </DialogContent>
      <DialogActions style={{ padding: "10px 40px 20px" }}>
        <CustomButton
          label="No"
          variant="outlined"
          color="error"
          width="80px"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <CustomButton
          label="Yes"
          variant="contained"
          bgcolor="var(--primary-color)"
          width="80px"
          hoverBgColor="#303030"
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
