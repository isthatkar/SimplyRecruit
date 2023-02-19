import { ListItem, ListItemText, Typography } from "@mui/material";
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
            <Typography
              sx={{ display: "inline" }}
              variant="subtitle1"
              color="text.primary"
            >
              Stage of application: {Object.values(Stage)[props.stage]}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default ApplicationListItem;
