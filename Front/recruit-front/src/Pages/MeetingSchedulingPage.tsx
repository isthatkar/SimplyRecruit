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
import { useParams } from "react-router-dom";

const MeetingSchedulingPage = () => {
  const [meeting, setMeeting] = useState<Meeting>();
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);
  const { meetingId } = useParams();

  function handleTimeClick(timeId: number) {
    setSelectedTimes((prevSelected) =>
      prevSelected.includes(timeId)
        ? prevSelected.filter((id) => id !== timeId)
        : [...prevSelected, timeId]
    );
  }

  const getMeeting = useCallback(async () => {
    const response = await axios.get(`/meetings/${meetingId}`);
    console.log(response);
    const responseMeeting = response.data as Meeting;
    console.log(responseMeeting);
    console.log(responseMeeting.meetingTimes);
    setMeeting(responseMeeting);
    console.log(meeting);
  }, []);

  useEffect(() => {
    getMeeting();
  }, []);

  function handleSaveClick() {
    // TODO: Implement save logic
  }

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
              Select the times when you are available:
            </Typography>
            {meeting ? (
              <List>
                {meeting.meetingTimes.map((time: MeetingTime) => (
                  <ListItem
                    key={time.id}
                    button
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
                                  {index !==
                                    time.selectedAttendees.split(";").length -
                                      1 && ", "}
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
          <Button variant="contained" onClick={handleSaveClick} sx={{ my: 3 }}>
            Save
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MeetingSchedulingPage;
