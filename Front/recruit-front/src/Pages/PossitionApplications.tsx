import {
  Box,
  Container,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApplicationListItem from "../Components/Applications/ApplicationListItem";
import Theme from "../Styles/Theme";
import { Application } from "../Types/types";

const PositionApplications = () => {
  const [allApplications, setAllApplications] = useState<Application[]>([]);
  const { positionId } = useParams();

  const getPositionApplications = useCallback(async () => {
    const response = await axios.get(`positions/${positionId}/applications`);
    console.log(response.data);
    const applications = response.data;
    setAllApplications(applications);
  }, []);

  useEffect(() => {
    getPositionApplications();
  }, []);
  return (
    <ThemeProvider theme={Theme}>
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
            Applications
          </Typography>
        </Container>
      </Box>
      <Container>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {allApplications.map((application) => (
            <ApplicationListItem
              key={application.id}
              email={application.contactEmail}
              stage={application.stage}
              fullName={application.fullName}
              positionName={application.positionName}
            ></ApplicationListItem>
          ))}
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default PositionApplications;
