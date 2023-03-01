import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { Meeting } from "../../Types/types";
import { Button, Theme, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { ThemeProvider } from "@emotion/react";
import MyTheme from "../../Styles/Theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    calendarContainer: {
      margin: "0 auto",
      padding: "20px",
      width: "80%",
      maxHeight: "5px",
    },
    calendarHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
  })
);

function MeetingCalendar(props: any) {
  const classes = useStyles();

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [eventSources, setEventSources] = useState<EventSourceInput[]>();

  useEffect(() => {
    // fetch meetings from API or local storage
    const storedMeetings = props.meetings;
    console.log(storedMeetings);
    if (storedMeetings) {
      setMeetings(storedMeetings);
      const mappedMeetings = meetings.map(convertToEventInput);
      console.log(mappedMeetings);
      const eventSourcesm = [
        {
          events: mappedMeetings,
        },
      ];
      setEventSources(eventSourcesm);
      console.log(eventSourcesm);
    }
  }, []);

  function convertToEventInput(meeting: Meeting): EventInput {
    console.log(meeting);
    const durationMinutes = 60; // set the duration in minutes
    const start = new Date(meeting.finalTime); // convert the start time to a Date object

    const end = new Date(start); // create a new Date object with the same value as start
    end.setMinutes(start.getMinutes() + durationMinutes); // add the duration to the minutes value of the end time
    console.log(meeting);
    return {
      id: String(meeting.id),
      title: meeting.title,
      start: new Date(meeting.finalTime),
      end: end,
      allDay: false,
    };
  }
  const handleExportClick = () => {
    console.log("Export button clicked");
  };
  function handleEventClick(info: any) {
    console.log(info.event.title);
  }

  return (
    <ThemeProvider theme={MyTheme}>
      <div className={classes.calendarContainer}>
        <FullCalendar
          height="600px"
          themeSystem="bootstrap"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          eventSources={eventSources}
          eventClick={handleEventClick}
        />
        <Button onClick={handleExportClick} sx={{ mt: 4, mb: 8 }}>
          Export calendar
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default MeetingCalendar;
