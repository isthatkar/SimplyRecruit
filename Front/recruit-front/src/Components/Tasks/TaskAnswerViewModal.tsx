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

interface TaskAnswerViewModalProps {
  taskId: number;
}
const TaskAnswerViewModal = ({ taskId }: TaskAnswerViewModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [answer, setAnswer] = React.useState<TaskAnswer>({
    id: 5,
    comment: "this is task comment",
    fileName: "file",
    url: "https://google.com",
    fileData: undefined,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <Button>
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
