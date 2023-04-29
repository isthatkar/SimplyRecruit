import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box/Box";
import IconSelector from "./RatingSelector";
import axios from "axios";
import { Rating } from "../../Types/types";

interface AddReviewProps {
  applicationId: number;
  onAddObject: (newObject: Rating) => void;
}

const AddReviewDialog = ({ applicationId, onAddObject }: AddReviewProps) => {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [workRelatedRating, setWorkRelatedRating] = React.useState<number>(3);
  const [communicationRating, setCommunicationRating] =
    React.useState<number>(3);
  const [attitudeRating, setAttitudeRating] = React.useState<number>(3);
  const handleWorkRelatedClick = (value: number) => {
    setWorkRelatedRating(value);
  };

  const handleCommunicationClick = (value: number) => {
    setCommunicationRating(value);
  };

  const handleAttitudeClick = (value: number) => {
    setAttitudeRating(value);
  };

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
    const ratingDto = {
      skillsRatings: workRelatedRating,
      communicationRating: communicationRating,
      attitudeRating: attitudeRating,
      comment: comment,
    };

    const response = await axios.post(
      `applications/${applicationId}/ratings`,
      ratingDto
    );

    onAddObject(response.data as Rating);
    setComment("");
    setWorkRelatedRating(3);
    setCommunicationRating(3);
    setAttitudeRating(3);
  };

  return (
    <Box>
      <Button size="medium" variant="contained" onClick={handleClickOpen}>
        Add a review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSave} autoComplete="off">
          <DialogTitle>Add a review</DialogTitle>
          <DialogContent>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
            >
              <DialogContentText>Job-related skills:</DialogContentText>
              <IconSelector onIconClick={handleWorkRelatedClick} />
              <DialogContentText>Communication:</DialogContentText>
              <IconSelector onIconClick={handleCommunicationClick} />
              <DialogContentText>Attitude:</DialogContentText>
              <IconSelector onIconClick={handleAttitudeClick} />
              <DialogContentText>Tell us more:</DialogContentText>
              <TextField
                onChange={(e) => setComment(e.target.value)}
                multiline
                required
                rows={2}
                name="comment"
                value={comment}
                id="outlined-title-input"
                label="Comment"
                type="text"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AddReviewDialog;
