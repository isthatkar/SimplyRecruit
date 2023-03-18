import {
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { ColumnStackStrech, useStyles } from "../../Styles/Theme";
import { Rating } from "../../Types/types";
import RatingIcon from "./RatingIcon";
interface RatingProps {
  rating: Rating;
}
const ReviewListItem = ({ rating }: RatingProps) => {
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start" className={classes.listItemWithHover}>
      <ColumnStackStrech sx={{ width: "100%" }} spacing={2}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={5}
          alignItems="flex-start"
        >
          <Stack alignItems="center">
            <RatingIcon value={rating.communicationRating} selected={false} />
            <Typography variant="body2">Comms</Typography>
          </Stack>
          <Stack alignItems="center">
            <RatingIcon value={rating.skillsRatings} selected={false} />
            <Typography variant="body2">Skills</Typography>
          </Stack>
          <Stack alignItems="center">
            <RatingIcon value={rating.attitudeRating} selected={false} />
            <Typography variant="body2">Attitude</Typography>
          </Stack>
          <ListItemText primary={rating.comment} secondary={rating.userEmail} />
        </Stack>
      </ColumnStackStrech>
      <div>
        <ListItemButton>Edit</ListItemButton>
        <ListItemButton>Delete</ListItemButton>
      </div>
    </ListItem>
  );
};

export default ReviewListItem;
