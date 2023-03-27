import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  ListItemButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Task } from "../../Types/types";
import { ColumnStackStrech } from "../../Styles/Theme";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface TaskViewModalProps {
  task: Task;
}
const AddTaskAnswerDialog = ({ task }: TaskViewModalProps) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [answerUrl, setAnswerUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    addTaskAnswer();
    setOpen(false);
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

  const addTaskAnswer = async (): Promise<void> => {
    const formData = new FormData();
    if (selectedFile !== null && filename !== "") {
      formData.append("file", selectedFile);
      formData.append("createTaskAnswerDto.FileName", filename);
    }
    formData.append("createTaskAnswerDto.Commment", comment);
    if (answerUrl !== "") {
      formData.append("createTaskAnswerDto.Url", answerUrl);
    }

    const headers = { "Content-Type": "multipart/form-data" };

    const response = await axios.post(`tasks/${task.id}/answer`, formData, {
      headers,
    });

    console.log(response);
    if (response?.status === 201) {
      toast.success("Added task!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      //onAddObject();
    } else {
      toast.error("Failed to add task!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  React.useEffect(() => {
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
          <DialogContentText sx={{ mx: 3 }}>
            Once you submit your task you will not be able to edit or delete it
          </DialogContentText>
          <DialogContent>
            <Box>
              <ColumnStackStrech spacing={2}>
                <TextField
                  label="Comment"
                  required
                  multiline
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></TextField>
                <TextField
                  label="Answer URL"
                  type="url"
                  value={answerUrl}
                  onChange={(e) => setAnswerUrl(e.target.value)}
                ></TextField>
              </ColumnStackStrech>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="baseline"
                spacing={1}
                sx={{ mt: 1 }}
              >
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: 1, mb: 2 }}
                >
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
