import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Meeting, MeetingTime, MeetingType } from "../Types/types";
import { RowStackItemsBetween } from "../Styles/Theme";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import FinalTimeSelector from "../Components/Meetings/FinalTimeSelector";
import { toast } from "react-toastify";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {
  GetFormatedDate,
  findTimeConflictingMeetings,
} from "../Helpers/DateHelper";

const MeetingSchedulingPage = () => {
  const [isLoding, setIsLoading] = useState(false);
  const [meeting, setMeeting] = useState<Meeting>();
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const userEmail = localStorage.getItem("email");
  const [isUserMeeting, setIsUserMeeting] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [isAttendee, setIsAttendee] = useState(false);
  const [userHasSelectedTimes, setUserHasSelectedTimes] =
    useState<boolean>(false);
  const [isSelectingFinalTime, setIsSelectingFinalTime] =
    useState<boolean>(false);
  const [isEditingTimes, setIsEditingTimes] = useState<boolean>(false);
  const { meetingId } = useParams();
  const navigate = useNavigate();

  function handleTimeClick(timeId: number) {
    setSelectedTimes((prevSelectedTimes) => {
      if (prevSelectedTimes.includes(timeId)) {
        return prevSelectedTimes.filter((id) => id !== timeId);
      } else {
        return [...prevSelectedTimes, timeId];
      }
    });

    const newMeeting = meeting;
    const selectedTime = meeting?.meetingTimes.find((t) => t.id === timeId);
    const selectedTimeIndex = meeting?.meetingTimes.findIndex(
      (t) => t.id === timeId
    );

    if (
      newMeeting &&
      selectedTimeIndex !== undefined &&
      selectedTimeIndex >= 0
    ) {
      newMeeting.meetingTimes[selectedTimeIndex].selectedAttendees =
        updateEmails(
          selectedTime?.selectedAttendees as string,
          userEmail as string
        );
      setMeeting(newMeeting);
    }
  }

  const getMeeting = useCallback(async () => {
    let apiCallCompleted = false;
    const apiTimeout = setTimeout(() => {
      if (!apiCallCompleted) {
        setIsLoading(true);
      }
    }, 200);
    const response = await axios.get(`/meetings/${meetingId}`);
    const responseMeeting = response.data as Meeting;
    if (
      responseMeeting?.meetingType === MeetingType.Final ||
      responseMeeting?.isCanceled
    ) {
      navigate(`/meetings/${responseMeeting.id}`);
    }
    const hasSelected = responseMeeting.selectedAtendees.includes(
      userEmail as string
    );
    CheckIfIsCandidateOfTheMeeting(responseMeeting);
    setUserHasSelectedTimes(hasSelected);
    if (hasSelected) {
      const userSelectedTimes = responseMeeting.meetingTimes
        .filter((time) => time.selectedAttendees.includes(userEmail as string))
        .map((time) => time.id);

      setSelectedTimes(userSelectedTimes);
    }
    const userId = localStorage.getItem("userId");
    setIsUserMeeting(responseMeeting.userId === userId);

    const userMeetingsResponse = await axios.get(`/meetings`);
    const allMeetings = userMeetingsResponse.data;
    const now = new Date();

    const upcommingMeetings = (allMeetings as Meeting[]).filter(
      (s) => s.meetingType !== MeetingType.Final && new Date(s.finalTime) > now
    );

    responseMeeting.meetingTimes.forEach((time) => {
      time.conflictingMeetings = findTimeConflictingMeetings(
        time,
        responseMeeting.duration,
        upcommingMeetings
      );
    });
    setMeeting(responseMeeting);
    apiCallCompleted = true;
    setIsLoading(false);
  }, []);

  function updateEmails(
    atendeesString: string,
    emailToAddOrRemove: string
  ): string {
    const emails = atendeesString.split(";").filter((e) => e !== "");
    const index = emails.indexOf(emailToAddOrRemove);

    if (index === -1) {
      emails.push(emailToAddOrRemove);
    } else if (index !== -1) {
      emails.splice(index, 1);
    }

    return emails.join(";");
  }

  function CheckIfIsCandidateOfTheMeeting(meeting: Meeting) {
    const role = localStorage.getItem("roles");

    if (meeting.attendees.includes(userEmail as string)) {
      setIsAttendee(true);
      if (role === "Candidate") {
        setIsCandidate(true);
        if (meeting.meetingType === MeetingType.CandidateTimeSelect) {
          setIsSelectingFinalTime(true);
        }
      }
    }
  }

  useEffect(() => {
    getMeeting();
  }, []);

  const handleSaveClick = async () => {
    await selectTimes();
  };

  const handleEditClick = () => {
    setIsEditingTimes(!isEditingTimes);
  };

  const handleSelectFinalTime = () => {
    setIsSelectingFinalTime(!isSelectingFinalTime);
  };

  const selectTimes = useCallback(async () => {
    const response = await axios.put(`/meetingTimes/select`, {
      meetingId: meeting?.id,
      ids: selectedTimes,
    });

    if (response.status === 200) {
      setUserHasSelectedTimes(true);
      setIsEditingTimes(false);
      toast.success("Successfully selected the times", {
        position: "top-right",
      });
    } else {
      toast.error("Selecting the times failed. Try again.", {
        position: "top-right",
      });
    }
  }, [selectedTimes]);

  return (
    <Box
      sx={{
        pb: 6,
        width: 1,
      }}
    >
      <Container sx={{ width: "100%", my: 8 }}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={3}
        >
          <Typography variant="h3" align="center">
            {meeting?.title}{" "}
          </Typography>

          <Typography variant="body1" align="center">
            The meeting will take {meeting?.duration} minutes
          </Typography>

          <RowStackItemsBetween sx={{ width: "100%" }}>
            <Typography variant="h6">
              {isSelectingFinalTime ? (
                "Select the final meeting time:"
              ) : (
                <>
                  {userHasSelectedTimes || isEditingTimes
                    ? "You have already selected the available times for this meeting"
                    : " Select the times when you are available:"}
                </>
              )}
            </Typography>
            {userHasSelectedTimes ? (
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                {isSelectingFinalTime ? (
                  ""
                ) : (
                  <Tooltip title="Edit selection">
                    <IconButton
                      sx={{ ml: 2 }}
                      onClick={handleEditClick}
                      disabled={isSelectingFinalTime}
                    >
                      <EditIcon color="secondary"></EditIcon>
                    </IconButton>
                  </Tooltip>
                )}

                {isUserMeeting ? (
                  <Tooltip title={"Select final time"}>
                    <IconButton
                      onClick={handleSelectFinalTime}
                      disabled={isEditingTimes}
                    >
                      <EventAvailableIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                )}
              </Stack>
            ) : (
              ""
            )}
          </RowStackItemsBetween>

          {meeting && !isSelectingFinalTime ? (
            <div>
              <List>
                {meeting.meetingTimes.map((time: MeetingTime) => (
                  <ListItem
                    key={time.id}
                    button
                    disabled={userHasSelectedTimes && !isEditingTimes}
                    selected={selectedTimes.includes(time.id)}
                    onClick={() => handleTimeClick(time.id)}
                  >
                    {time.conflictingMeetings.length > 0 ? (
                      <Tooltip title="You have meetings in your calendar that are overlapping with this time">
                        <PriorityHighIcon></PriorityHighIcon>
                      </Tooltip>
                    ) : (
                      ""
                    )}
                    <ListItemText primary={GetFormatedDate(time.startTime)} />

                    <Tooltip
                      title={
                        time.selectedAttendees.length === 0
                          ? "No attendees selected"
                          : time.selectedAttendees.split(";").join(", ")
                      }
                    >
                      <div>
                        {time.selectedAttendees.length === 0
                          ? ""
                          : time.selectedAttendees
                              .split(";")
                              .map((attendee, index) => (
                                <React.Fragment key={attendee}>
                                  <PersonIcon color="secondary" />
                                </React.Fragment>
                              ))}
                      </div>
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                onClick={handleSaveClick}
                sx={{ my: 3 }}
                disabled={
                  (userHasSelectedTimes && !isEditingTimes) ||
                  selectedTimes.length <= 0
                }
              >
                Save
              </Button>
            </div>
          ) : (
            <>
              {meeting ? (
                <FinalTimeSelector meeting={meeting}></FinalTimeSelector>
              ) : (
                ""
              )}
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default MeetingSchedulingPage;
