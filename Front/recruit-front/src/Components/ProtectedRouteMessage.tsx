import { Typography } from "@mui/material";
import React from "react";
import { CenteredContainer } from "../Styles/Theme";

const ProtectedRouteMessage = (props: any) => {
  return (
    <div>
      <CenteredContainer sx={{ mt: 8 }}>
        <Typography variant="h5" color="text.primary" sx={{ mb: 4 }}>
          You do not have the correct rights to access this path.
        </Typography>
      </CenteredContainer>
    </div>
  );
};

export default ProtectedRouteMessage;
