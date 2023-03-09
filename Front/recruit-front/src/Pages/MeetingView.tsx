import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Meeting } from "../Types/types";
import React from "react";
import CopyLinkDialog from "../Components/Meetings/CopyLinkDialog";
import AttendeeList from "../Components/Meetings/AttendeesList";
import { Theme } from "../Styles/Theme";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import CancelMeetingDialog from "../Components/Meetings/CancelMeetingDialog";

const MeetingView = () => {
  const [showCopyLinkDialog, setShowCopyLinkDialog] = useState(false);
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState<Meeting>();

  const handleCopyLink = () => {
    setShowCopyLinkDialog(true);
  };

  const handleGoToLink = () => {
    navigate("schedule");
  };

  const handleCloseCopyLinkDialog = () => {
    setShowCopyLinkDialog(false);
  };

  const getMeeting = useCallback(async () => {
    const response = await axios.get(`/meetings/${meetingId}`);
    console.log(response);
    const meeting = response.data;
    console.log(meeting);
    setMeeting(meeting);
  }, []);

  useEffect(() => {
    getMeeting();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          pb: 6,
          width: 1,
        }}
      >
        <Container sx={{ width: "100%", my: 8 }}>
          <Typography align="center" variant="h2" component="h1" gutterBottom>
            {meeting?.title}
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ mb: 4 }}
          >
            {/* todo this only visible to employee who created meeting */}
            <Tooltip title="Edit">
              <IconButton color="secondary">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <CancelMeetingDialog></CancelMeetingDialog>
          </Stack>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="subtitle1" gutterBottom>
              {meeting?.description}
            </Typography>
            {meeting?.isFinalTime && (
              <Typography variant="subtitle1" gutterBottom>
                Final Meeting Time: {meeting?.finalTime.toLocaleString()}
              </Typography>
            )}
            <Typography variant="subtitle1" gutterBottom>
              The meeting will take {meeting?.duration} minutes
            </Typography>
            {meeting ? <AttendeeList attendees={meeting?.attendees} /> : ""}

            <Box mt={2}>
              {meeting?.isFinalTime ? (
                <Button variant="contained" disabled>
                  Meeting Time is Final
                </Button>
              ) : (
                <>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Button variant="outlined" onClick={handleCopyLink}>
                      Copy Meeting Scheduling Link
                    </Button>
                    <Button variant="outlined" onClick={handleGoToLink}>
                      Go To Meeting Scheduling Page
                    </Button>
                  </Stack>
                </>
              )}
            </Box>

            <CopyLinkDialog
              open={showCopyLinkDialog}
              onClose={handleCloseCopyLinkDialog}
              link={
                ("http://localhost:3000/activeShedule/" +
                  meeting?.schedulingUrl) as string
              }
            />
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MeetingView;
