import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box/Box";
import axios from "axios";
import { Rating } from "../../Types/types";
import { ListItemButton } from "@mui/material";
import { toast } from "react-toastify";

interface deleteReviewProps {
  rating: Rating;
  onDeleteObject: () => void;
}

const DeleteReviewDialog = ({ rating, onDeleteObject }: deleteReviewProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    addRating();
    setOpen(false);
  };

  const addRating = async (): Promise<void> => {
    const response = await axios.delete(
      `applications/${rating.applicationId}/ratings/${rating.id}`
    );

    if (response.status === 204) {
      onDeleteObject();
    } else {
      toast.error("Failed to delete review!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Box>
      <ListItemButton onClick={handleClickOpen}>Delete</ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSave} autoComplete="off">
          <DialogTitle>
            Are you sure you want to delete this review?
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button type="submit">Yes</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DeleteReviewDialog;
