import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box/Box";
import { ChangeEvent, useState } from "react";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

interface AddTaskProps {
  applicationId: number;
  onAddObject: () => void;
}

const AddTaskDialog = ({ applicationId, onAddObject }: AddTaskProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [taskUrl, setTaskUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filename, setFilename] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    await addTask();
    setOpen(false);
  };

  const addTask = async (): Promise<void> => {
    const formData = new FormData();
    if (selectedFile !== null && filename !== "") {
      formData.append("file", selectedFile);
      formData.append("createTaskDto.FileName", filename);
    }
    formData.append("createTaskDto.Title", title);
    formData.append("createTaskDto.Goal", goal);
    formData.append("createTaskDto.Deadline", deadline);
    if (taskUrl !== "") {
      formData.append("createTaskDto.Url", taskUrl);
    }

    const headers = { "Content-Type": "multipart/form-data" };

    const response = await axios.post(
      `applications/${applicationId}/tasks`,
      formData,
      { headers }
    );

    if (response?.status === 201) {
      toast.success("Added task!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      onAddObject();
    } else {
      toast.error("Failed to add task!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);
    setSelectedFile(file);
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
            <TextField
              required
              id="outlined-title-input"
              label="Title"
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              required
              id="outlined-title-input"
              label="Goal"
              type="text"
              value={goal}
              multiline
              rows={2}
              onChange={(e) => setGoal(e.target.value)}
            />
            <TextField
              name="deadline"
              label="Deadline"
              type="datetime-local"
              variant="outlined"
              fullWidth
              value={deadline}
              required
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <TextField
              id="outlined-title-input"
              value={taskUrl}
              label="Task link"
              type="url"
              onChange={(e) => setTaskUrl(e.target.value)}
            />
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="baseline"
              spacing={1}
              sx={{ mt: 1 }}
            >
              <Button variant="outlined" component="label" sx={{ ml: 1 }}>
                Upload task file
                <input
                  type="file"
                  hidden
                  accept=".pdf"
                  onChange={handleFileUpload}
                />
              </Button>
              <Typography sx={{ ml: 3 }}>{filename}</Typography>
            </Stack>
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
