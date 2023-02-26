import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box/Box";
import {
  FormControl,
  InputLabel,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import Theme from "../../Styles/Theme";

const AddScheduledMeetingDialog = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

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
    <ThemeProvider theme={Theme}>
      <div>
        <ToastContainer />

        <Button size="medium" variant="contained" onClick={handleClickOpen}>
          Get new meeting scheduling link
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add a scheduled meeting</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill the meeting information
            </DialogContentText>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
            >
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                required
                value={title}
                id="outlined-title-input"
                label="Title"
                type="text"
              />
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                required
                value={title}
                id="outlined-title-input"
                label="Description"
                type="text"
              />
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                required
                value={title}
                id="outlined-title-input"
                label="Description"
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
    </ThemeProvider>
  );
};

export default AddScheduledMeetingDialog;
