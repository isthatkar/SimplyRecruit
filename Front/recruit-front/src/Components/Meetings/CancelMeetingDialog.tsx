import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const CancelMeetingDialog = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAdd = () => {
    navigate("addPosition");
  };

  const onCancel = async () => {
    //const response = await axios.put(`meetings/${meetingId}`);

    /* console.log(response);
    if (response.status === 204) {
      navigate("/projects");
    } */
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Cancel">
        <IconButton color="secondary" onClick={handleClickOpen}>
          <EventBusyIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to cancel this meeting?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
          <Button onClick={() => onCancel()}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CancelMeetingDialog;
