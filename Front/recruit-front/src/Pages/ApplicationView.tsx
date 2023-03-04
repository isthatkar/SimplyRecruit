import {
  Box,
  Container,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";

import TaskIcon from "@mui/icons-material/Task";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Theme } from "../Styles/Theme";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Application, Resume } from "../Types/types";
import ApplicationMeetings from "../Components/Meetings/ApplicationMeetings";
import ReviewsTab from "../Components/Reviews/ReviewsTab";
import EmployeeTasksTab from "../Components/Tasks/EmployeeTasksTab";
import ApplicationCard from "../Components/Applications/ApplicationCard";

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
  const [value, setValue] = React.useState(0);
  const [application, setApplication] = useState<Application>();
  const [resume, setResume] = useState<Resume>();

  const getApplication = useCallback(async () => {
    const response = await axios.get(`applications/${applicationId}`);
    const applications = response.data;
    setApplication(applications);
  }, []);

  const getResume = useCallback(async () => {
    try {
      const response = await axios.get(`applications/${applicationId}/resume`);

      if (response.status === 200) {
        const resume = response.data;
        setResume(resume);
      } else {
        console.error("Error downloading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }, []);

  useEffect(() => {
    getApplication();
    getResume();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
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
        <ApplicationCard
          application={application}
          resume={resume}
        ></ApplicationCard>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ApplicationMeetings></ApplicationMeetings>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ReviewsTab></ReviewsTab>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <EmployeeTasksTab></EmployeeTasksTab>
      </TabPanel>
    </div>
  );
};

export default ApplicationView;
