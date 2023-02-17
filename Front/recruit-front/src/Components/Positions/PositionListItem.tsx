import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const PositionListItem = (props: any) => {
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
        <ListItemButton>More details</ListItemButton>
      </div>
    </ListItem>
  );
};

export default PositionListItem;
