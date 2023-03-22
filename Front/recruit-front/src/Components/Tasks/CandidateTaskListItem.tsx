import { ListItem, ListItemText, Stack, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "../../Styles/Theme";
import { Task, TaskStatus } from "../../Types/types";
import AddTaskAnswerDialog from "./AddTaskAnswerDialog";
import TaskStateChip from "./TaskStateChip";
import TaskViewModal from "./TaskViewModal";

interface taskListItemProps {
  task: Task;
}
const CandidateTaskListItem = ({ task }: taskListItemProps) => {
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start" className={classes.listItemWithHover}>
      <ListItemText
        disableTypography
        primary={
          <React.Fragment>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Typography sx={{ mb: 2 }} variant="h5" color="text.primary">
                {task.title}
              </Typography>
              <TaskStateChip value={task.state}></TaskStateChip>
            </Stack>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              variant="subtitle1"
              color="text.primary"
            >
              Due till {task.deadline.toDateString()}
            </Typography>
          </React.Fragment>
        }
      />
      <div>
        {task.state === TaskStatus.Assigned ? (
          <div>
            <TaskViewModal task={task}></TaskViewModal>
            <AddTaskAnswerDialog task={task}></AddTaskAnswerDialog>
          </div>
        ) : (
          ""
        )}
      </div>{" "}
    </ListItem>
  );
};

export default CandidateTaskListItem;
