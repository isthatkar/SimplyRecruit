import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Chip } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import TimerOffIcon from "@mui/icons-material/TimerOff";

type Props = {
  value: number;
};

const TaskStateChip = ({ value }: Props) => {
  if (value >= 0 && value <= 2) {
    switch (value) {
      case 0:
        return <Chip icon={<HourglassBottomIcon />} label="Waiting..." />;
      case 1:
        return (
          <Chip
            icon={<CheckCircleOutlineIcon />}
            label="Completed!"
            color="success"
            variant="outlined"
          />
        );
      case 2:
        return (
          <Chip
            icon={<TimerOffIcon />}
            label="Deadline passed"
            color="error"
            variant="outlined"
          />
        );
    }
  }
  return <Chip icon={<QuestionMarkIcon />} label="Unknown" />;
};

export default TaskStateChip;
