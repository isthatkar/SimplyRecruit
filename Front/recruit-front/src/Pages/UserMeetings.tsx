import { Box, ThemeProvider, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ColumnStackCenter, RowStackCenter, Theme } from "../Styles/Theme";
import { Meeting } from "../Types/types";
import MeetingListItem from "../Components/Meetings/MeetingListItem";
import MeetingCalendar from "../Components/Meetings/MeetingsCalendar";

const UserMeetings = (props: any) => {
  const meetings = [
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
      dateString: "",
      timeString: "",
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
          time: "2023-03-02T09:30:00Z",
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
      dateString: "",
      timeString: "",
    },
  ];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          background: "red",
          justifyContent: "center",
          mb: 5,
          mt: 4,
        }}
      ></Box>

      {meetings.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ColumnStackCenter
            sx={{
              width: "80%",
              maxWidth: "900",
              "@media (max-width: 900px)": {
                width: "100%",
              },
            }}
            spacing={1}
          >
            <Typography align="center" variant="h2" sx={{ mb: 5 }}>
              Upcoming meetings
            </Typography>
            {meetings.map((meet) => (
              <MeetingListItem meet={meet} key={meet.id}></MeetingListItem>
            ))}
          </ColumnStackCenter>
        </Box>
      ) : (
        <RowStackCenter spacing={1}>
          <InfoOutlinedIcon fontSize="large"></InfoOutlinedIcon>
          <Typography align="center" variant="h5">
            NO UPCOMING MEETINGS FOR THIS APPLICATION
          </Typography>
        </RowStackCenter>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 8,
          mt: 4,
        }}
      >
        <MeetingCalendar meetings={meetings}></MeetingCalendar>
      </Box>
    </div>
  );
};

export default UserMeetings;
