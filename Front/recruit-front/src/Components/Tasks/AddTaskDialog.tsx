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

const AddTaskDialog = () => {
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
      <Button size="medium" variant="contained" onClick={handleClickOpen}>
        Add new task for candidate
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSave}
          autoComplete="off"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
        >
          <DialogTitle>Add task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`For bullet points in multiline fields, separate the lines with a semicolon ; `}
            </DialogContentText>

            <TextField
              required
              id="outlined-title-input"
              label="Title"
              type="text"
            />
            <TextField
              required
              id="outlined-title-input"
              label="Goal"
              type="text"
            />
            <TextField
              multiline
              rows={3}
              required
              id="outlined-title-input"
              label="Instructions"
              type="text"
            />
            <TextField
              multiline
              rows={3}
              id="outlined-title-input"
              label="Deliverables"
              type="text"
            />
            <TextField
              multiline
              rows={3}
              id="outlined-title-input"
              label="Criteria for evaluation"
              type="text"
            />
            <TextField
              name="finalTime"
              label="Deadline"
              type="datetime-local"
              variant="outlined"
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default AddTaskDialog;
