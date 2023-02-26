import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Chip } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

type Props = {
  value: number;
};

const TaskStateChip = ({ value }: Props) => {
  if (value >= 0 && value <= 1) {
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
    }
  }
  return <Chip icon={<QuestionMarkIcon />} label="Unknown" />; // or a default icon
};

export default TaskStateChip;
