import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface CopyLinkDialogProps {
  open: boolean;
  onClose: () => void;
  link: string;
}

const CopyLinkDialog: React.FC<CopyLinkDialogProps> = ({
  open,
  onClose,
  link,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Copy Link</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Copy this link and share it with your attendees to schedule the
          meeting.
        </DialogContentText>
        <DialogContentText>{link}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={copyToClipboard} color="primary">
          Copy
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CopyLinkDialog;
