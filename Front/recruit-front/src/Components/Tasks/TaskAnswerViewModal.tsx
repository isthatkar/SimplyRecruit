import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import { ListItemButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { TaskAnswer } from "../../Types/types";
import { useCallback, useEffect } from "react";
import axios from "axios";

interface TaskAnswerViewModalProps {
  taskId: number;
}
const TaskAnswerViewModal = ({ taskId }: TaskAnswerViewModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [answer, setAnswer] = React.useState<TaskAnswer>();

  const handleClickOpen = () => {
    console.log(answer);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAnswer = useCallback(async () => {
    const response = await axios.get(`tasks/${taskId}/answer`);
    const fetchedAnswer = response.data;
    setAnswer(fetchedAnswer);
  }, []);

  useEffect(() => {
    getAnswer();
  }, []);

  const downloadFile = async () => {
    axios({
      url: `tasks/${taskId}/answer/download`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const fileName = `task_answer.pdf`;
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
    <div>
      <ListItemButton onClick={handleClickOpen}>View answer</ListItemButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submited task answer</DialogTitle>
        <DialogContent>
          <DialogContentText>{answer?.comment}</DialogContentText>
          {answer?.url ? (
            <DialogContentText sx={{ my: 4 }}>
              View the task answer here:{" "}
              <a href={answer?.url} target="_blank" rel="noopener noreferrer">
                {answer.url}
              </a>
            </DialogContentText>
          ) : (
            ""
          )}
          {answer?.fileName ? (
            <Button onClick={handleDownloadClick}>
              <DownloadIcon></DownloadIcon>
              Download answer
            </Button>
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskAnswerViewModal;
