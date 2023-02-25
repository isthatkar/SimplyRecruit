import { Box, Button, Stack, ThemeProvider, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Theme from "../../Styles/Theme";
import { Meeting } from "../../Types/types";
import MeetingListItem from "./MeetingListItem";

const ApplicationMeetings = (props: any) => {
  const [meetings, setMeetings] = React.useState<Meeting[]>([]);

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
        agenda: "Review project status, assign new tasks",
        time: new Date("2023-03-01T09:30:00Z"),
        dateString: date.toLocaleDateString("en-US", optionsDate),
        timeString: date.toLocaleTimeString("en-US", optionsTime),
      },
      {
        id: 2,
        title: "Client Meeting",
        description: "Present project updates to client",
        agenda: "Demo new features, discuss feedback",
        time: new Date("2023-03-03T14:00:00Z"),
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
          <Button variant="contained">Add scheduled meeting</Button>
          <Button variant="contained">Get meeting scheduling link</Button>
        </Stack>
      </Box>

      {meetings.length > 0 ? (
        <Box>
          <Typography align="center" variant="h5">
            UPCOMING MEETINGS
          </Typography>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            {meetings.map((meet) => (
              <MeetingListItem
                key={meet.id}
                title={meet.title}
                description={meet.description}
                time={meet.dateString}
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
