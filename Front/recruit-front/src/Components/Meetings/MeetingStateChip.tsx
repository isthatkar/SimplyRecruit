import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Chip } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

type Props = {
  value: boolean;
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
