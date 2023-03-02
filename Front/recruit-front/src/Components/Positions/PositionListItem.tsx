import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../Styles/Theme";

const PositionListItem = (props: any) => {
  const classes = useStyles();
  const navigate = useNavigate();

  function openPositionPage() {
    console.log(props.id);
    return navigate(`/positions/${props.id}`);
  }

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
            <Typography
              sx={{ display: "inline" }}
              variant="subtitle1"
              color="text.primary"
            >
              {props.location}
            </Typography>
            <Typography
              sx={{ mx: 4, display: "inline" }}
              variant="subtitle1"
              color="text.primary"
            >
              {props.time}
            </Typography>
          </React.Fragment>
        }
      />
      <div>
        <ListItemButton onClick={openPositionPage}>More details</ListItemButton>
      </div>
    </ListItem>
  );
};

export default PositionListItem;
