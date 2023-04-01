import { Button, Card, Grid, Stack, Tooltip, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import React from "react";
import { Application, Resume } from "../../Types/types";
import GetStateLabel from "../../Helpers/ApplicationStateToText";
import ArchiveApplicationButton from "./ArchiveApplicationButton";
import RadarChart from "../Reviews/RatingChart";
import StarRating from "../Reviews/StartRatingComponent";
import { ColumnStackCenter } from "../../Styles/Theme";
import axios from "axios";

interface CardProps {
  application: Application | undefined;
  resume: Resume | undefined;
}

const ApplicationCard = ({ resume, application }: CardProps) => {
  const roles = localStorage.getItem("roles");
  const isEmployee = roles ? roles.includes("Employee") : false;
  const downloadFile = async () => {
    if (resume && application) {
      axios({
        url: `applications/${application.id}/download`,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });
        const fileName = `resume_${application.fullName}.pdf`;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
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
        sx={{ mb: 4 }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {application && isEmployee ? (
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
      <Grid>
        {application && isEmployee ? (
          <ColumnStackCenter spacing={3}>
            <Tooltip title="Average rating = 50% skills + 25% communication + 25% attitude">
              <StarRating value={application.averageRating}></StarRating>
            </Tooltip>
            <Grid sx={{ height: "500px", width: "500px" }}>
              <RadarChart
                points={[
                  application.averageCommsRating,
                  application.averageSkillRating,
                  application.averageAttitudeRating,
                ]}
              ></RadarChart>
            </Grid>
          </ColumnStackCenter>
        ) : (
          ""
        )}
      </Grid>
    </Card>
  );
};

export default ApplicationCard;
