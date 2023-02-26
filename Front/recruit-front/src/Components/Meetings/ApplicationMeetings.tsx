import { Box, Button, Stack, ThemeProvider, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Theme from "../../Styles/Theme";
import { Meeting } from "../../Types/types";
import MeetingListItem from "./MeetingListItem";
import { useNavigate, useParams } from "react-router-dom";

const ApplicationMeetings = (props: any) => {
  const [meetings, setMeetings] = React.useState<Meeting[]>([]);

  const navigate = useNavigate();

  const { applicationId } = useParams();

  const handleClickAdd = () => {
    navigate(`/application/${applicationId}/addMeeting`);
  };

  const getMeetings = useCallback(async () => {
    const optionsDate = {
      weekday: "long" as const,
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
    };

    const optionsTime = {
      hour: "numeric" as const,
      minute: "numeric" as const,
      hour12: true,
    };

    const date = new Date("2023-03-01T09:30:00Z");

    const upcomingMeetings: Meeting[] = [
      {
        id: 1,
        title: "Team Meeting",
        description: "Discuss team progress",
        finalTime: "2023-03-01T09:30:00Z",
        duration: 60,
        schedulingUrl: "https://randomurl.com",
        isFinalTime: false,
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
        dateString: date.toLocaleDateString("en-US", optionsDate),
        timeString: date.toLocaleTimeString("en-US", optionsTime),
      },
      {
        id: 2,
        title: "Team Meeting",
        description: "Discuss team progress",
        finalTime: "2023-03-01T09:30:00Z",
        duration: 60,
        schedulingUrl: "https://randomurl.com",
        isFinalTime: true,
        attendees: ["rugile.karengaite@nordsec.com", "blablabla@gmail.com"],
        meetingTimes: [
          {
            id: 1,
            time: "2023-03-01T09:30:00Z",
            selectedAttendees: ["Bob", "Alice"],
          },
          {
            id: 1,
            time: "2023-03-01T09:30:00Z",
            selectedAttendees: [],
          },
          {
            id: 1,
            time: "2023-03-01T09:30:00Z",
            selectedAttendees: ["Bob"],
          },
        ],
        dateString: date.toLocaleDateString("en-US", optionsDate),
        timeString: date.toLocaleTimeString("en-US", optionsTime),
      },
    ];

    setMeetings(upcomingMeetings);
  }, []);

  useEffect(() => {
    getMeetings();
  }, []);
  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Button size="medium" variant="contained" onClick={handleClickAdd}>
            Schedule a new meeting
          </Button>{" "}
        </Stack>
      </Box>

      {meetings.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              width: "80%",
              maxWidth: "900",
              "@media (max-width: 900px)": {
                width: "100%",
              },
            }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography align="center" variant="h5" sx={{ mb: 5 }}>
              UPCOMING MEETINGS
            </Typography>
            {meetings.map((meet) => (
              <MeetingListItem
                id={meet.id}
                key={meet.id}
                title={meet.title}
                description={meet.description}
                time={meet.isFinalTime ? meet.dateString : ""}
                final={meet.isFinalTime}
              ></MeetingListItem>
            ))}
          </Stack>
        </Box>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <InfoOutlinedIcon fontSize="large"></InfoOutlinedIcon>
          <Typography align="center" variant="h5">
            NO UPCOMING MEETINGS FOR THIS APPLICATION
          </Typography>
        </Stack>
      )}
    </ThemeProvider>
  );
};

export default ApplicationMeetings;
