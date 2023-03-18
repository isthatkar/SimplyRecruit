import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box/Box";
import IconSelector from "./RatingSelector";

const AddReviewDialog = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState<number | null>(null);

  const handleIconClick = (value: number) => {
    setSelectedValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    console.log(selectedValue);
    console.log(comment);
    setOpen(false);
  };

  React.useEffect(() => {
    setSelectedValue(3);
    setComment("");
  }, []);

  return (
    <div>
      <ToastContainer />

      <Button size="medium" variant="contained" onClick={handleClickOpen}>
        Add a review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a review</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
          >
            <DialogContentText>Job-related skills</DialogContentText>

            <IconSelector onIconClick={handleIconClick} />
            <DialogContentText>Communication</DialogContentText>

            <IconSelector onIconClick={handleIconClick} />
            <DialogContentText>Flexibility</DialogContentText>

            <IconSelector onIconClick={handleIconClick} />
            <DialogContentText>Attitude</DialogContentText>

            <IconSelector onIconClick={handleIconClick} />

            <TextField
              onChange={(e) => setComment(e.target.value)}
              multiline
              required
              rows={2}
              value={comment}
              id="outlined-title-input"
              label="Comment"
              type="text"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddReviewDialog;
