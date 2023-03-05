import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Chip } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { Meeting } from "../../Types/types";

type Props = {
  meeting: Meeting;
};

const MeetingStateChip = ({ meeting }: Props) => {
  if (meeting.isCanceled) {
    return <Chip icon={<EventBusyIcon />} color="warning" label="Canceled" />;
  }
  if (meeting.isFinalTime) {
    return (
      <Chip
        icon={<CheckCircleOutlineIcon />}
        label="Scheduled"
        color="success"
        variant="outlined"
      />
    );
  }

  return <Chip icon={<HourglassBottomIcon />} label="Scheduling in progress" />;
};

export default MeetingStateChip;
