import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Meeting } from "../Types/types";
import React from "react";
import AttendeeList from "../Components/Meetings/AttendeesList";
import { ColumnStackCenter, RowStackCenter } from "../Styles/Theme";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CancelMeetingDialog from "../Components/Meetings/CancelMeetingDialog";
import { toast } from "react-toastify";
import MeetingStateChip from "../Components/Meetings/MeetingStateChip";
import EditMeetingDialog from "../Components/Meetings/EditMeetingDialog";

const MeetingView = () => {
  const navigate = useNavigate();
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState<Meeting>();
  const [isUserMeeting, setIsUserMeeting] = useState(false);
  const [finalTimeString, setFinalTimeString] = useState("");

  const handleGoToLink = () => {
    navigate("schedule");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      ("http://localhost:3000/activeShedule/" +
        meeting?.schedulingUrl) as string
    );
    toast.success("Link copied to clipboard", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const getMeeting = useCallback(async () => {
    const response = await axios.get(`/meetings/${meetingId}`);
    console.log(response);
    const fetchedMeeting = response.data;
    console.log(fetchedMeeting);
    setMeeting(fetchedMeeting);
    if (fetchedMeeting.isFinalTime) {
      setFinalTimeString(
        getTimeString(fetchedMeeting.finalTime, fetchedMeeting.duration)
      );
    }
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("email");
    setIsUserMeeting(fetchedMeeting.userId === userId);
    console.log(isUserMeeting);
  }, []);

  useEffect(() => {
    getMeeting();
  }, []);

  const getTimeString = (startTime: string, duration: number) => {
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(
      startDateTime.getTime() + duration * 60 * 1000
    );

    console.log(startTime);
    console.log(endDateTime);

    const formattedStartDateTimeString = startDateTime.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const formattedEndDateTimeString = endDateTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const formattedTimeString = `${formattedStartDateTimeString} - ${formattedEndDateTimeString}`;

    return formattedTimeString;
  };

  const hasMeetingPassed = () => {
    if (meeting) {
      if (meeting.isFinalTime === false) {
        return false;
      }
      const startDateTimeString = meeting.finalTime;
      const startDateTime = new Date(startDateTimeString);

      const hasEventPassed = startDateTime < new Date();

      return hasEventPassed;
    }
    return false;
  };

  return (
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
        {meeting && (meeting?.isCanceled || hasMeetingPassed()) ? (
          <RowStackCenter sx={{ mb: 2 }}>
            <MeetingStateChip meeting={meeting}></MeetingStateChip>
          </RowStackCenter>
        ) : (
          <RowStackCenter sx={{ mb: 2 }}>
            <>
              {!meeting?.isFinalTime ? (
                <RowStackCenter>
                  <Tooltip title={"Copy scheduling link"}>
                    <IconButton onClick={handleCopyLink}>
                      <ContentCopyIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Go to scheduling page"}>
                    <IconButton onClick={handleGoToLink}>
                      <ScheduleIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                </RowStackCenter>
              ) : (
                ""
              )}
            </>
            <>
              {meeting && isUserMeeting ? (
                <>
                  <EditMeetingDialog meeting={meeting} />
                  <CancelMeetingDialog
                    meetingId={meeting?.id}
                  ></CancelMeetingDialog>
                </>
              ) : (
                ""
              )}
            </>
          </RowStackCenter>
        )}

        <ColumnStackCenter spacing={2}>
          <Typography variant="subtitle1" gutterBottom>
            {meeting?.description}
          </Typography>
          {meeting?.isFinalTime && (
            <Typography variant="subtitle1" gutterBottom>
              {finalTimeString}
            </Typography>
          )}
          {meeting ? <AttendeeList attendees={meeting?.attendees} /> : ""}
        </ColumnStackCenter>
      </Container>
    </Box>
  );
};

export default MeetingView;
