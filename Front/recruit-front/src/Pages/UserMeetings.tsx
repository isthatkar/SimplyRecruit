import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ColumnStackCenter, RowStackCenter } from "../Styles/Theme";
import { Meeting } from "../Types/types";
import MeetingListItem from "../Components/Meetings/MeetingListItem";
import MeetingCalendar from "../Components/Meetings/MeetingsCalendar";
import axios from "axios";

const UserMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const getMeetings = useCallback(async () => {
    const response = await axios.get(`/meetings`);
    console.log(response);
    const upcomingMeetings = response.data;
    console.log(upcomingMeetings);
    setMeetings(upcomingMeetings);
  }, []);

  useEffect(() => {
    getMeetings();
  }, []);

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
            NO UPCOMING MEETINGS
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
