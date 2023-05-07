import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Application, Resume } from "../Types/types";
import ApplicationMeetings from "../Components/Meetings/ApplicationMeetings";
import ReviewsTab from "../Components/Reviews/ReviewsTab";
import EmployeeTasksTab from "../Components/Tasks/EmployeeTasksTab";
import ApplicationCard from "../Components/Applications/ApplicationCard";
import Loader from "../Components/Loading/Loader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  const [isLoading, setIsLoading] = useState(false);
  const { applicationId } = useParams();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application>();
  const [resume, setResume] = useState<Resume>();

  const getApplication = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get(`applications/${applicationId}`);
    const applications = response.data;
    setIsLoading(false);
    setApplication(applications);
  }, []);

  const getResume = useCallback(async () => {
    try {
      const response = await axios.get(`applications/${applicationId}/resume`);

      if (response.status === 200) {
        const resume = response.data;
        setResume(resume);
      }
    } catch (error) {
      console.log("Error fetching file:", error);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialTab = urlParams.get("tab");

    if (initialTab !== null) {
      setValue(parseInt(initialTab));
    }
    getApplication();
    getResume();
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(`/application/${applicationId}?tab=${newValue}`);
  };

  const handleBackClick = () => {
    navigate(`/positions/${application?.positionId}/applications`);
  };

  return (
    <div>
      <Box
        sx={{
          pb: 4,
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
        <Button sx={{ ml: 3, mb: -4 }} onClick={handleBackClick}>
          <ArrowBackIcon></ArrowBackIcon>
          Go to project
        </Button>
      </Box>

      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          {application ? (
            <>
              <TabPanel value={value} index={0}>
                <ApplicationCard
                  application={application}
                  resume={resume}
                ></ApplicationCard>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ApplicationMeetings
                  candidateEmail={application?.contactEmail}
                ></ApplicationMeetings>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ReviewsTab applicationId={application?.id}></ReviewsTab>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <EmployeeTasksTab
                  applicationId={application.id}
                ></EmployeeTasksTab>
              </TabPanel>
            </>
          ) : (
            "Something went wrong"
          )}
        </>
      )}
    </div>
  );
};

export default ApplicationView;
