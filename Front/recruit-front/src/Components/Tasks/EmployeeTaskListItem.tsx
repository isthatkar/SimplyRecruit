import { ListItem, ListItemText, Stack, Typography } from "@mui/material";
import React from "react";
import GetFormatedDate from "../../Helpers/DateFormater";
import { useStyles } from "../../Styles/Theme";
import { Task, TaskStatus } from "../../Types/types";
import TaskAnswerViewModal from "./TaskAnswerViewModal";
import TaskStateChip from "./TaskStateChip";
import TaskViewModal from "./TaskViewModal";

interface TaskListItemProps {
  task: Task;
}

const EmployeeTaskListItem = ({ task }: TaskListItemProps) => {
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
              {GetFormatedDate(task.deadline)}
            </Typography>
            <Typography
              sx={{ mx: 4, display: "inline" }}
              variant="subtitle1"
              color="text.primary"
            >
              {task.goal}
            </Typography>
          </React.Fragment>
        }
      />
      <div>
        <TaskViewModal task={task}></TaskViewModal>
        {task.state === TaskStatus.Completed ? (
          <TaskAnswerViewModal taskId={task.id}></TaskAnswerViewModal>
        ) : (
          ""
        )}
      </div>{" "}
    </ListItem>
  );
};

export default EmployeeTaskListItem;
