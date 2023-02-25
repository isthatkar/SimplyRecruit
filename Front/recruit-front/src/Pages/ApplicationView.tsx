import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Select,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";

import TaskIcon from "@mui/icons-material/Task";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EditIcon from "@mui/icons-material/Edit";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Theme from "../Styles/Theme";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Application, Stage } from "../Types/types";
import ApplicationMeetings from "../Components/Meetings/ApplicationMeetings";
import ReviewsTab from "../Components/Reviews/ReviewsTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ApplicationView = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState<Application>();
  const getApplication = useCallback(async () => {
    const response = await axios.get(`applications/${applicationId}`);
    const applications = response.data;
    setApplication(applications);
  }, []);

  useEffect(() => {
    getApplication();
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          pb: 6,
          width: 1,
        }}
      >
        <Container sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab icon={<InfoIcon />} label="Overview" sx={{ flexGrow: 1 }} />
            <Tab
              icon={<MeetingRoomIcon />}
              label="Meetings"
              sx={{ flexGrow: 1 }}
            />
            <Tab icon={<ReviewsIcon />} label="Reviews" sx={{ flexGrow: 1 }} />

            <Tab icon={<TaskIcon />} label="Tasks" sx={{ flexGrow: 1 }} />
          </Tabs>
        </Container>
      </Box>
      <TabPanel value={value} index={0}>
        <Card>
          <Typography align="center" variant="h4" sx={{ mt: 6 }}>
            {application?.positionName}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="stretch"
            spacing={{ xs: 2, sm: 2, md: 4 }}
            sx={{ flexWrap: "wrap", my: 6 }}
          >
            <Grid alignItems="center">
              <Typography variant="subtitle2">Full name</Typography>
              <Typography variant="body1">{application?.fullName}</Typography>
            </Grid>

            <Grid
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="subtitle2">Contact email</Typography>
              <Typography variant="body1">
                {application?.contactEmail}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2">Phone number</Typography>
              <Typography variant="body1">
                {application?.phoneNumber}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="subtitle2">Profile URL</Typography>
              <Typography variant="body1">
                {application?.profileUrl ? application?.profileUrl : "-"}
              </Typography>
            </Grid>
          </Stack>

          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 8 }}
          >
            <Typography variant="h5">Cover letter</Typography>
            <Typography>{application?.coverLetter}</Typography>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
            sx={{ mb: 8 }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="h5">Current stage:</Typography>
              <Typography variant="h6">
                {application ? Object.values(Stage)[application.stage] : ""}
              </Typography>
              <IconButton color="secondary" aria-label="add an alarm">
                <EditIcon />
              </IconButton>
            </Stack>
            <Button>
              <DownloadIcon></DownloadIcon>
              Download resume
            </Button>
          </Grid>
        </Card>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ApplicationMeetings></ApplicationMeetings>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ReviewsTab></ReviewsTab>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </ThemeProvider>
  );
};

export default ApplicationView;
