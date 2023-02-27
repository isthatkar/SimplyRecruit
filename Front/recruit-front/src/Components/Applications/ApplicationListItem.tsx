import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Stage } from "../../Types/types";

const ApplicationListItem = (props: any) => {
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
            <Typography variant="subtitle1" color="text.primary">
              {props.fullName}
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              Stage of application: {Object.values(Stage)[props.stage]}
            </Typography>
          </React.Fragment>
        }
      />
      <div>
        {" "}
        <ListItemButton>More details</ListItemButton>
      </div>
    </ListItem>
  );
};

export default ApplicationListItem;
