import { Box } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Application, Resume } from "../../Types/types";
import CandidateTasks from "../Tasks/CandidateTasks";
import ApplicationCard from "./ApplicationCard";

const CandidateApplicationView = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState<Application>();
  const [resume, setResume] = useState<Resume>();

  const getApplication = useCallback(async () => {
    const response = await axios.get(`applications/${applicationId}`);
    const applications = response.data;
    setApplication(applications);
    await getResume();
  }, []);

  const getResume = useCallback(async () => {
    try {
      const response = await axios.get(`applications/${applicationId}/resume`);

      if (response.status === 200) {
        const fetchedResume = response.data;
        setResume(fetchedResume);
      } else {
        console.error("Error downloading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }, []);

  useEffect(() => {
    getApplication();
  }, []);

  return (
    <Box
      sx={{
        py: 6,
        px: 6,
        width: 1,
      }}
    >
      <ApplicationCard
        application={application}
        resume={resume}
      ></ApplicationCard>
      <CandidateTasks positionName={application?.positionName}></CandidateTasks>
    </Box>
  );
};

export default CandidateApplicationView;
