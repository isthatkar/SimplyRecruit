import {
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../../Styles/Theme";
import MeetingStateChip from "./MeetingStateChip";

const MeetingListItem = (props: any) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const HandleMoreDetails = () => {
    navigate(`/meetings/${props.meet.id}`);
  };
  return (
    <ListItem alignItems="flex-start" className={classes.listItemWithHover}>
      <ListItemText
        disableTypography
        primary={
          <React.Fragment>
            <Stack direction="row" spacing={2}>
              <Typography sx={{ mb: 2 }} variant="h5" color="text.primary">
                {props.meet.title}
              </Typography>
              <MeetingStateChip
                value={props.meet.isFinalTime}
              ></MeetingStateChip>
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
              {props.meet.description}
            </Typography>
            <Typography
              sx={{ mx: 4, display: "inline" }}
              variant="subtitle1"
              color="text.primary"
            >
              {props.meet.time}
            </Typography>
          </React.Fragment>
        }
      />
      <div>
        <ListItemButton onClick={HandleMoreDetails}>
          More details
        </ListItemButton>
      </div>{" "}
    </ListItem>
  );
};

export default MeetingListItem;
