import {
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Meeting, MeetingType } from "../Types/types";
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
import GoogleIcon from "@mui/icons-material/Google";
import createMeeting from "../Helpers/googleMeetsHelper";
import VideocamIcon from "@mui/icons-material/Videocam";

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
      ("https://simplyrecruitfrontend.azurewebsites.net/activeShedule/" +
        meeting?.schedulingUrl) as string
    );
    toast.success("Link copied to clipboard", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleCreateGoogleMeet = async () => {
    if (meeting) {
      const data = await createMeeting(meeting);
      if (data === null) {
        console.error("failed to create google calendar event");
        toast.error("Failed to create Google Calendar event!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        const response = await axios.put(`/meetings/${meeting.id}`, {
          meetingUrl: data.htmlLink,
        });
        setMeeting({ ...meeting, meetingUrl: data.htmlLink });
      }
    }
  };

  const getMeeting = useCallback(async () => {
    const response = await axios.get(`/meetings/${meetingId}`);
    const fetchedMeeting = response.data;
    setMeeting(fetchedMeeting);
    if (fetchedMeeting.meetingType === MeetingType.Final) {
      setFinalTimeString(
        getTimeString(fetchedMeeting.finalTime, fetchedMeeting.duration)
      );
    }
    const userId = localStorage.getItem("userId");
    setIsUserMeeting(fetchedMeeting.userId === userId);
  }, []);

  useEffect(() => {
    getMeeting();
  }, []);

  const getTimeString = (startTime: string, duration: number) => {
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(
      startDateTime.getTime() + duration * 60 * 1000
    );

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
      if (meeting.meetingType !== MeetingType.Final) {
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
          ""
        ) : (
          <RowStackCenter sx={{ mb: 2 }}>
            <>
              {meeting?.meetingType !== MeetingType.Final ? (
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
                  <CancelMeetingDialog meeting={meeting}></CancelMeetingDialog>
                </>
              ) : (
                ""
              )}
              {meeting?.isCanceled === false &&
              meeting.meetingType === MeetingType.Final ? (
                <>
                  {meeting.meetingUrl !== "" ? (
                    <>
                      <Tooltip title={"Open Google Meet"}>
                        <IconButton
                          href={meeting?.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <VideocamIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      {isUserMeeting ? (
                        <Tooltip title={"Create Google Meet"}>
                          <IconButton onClick={handleCreateGoogleMeet}>
                            <GoogleIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </>
              ) : (
                ""
              )}
            </>
          </RowStackCenter>
        )}
        {meeting ? (
          <RowStackCenter sx={{ mb: 2 }}>
            <MeetingStateChip meeting={meeting}></MeetingStateChip>
          </RowStackCenter>
        ) : (
          ""
        )}

        <ColumnStackCenter spacing={2}>
          {meeting?.meetingType === MeetingType.Final && (
            <Typography variant="h6" gutterBottom>
              {finalTimeString}
            </Typography>
          )}
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {meeting?.description}
          </Typography>

          {meeting ? <AttendeeList attendees={meeting?.attendees} /> : ""}
        </ColumnStackCenter>
      </Container>
    </Box>
  );
};

export default MeetingView;
