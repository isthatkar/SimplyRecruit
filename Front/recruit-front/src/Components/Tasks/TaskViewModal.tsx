import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import { ListItemButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { Task } from "../../Types/types";
import axios from "axios";

interface TaskViewModalProps {
  task: Task;
  applicationId: number;
}
const TaskViewModal = ({ task, applicationId }: TaskViewModalProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadFile = async () => {
    axios({
      url: `applications/${applicationId}/tasks/download/${task.id}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const fileName = `task_${task.title}.pdf`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleDownloadClick = () => {
    downloadFile();
  };

  return (
    <>
      <ListItemButton onClick={handleClickOpen}>View task</ListItemButton>
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
            <Button sx={{ mt: 2 }} onClick={handleDownloadClick}>
              <DownloadIcon></DownloadIcon>
              Download task
            </Button>
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskViewModal;
