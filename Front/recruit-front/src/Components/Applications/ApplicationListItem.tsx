import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RowStackLeft, useStyles } from "../../Styles/Theme";
import GetStateLabel from "../../Helpers/ApplicationStateToText";

const ApplicationListItem = (props: any) => {
  const navigate = useNavigate();

  const handleMoreDetails = () => {
    return navigate(`/candidateApplication/${props.id}`);
  };
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start" className={classes.listItemWithHover}>
      <ListItemText
        disableTypography
        primary={
          <Typography sx={{ mb: 2 }} variant="h5" color="text.primary">
            {props.positionName}
          </Typography>
        }
        secondary={
          <React.Fragment>
            <Typography variant="subtitle1" color="text.primary">
              {props.fullName}
            </Typography>

            <RowStackLeft>
              <Typography variant="subtitle1" sx={{ mr: 1 }}>
                Current stage:
              </Typography>
              <Typography variant="subtitle2">
                {GetStateLabel(props.stage)}
              </Typography>
            </RowStackLeft>
          </React.Fragment>
        }
      />
      <div>
        <ListItemButton onClick={handleMoreDetails}>
          More details
        </ListItemButton>
      </div>
    </ListItem>
  );
};

export default ApplicationListItem;
