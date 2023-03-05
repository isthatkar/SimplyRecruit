import { useState } from "react";
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

const MeetingSchedulingPage = () => {
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
        selectedAttendees: [
          "rugile.karengaite@nordsec.com",
          "blablabla@gmail.com",
        ],
      },
      {
        id: 2,
        time: "2023-03-01T09:30:00Z",
        selectedAttendees: [],
      },
      {
        id: 3,
        time: "2023-03-01T09:30:00Z",
        selectedAttendees: ["rugile.karengaite@nordsec.com"],
      },
    ],
    isCanceled: false,
    meetingUrl: "",
  });
  const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

  function handleTimeClick(timeId: number) {
    setSelectedTimes((prevSelected) =>
      prevSelected.includes(timeId)
        ? prevSelected.filter((id) => id !== timeId)
        : [...prevSelected, timeId]
    );
  }

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
              {meeting.title}{" "}
            </Typography>
            <Typography variant="body1" align="center">
              {meeting.description}
            </Typography>

            <Typography variant="body1" align="center">
              The meeting will take {meeting.duration} minutes
            </Typography>

            <Typography variant="h6">
              Select the times when you are available:
            </Typography>
            <List>
              {meeting.meetingTimes.map((time: MeetingTime) => (
                <ListItem
                  key={time.id}
                  button
                  selected={selectedTimes.includes(time.id)}
                  onClick={() => handleTimeClick(time.id)}
                >
                  <ListItemText primary={GetFormatedDate(time.time)} />

                  <Tooltip title={time.selectedAttendees.join(", ")}>
                    <div>
                      {time.selectedAttendees.map((atendee) => (
                        <PersonIcon key={atendee}></PersonIcon>
                      ))}
                    </div>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
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
