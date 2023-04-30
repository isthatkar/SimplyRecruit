import { Box, Pagination, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ColumnStackCenter, RowStackCenter } from "../Styles/Theme";
import { Meeting, MeetingType } from "../Types/types";
import MeetingListItem from "../Components/Meetings/MeetingListItem";
import MeetingCalendar from "../Components/Meetings/MeetingsCalendar";
import axios from "axios";
import Loader from "../Components/Loading/Loader";

const UserMeetings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 4;
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [upcomingMeetings, setUpcommingMeetings] = useState<Meeting[]>([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);
  const [currentPageItems, setCurrentPageItems] = useState<Meeting[]>(meetings);

  const getMeetings = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get(`/meetings`);
    const allMeetings = response.data;
    setMeetings(allMeetings);
    const now = new Date();

    const upcommingMeetings = (allMeetings as Meeting[]).filter(
      (s) => s.meetingType !== MeetingType.Final || new Date(s.finalTime) > now
    );
    setUpcommingMeetings(upcommingMeetings);
    setNumPages(Math.ceil(upcommingMeetings.length / itemsPerPage));
    setCurrentPageItems(upcommingMeetings.slice(startIndex, endIndex));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getMeetings();
  }, []);

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setStartIndex((value - 1) * itemsPerPage);
    setEndIndex(value * itemsPerPage);
  };

  useEffect(() => {
    setCurrentPageItems(upcomingMeetings.slice(startIndex, endIndex));
  }, [page]);

  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
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

                      <Pagination
                        count={numPages}
                        page={page}
                        onChange={handlePageChange}
                      />
                      {currentPageItems.map((meet) => (
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
            "Something went wrong"
          )}
        </>
      )}
    </div>
  );
};

export default UserMeetings;
