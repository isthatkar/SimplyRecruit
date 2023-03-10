import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Chip } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { Meeting } from "../../Types/types";
import DoneIcon from "@mui/icons-material/Done";

type Props = {
  meeting: Meeting;
};

const MeetingStateChip = ({ meeting }: Props) => {
  const hasMeetingPassed = () => {
    const startDateTimeString = meeting.finalTime;
    const startDateTime = new Date(startDateTimeString);

    const hasEventPassed = startDateTime < new Date();

    return hasEventPassed;
  };

  const hasPassed = hasMeetingPassed();
  if (meeting.isCanceled) {
    return (
      <Chip icon={<EventBusyIcon />} variant="outlined" label="Canceled" />
    );
  }
  if (meeting.isFinalTime) {
    if (hasMeetingPassed()) {
      return <Chip icon={<DoneIcon />} label="Completed" variant="outlined" />;
    }
    return (
      <Chip
        icon={<CheckCircleOutlineIcon />}
        label="Scheduled"
        color="success"
        variant="outlined"
      />
    );
  }

  return (
    <Chip
      icon={<HourglassBottomIcon />}
      variant="outlined"
      color="warning"
      label="Scheduling in progress"
    />
  );
};

export default MeetingStateChip;
