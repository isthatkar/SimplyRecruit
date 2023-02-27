import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Meeting } from "../Types/types";
import React from "react";
import CopyLinkDialog from "../Components/Meetings/CopyLinkDialog";
import AttendeeList from "../Components/Meetings/AttendeesList";
import MeetingStateChip from "../Components/Meetings/MeetingStateChip";
import Theme from "../Styles/Theme";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const MeetingView = () => {
  const [showCopyLinkDialog, setShowCopyLinkDialog] = useState(false);
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<Meeting>({
    id: 1,
    title: "Team Meeting",
    description: "Discuss team progress",
    finalTime: "2023-03-01T09:30:00Z",
    duration: 60,
    isFinalTime: false,
    schedulingUrl: `/meetings/1/schedule`,
    attendees: ["rugile.karengaite@nordsec.com", "blablabla@gmail.com"],
    meetingTimes: [
      {
        id: 1,
        time: "2023-03-01T09:30:00Z",
        selectedAttendees: ["Bob", "Alice"],
      },
      {
        id: 2,
        time: "2023-03-01T09:30:00Z",
        selectedAttendees: [],
      },
      {
        id: 3,
        time: "2023-03-01T09:30:00Z",
        selectedAttendees: ["Bob"],
      },
    ],
    dateString: "",
    timeString: "",
  });

  const handleCopyLink = () => {
    setShowCopyLinkDialog(true);
  };

  const handleGoToLink = () => {
    navigate("schedule");
  };

  const handleCloseCopyLinkDialog = () => {
    setShowCopyLinkDialog(false);
  };

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
            <IconButton color="secondary">
              <DeleteIcon />
            </IconButton>
            <IconButton color="secondary">
              <EditIcon />
            </IconButton>
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
            <AttendeeList attendees={meeting.attendees} />

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
              link={meeting.schedulingUrl}
            />
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MeetingView;
