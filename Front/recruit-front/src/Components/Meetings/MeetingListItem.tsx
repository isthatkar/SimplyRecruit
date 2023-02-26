import {
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MeetingStateChip from "./MeetingStateChip";

const MeetingListItem = (props: any) => {
  const navigate = useNavigate();

  const HandleMoreDetails = () => {
    navigate(`/meetings/${props.id}`);
  };
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        width: "100%",
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "#e0e2f2",
        },
      }}
    >
      <ListItemText
        disableTypography
        primary={
          <React.Fragment>
            <Stack direction="row" spacing={2}>
              <Typography sx={{ mb: 2 }} variant="h5" color="text.primary">
                {props.title}
              </Typography>
              <MeetingStateChip value={props.final}></MeetingStateChip>
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
              {props.time}
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
