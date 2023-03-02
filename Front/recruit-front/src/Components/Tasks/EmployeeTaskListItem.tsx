import {
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useStyles } from "../../Styles/Theme";
import TaskStateChip from "./TaskStateChip";

const EmployeeTasksTab = (props: any) => {
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
                {props.title}
              </Typography>
              <TaskStateChip value={props.state}></TaskStateChip>
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
              {props.description}
            </Typography>
            <Typography
              sx={{ mx: 4, display: "inline" }}
              variant="subtitle1"
              color="text.primary"
            >
              {props.deadline}
            </Typography>
          </React.Fragment>
        }
      />
      <div>
        <ListItemButton>More details</ListItemButton>
      </div>{" "}
    </ListItem>
  );
};

export default EmployeeTasksTab;
