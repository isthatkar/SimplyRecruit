import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import RatingIcon from "./RatingIcon";

const ReviewListItem = (props: any) => {
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
      <ListItemAvatar>
        <RatingIcon value={props.rating} selected={false} />
      </ListItemAvatar>
      <ListItemText primary={props.comment} secondary={props.email} />
    </ListItem>
  );
};

export default ReviewListItem;
