import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { useStyles } from "../../Styles/Theme";
import RatingIcon from "./RatingIcon";

const ReviewListItem = (props: any) => {
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start" className={classes.listItemWithHover}>
      <ListItemAvatar sx={{ mr: 2 }}>
        <RatingIcon value={props.rating} selected={false} />
      </ListItemAvatar>
      <ListItemText primary={props.comment} secondary={props.email} />
    </ListItem>
  );
};

export default ReviewListItem;
