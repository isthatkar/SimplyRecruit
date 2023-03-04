import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ListItemButton, ThemeProvider } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { Task } from "../../Types/types";

interface TaskViewModalProps {
  task: Task;
}
const TaskViewModal = ({ task }: TaskViewModalProps) => {
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

      <ListItemButton onClick={handleClickOpen}>View</ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{task.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{task.goal}</DialogContentText>
          {task.url ? (
            <DialogContentText sx={{ my: 4 }}>
              View the full task here:{" "}
              <a href={task.url} target="_blank" rel="noopener noreferrer">
                {task.url}
              </a>
            </DialogContentText>
          ) : (
            ""
          )}
          {task.fileName ? (
            <Button>
              <DownloadIcon></DownloadIcon>
              Download task
            </Button>
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskViewModal;
