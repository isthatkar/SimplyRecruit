import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";
import { Application, Resume } from "../../Types/types";
import GetStateLabel from "../../Helpers/ApplicationStateToText";
import ArchiveApplicationButton from "./ArchiveApplicationButton";
import RadarChart from "../Reviews/RatingChart";

interface CardProps {
  application: Application | undefined;
  resume: Resume | undefined;
}

const ApplicationCard = ({ resume, application }: CardProps) => {
  const roles = localStorage.getItem("roles");
  const isEmployee = roles ? roles.includes("Employee") : false;
  const downloadFile = () => {
    if (resume) {
      const filename = resume.fileName;
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(
        new Blob([resume.file], { type: "application/octet-stream" })
      );
      downloadLink.download = filename;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);

      downloadLink.click();

      document.body.removeChild(downloadLink);
    }
  };

  const handleDownloadClick = () => {
    downloadFile();
  };
  return (
    <Card>
      <Typography align="center" variant="h4" sx={{ mt: 2 }}>
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

        <Grid direction="column" justifyContent="center" alignItems="center">
          <Typography variant="subtitle2">Contact email</Typography>
          <Typography variant="body1">{application?.contactEmail}</Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle2">Phone number</Typography>
          <Typography variant="body1">{application?.phoneNumber}</Typography>
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
      >
        <Typography variant="h5">Cover letter</Typography>
        <Typography>
          {application?.coverLetter ? application?.coverLetter : "-"}
        </Typography>
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
          {application ? (
            <ArchiveApplicationButton
              applicationId={application.id}
              positionId={application.positionId}
            ></ArchiveApplicationButton>
          ) : (
            ""
          )}

          <Typography variant="h5">Current stage:</Typography>
          <Typography variant="h6">
            {application ? GetStateLabel(application.stage) : ""}
          </Typography>
        </Stack>
        <Button disabled={!resume} onClick={handleDownloadClick}>
          <DownloadIcon></DownloadIcon>
          Download resume
        </Button>
      </Grid>
      <Grid container justifyContent="center" sx={{ height: "500px" }}>
        {application && isEmployee ? (
          <RadarChart
            points={[
              application.averageCommsRating,
              application.averageSkillRating,
              application.averageAttitudeRating,
            ]}
          ></RadarChart>
        ) : (
          ""
        )}
      </Grid>
    </Card>
  );
};

export default ApplicationCard;
