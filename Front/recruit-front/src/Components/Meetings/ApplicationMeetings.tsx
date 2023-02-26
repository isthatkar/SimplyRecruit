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
        agenda: "Review project status, assign new tasks",
        time: new Date("2023-03-01T09:30:00Z"),
        final: false,
        dateString: date.toLocaleDateString("en-US", optionsDate),
        timeString: date.toLocaleTimeString("en-US", optionsTime),
      },
      {
        id: 2,
        title: "Client Meeting",
        description: "Present project updates to client",
        agenda: "Demo new features, discuss feedback",
        time: new Date("2023-03-03T14:00:00Z"),
        final: true,
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
                key={meet.id}
                title={meet.title}
                description={meet.description}
                time={meet.final ? meet.dateString : ""}
                final={meet.final}
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
