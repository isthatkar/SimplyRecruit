import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../Styles/Theme";
import { NordProduct } from "../../Types/types";
import EditProjectDialog from "./EditProjectDialog";

const ProjectListItem = (props: any) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isEmployee, setIsEmployee] = useState(false);

  const openProjectPage = () => {
    return navigate(`/projects/${props.project.id}`);
  };

  useEffect(() => {
    const roles = localStorage.getItem("roles");
    const isEmployee = roles?.includes("Employee");
    setIsEmployee(isEmployee ? isEmployee : false);
  }, []);

  return (
    <ListItem alignItems="flex-start" className={classes.listItemWithHover}>
      <ListItemText
        disableTypography
        primary={
          <Typography sx={{ mb: 2 }} variant="h5" color="text.primary">
            {NordProduct[props.project.product as number]} {props.project.name}
          </Typography>
        }
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              variant="subtitle1"
              color="text.primary"
            >
              {props.project.description}
            </Typography>
            <Typography
              sx={{ mx: 4, display: "inline" }}
              variant="subtitle1"
              color="text.primary"
            ></Typography>
          </React.Fragment>
        }
      />
      <div>
        <ListItemButton onClick={openProjectPage}>More details</ListItemButton>
      </div>
      <div>
        {isEmployee ? (
          <EditProjectDialog
            projectId={props.project.id}
            email={props.project.responsiblePersonEmail}
          ></EditProjectDialog>
        ) : (
          ""
        )}
      </div>
    </ListItem>
  );
};

export default ProjectListItem;
