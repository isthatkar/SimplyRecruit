import { ListItem, ListItemText, Stack, Typography } from "@mui/material";
import React from "react";
import { GetFormatedDate } from "../../Helpers/DateHelper";
import { useStyles } from "../../Styles/Theme";
import { Task } from "../../Types/types";
import AddTaskAnswerDialog from "./AddTaskAnswerDialog";
import TaskStateChip, { hasDeadlinePassed } from "./TaskStateChip";
import TaskViewModal from "./TaskViewModal";

interface taskListItemProps {
  task: Task;
  applicationId: number;
}

const CandidateTaskListItem = ({ task, applicationId }: taskListItemProps) => {
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
              <TaskStateChip task={task}></TaskStateChip>
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
              Due till {GetFormatedDate(task.deadline)}
            </Typography>
          </React.Fragment>
        }
      />
      <div>
        {task.answerSubmited === false ? (
          <div>
            <TaskViewModal
              task={task}
              applicationId={applicationId}
            ></TaskViewModal>
            <>
              {hasDeadlinePassed(task.deadline) ? (
                ""
              ) : (
                <AddTaskAnswerDialog task={task}></AddTaskAnswerDialog>
              )}
            </>
          </div>
        ) : (
          ""
        )}
      </div>{" "}
    </ListItem>
  );
};

export default CandidateTaskListItem;
