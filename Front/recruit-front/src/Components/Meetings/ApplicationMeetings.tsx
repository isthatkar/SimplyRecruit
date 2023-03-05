import { Box, Button, Stack, ThemeProvider, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ColumnStackCenter, RowStackCenter, Theme } from "../../Styles/Theme";
import { Meeting } from "../../Types/types";
import MeetingListItem from "./MeetingListItem";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ApplicationMeetings = (props: any) => {
  const [meetings, setMeetings] = React.useState<Meeting[]>([]);

  const navigate = useNavigate();

  const { applicationId } = useParams();

  const handleClickAdd = () => {
    navigate(`/application/${applicationId}/addMeeting`);
  };

  const getMeetings = useCallback(async () => {
    const response = await axios.get(`applications/${applicationId}/meetings`);
    console.log(response);
    const upcomingMeetings = response.data;
    console.log(upcomingMeetings);
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
        <RowStackCenter spacing={3}>
          <Button size="medium" variant="contained" onClick={handleClickAdd}>
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
            }}
            spacing={1}
          >
            <Typography align="center" variant="h5" sx={{ mb: 5 }}>
              UPCOMING MEETINGS
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
    </ThemeProvider>
  );
};

export default ApplicationMeetings;
