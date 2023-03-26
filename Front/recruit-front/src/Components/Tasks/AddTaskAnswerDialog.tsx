import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import { Box, ListItemButton, TextField } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Task } from "../../Types/types";
import { ColumnStackStrech } from "../../Styles/Theme";

interface TaskViewModalProps {
  task: Task;
}
const AddTaskAnswerDialog = ({ task }: TaskViewModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState<number | null>(null);

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
      <ListItemButton onClick={handleClickOpen}>Submit</ListItemButton>

      <Dialog open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSave}
          autoComplete="off"
          sx={{
            "& .MuiTextField-root": { width: "50ch" },
          }}
        >
          <DialogTitle>Submit your answer</DialogTitle>
          <DialogContentText sx={{ ml: 3 }}>
            Once you submit your task you will not be able to edit it
          </DialogContentText>
          <DialogContent>
            <Box component="form" onSubmit={handleSave}>
              <ColumnStackStrech spacing={2}>
                <TextField label="Comment" required></TextField>
                <TextField label="Answer URL" type="url"></TextField>
              </ColumnStackStrech>
              <Button variant="text" component="label" sx={{ my: 2 }}>
                <FileUploadIcon>
                  <input
                    type="file"
                    hidden
                    accept=".pdf"
                    /*  onChange={handleFileUpload} */
                  />
                </FileUploadIcon>{" "}
                Upload file
              </Button>
              <ColumnStackStrech>
                <Button type="submit" variant="contained">
                  Save answer
                </Button>
              </ColumnStackStrech>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
};

export default AddTaskAnswerDialog;
