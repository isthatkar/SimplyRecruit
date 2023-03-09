import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Meeting, MeetingTime } from "../Types/types";
import { Theme } from "../Styles/Theme";
import PersonIcon from "@mui/icons-material/Person";
import GetFormatedDate from "../Helpers/DateFormater";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const MeetingSchedulingPage = () => {
  const [meeting, setMeeting] = useState<Meeting>();
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const [userHasSelectedTimes, setUserHasSelectedTimes] =
    useState<boolean>(false);
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
  }

  const getMeeting = useCallback(async () => {
    const response = await axios.get(`/meetings/${meetingId}`);
    const responseMeeting = response.data as Meeting;
    setMeeting(responseMeeting);
    if (responseMeeting?.isFinalTime) {
      navigate(`/meetings/${responseMeeting.id}`);
    }
    const userEmail = localStorage.getItem("email");
    const hasSelected = responseMeeting.selectedAtendees.includes(
      userEmail as string
    );
    setUserHasSelectedTimes(hasSelected);
    if (hasSelected) {
      const userSelectedTimes = responseMeeting.meetingTimes
        .filter((time) => time.selectedAttendees.includes(userEmail as string))
        .map((time) => time.id);

      setSelectedTimes(userSelectedTimes);
    }
  }, []);

  useEffect(() => {
    getMeeting();
  }, []);

  const handleSaveClick = async () => {
    await selectTimes();
  };

  const selectTimes = useCallback(async () => {
    console.log(selectedTimes);
    const response = await axios.put(`/meetingTimes/select`, {
      meetingId: meeting?.id,
      ids: selectedTimes,
    });

    if (response.status === 200) {
      navigate(`/meetings/${meetingId}`);
    } else {
      console.log("not success");
    }
  }, [selectedTimes]);
  return (
    <ThemeProvider theme={Theme}>
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
              {meeting?.description}
            </Typography>

            <Typography variant="body1" align="center">
              The meeting will take {meeting?.duration} minutes
            </Typography>

            <Typography variant="h6">
              {userHasSelectedTimes
                ? "You have already selected the available times for this meeting"
                : " Select the times when you are available:"}
            </Typography>
            {meeting ? (
              <List>
                {meeting.meetingTimes.map((time: MeetingTime) => (
                  <ListItem
                    key={time.id}
                    button
                    disabled={userHasSelectedTimes}
                    selected={selectedTimes.includes(time.id)}
                    onClick={() => handleTimeClick(time.id)}
                  >
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
                                  <PersonIcon />
                                </React.Fragment>
                              ))}
                      </div>
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
            ) : (
              ""
            )}
          </Stack>
          <Button
            variant="contained"
            onClick={handleSaveClick}
            sx={{ my: 3 }}
            disabled={userHasSelectedTimes}
          >
            Save
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MeetingSchedulingPage;
