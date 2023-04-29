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
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { toast } from "react-toastify";
import { Meeting } from "../../Types/types";

interface CancelMeetingProps {
  meeting: Meeting;
}
const CancelMeetingDialog = ({ meeting }: CancelMeetingProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCancel = async () => {
    const response = await axios.put(`meetings/${meeting.id}`, {
      isCanceled: true,
    });

    if (response.status === 200) {
      toast.success("Meeting canceled.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
