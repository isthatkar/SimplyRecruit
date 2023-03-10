import {
  Box,
  Container,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ApplicationListItem from "../Components/Applications/ApplicationListItem";
import { Application } from "../Types/types";

const UserApplications = () => {
  const [allApplications, setAllApplications] = useState<Application[]>([]);
  const getUserApplications = useCallback(async () => {
    const response = await axios.get("applications/currentUser");
    console.log(response.data);
    const applications = response.data;
    setAllApplications(applications);
  }, []);

  useEffect(() => {
    getUserApplications();
  }, []);
  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            All my applications
          </Typography>
        </Container>
      </Box>
      <Container>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ mb: 8 }}
        >
          {allApplications.map((application) => (
            <ApplicationListItem
              key={application.id}
              email={application.contactEmail}
              id={application.id}
              stage={application.stage}
              positionName={application.positionName}
            ></ApplicationListItem>
          ))}
        </Stack>
      </Container>
    </div>
  );
};

export default UserApplications;
