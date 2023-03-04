import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { IconButton } from "@mui/material";

const ArchiveApplicationButton = (props: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton size="medium" onClick={handleClickOpen}>
        <PersonOffIcon></PersonOffIcon>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Do you really want to archive this application? This cannot be undone.
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ArchiveApplicationButton;
