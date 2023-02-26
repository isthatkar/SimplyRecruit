import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Chip } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

type Props = {
  value: number;
};

const MeetingStateChip = ({ value }: Props) => {
  if (!value) {
    return (
      <Chip icon={<HourglassBottomIcon />} label="Scheduling in progress" />
    );
  }
  return (
    <Chip
      icon={<CheckCircleOutlineIcon />}
      label="Scheduled"
      color="success"
      variant="outlined"
    />
  );
};

export default MeetingStateChip;
