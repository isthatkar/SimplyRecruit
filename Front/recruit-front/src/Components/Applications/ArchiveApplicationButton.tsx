import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface archiveProps {
  applicationId: number;
  positionId: number;
}
const ArchiveApplicationButton = ({
  applicationId,
  positionId,
}: archiveProps) => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const applicationDto = {
      isArchived: true,
    };

    const response = await axios.put(
      `applications/${applicationId}`,
      applicationDto
    );
    setOpen(false);

    if (response.status !== 200) {
      return toast.error("Failed to archive application!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    navigate(`/positions/${positionId}/applications`);
  };

  return (
    <div>
      <Tooltip title="Archive application">
        <IconButton size="medium" onClick={handleClickOpen}>
          <PersonOffIcon></PersonOffIcon>
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Do you really want to archive this application? This cannot be undone.
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ArchiveApplicationButton;
