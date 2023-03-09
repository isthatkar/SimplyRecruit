import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ColumnStackCenter, RowStackCenter } from "../Styles/Theme";
import { Meeting } from "../Types/types";
import MeetingListItem from "../Components/Meetings/MeetingListItem";
import MeetingCalendar from "../Components/Meetings/MeetingsCalendar";
import axios from "axios";
import Loader from "../Components/Loading/Loader";

const UserMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>();
  const [upcomingMeetings, setUpcommingMeetings] = useState<Meeting[]>([]);

  const getMeetings = useCallback(async () => {
    const response = await axios.get(`/meetings`);
    console.log(response);
    const allMeetings = response.data;
    setMeetings(allMeetings);
    const now = new Date();

    const upcommingMeetings = (allMeetings as Meeting[]).filter(
      (s) => s.isFinalTime === false || new Date(s.finalTime) > now
    );
    setUpcommingMeetings(upcommingMeetings);
  }, []);

  useEffect(() => {
    getMeetings();
  }, []);

  return (
    <div>
      {meetings ? (
        <>
          {meetings.length > 0 ? (
            <div>
              <Box
                sx={{
                  display: "flex",
                  mt: 8,
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
                  {upcomingMeetings.map((meet) => (
                    <MeetingListItem
                      meet={meet}
                      key={meet.id}
                    ></MeetingListItem>
                  ))}
                </ColumnStackCenter>
              </Box>
            </div>
          ) : (
            <RowStackCenter spacing={1} sx={{ mt: 8 }}>
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
        </>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
};

export default UserMeetings;
