import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { toast, ToastContainer } from "react-toastify";

interface CancelMeetingProps {
  meetingId: number | undefined;
}
const CancelMeetingDialog = ({ meetingId }: CancelMeetingProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCancel = async () => {
    const response = await axios.put(`meetings/${meetingId}`, {
      isCanceled: true,
    });

    console.log(response);
    if (response.status === 200) {
      toast.success("Meeting canceled.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setOpen(false);
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
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
