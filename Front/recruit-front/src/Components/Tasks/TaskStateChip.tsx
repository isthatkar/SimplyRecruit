import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Chip } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import { Task } from "../../Types/types";

type Props = {
  task: Task;
};

export function hasDeadlinePassed(dateString: string): boolean {
  const date = new Date(dateString);
  console.log("date comparison");
  console.log(date.getTime() < Date.now());
  return date.getTime() < Date.now();
}

const TaskStateChip = ({ task }: Props) => {
  console.log(task);
  if (hasDeadlinePassed(task.deadline) && task.answerSubmited === false) {
    return (
      <Chip
        icon={<TimerOffIcon />}
        label="Deadline passed"
        color="error"
        variant="outlined"
      />
    );
  }
  if (task.answerSubmited === false) {
    return <Chip icon={<HourglassBottomIcon />} label="Waiting..." />;
  }
  if (task.answerSubmited === true) {
    return (
      <Chip
        icon={<CheckCircleOutlineIcon />}
        label="Completed!"
        color="success"
        variant="outlined"
      />
    );
  }
  return <Chip></Chip>;
};

export default TaskStateChip;
