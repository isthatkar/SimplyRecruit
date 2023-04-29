import {
  Box,
  Button,
  Pagination,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ColumnStackCenter, RowStackCenter, Theme } from "../../Styles/Theme";
import { Meeting } from "../../Types/types";
import MeetingListItem from "./MeetingListItem";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loading/Loader";

const ApplicationMeetings = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 6;
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(6);
  const [currentPageItems, setCurrentPageItems] = useState<Meeting[]>(meetings);

  const navigate = useNavigate();

  const { applicationId } = useParams();

  const handleClickAdd = () => {
    navigate(`/application/${applicationId}/addMeeting`, {
      state: { prop: props.candidateEmail },
    });
  };

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setStartIndex((value - 1) * itemsPerPage);
    setEndIndex(value * itemsPerPage);
  };

  useEffect(() => {
    setCurrentPageItems(meetings.slice(startIndex, endIndex));
  }, [page]);

  const getMeetings = useCallback(async () => {
    let apiCallCompleted = false;
    const apiTimeout = setTimeout(() => {
      if (!apiCallCompleted) {
        setIsLoading(true);
      }
    }, 200);
    const response = await axios.get(`applications/${applicationId}/meetings`);
    const upcomingMeetings = response.data;
    setMeetings(upcomingMeetings);

    setNumPages(Math.ceil(upcomingMeetings.length / itemsPerPage));
    setCurrentPageItems(upcomingMeetings.slice(startIndex, endIndex));
    setIsLoading(false);
    clearTimeout(apiTimeout);
    apiCallCompleted = true;
  }, []);

  useEffect(() => {
    getMeetings();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 5,
            }}
          >
            <RowStackCenter spacing={3}>
              <Button
                size="medium"
                variant="contained"
                onClick={handleClickAdd}
              >
                Schedule a new meeting
              </Button>{" "}
            </RowStackCenter>
          </Box>
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
                  mb: 8,
                }}
                spacing={1}
              >
                <Typography align="center" variant="h5" sx={{ mb: 5 }}>
                  MEETINGS
                </Typography>
                <Pagination
                  count={numPages}
                  page={page}
                  onChange={handlePageChange}
                />
                {currentPageItems.map((meet) => (
                  <MeetingListItem meet={meet} key={meet.id}></MeetingListItem>
                ))}
              </ColumnStackCenter>
            </Box>
          ) : (
            <RowStackCenter spacing={1} sx={{ mb: 8 }}>
              <InfoOutlinedIcon fontSize="large"></InfoOutlinedIcon>
              <Typography align="center" variant="h5">
                NO MEETINGS FOUND FOR THIS APPLICATION
              </Typography>
            </RowStackCenter>
          )}
        </>
      )}
    </>
  );
};

export default ApplicationMeetings;
