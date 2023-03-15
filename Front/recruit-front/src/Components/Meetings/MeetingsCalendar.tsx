import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { Meeting } from "../../Types/types";
import { Button } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Theme, useStyles } from "../../Styles/Theme";

interface CalendarProps {
  meetings: Meeting[];
}

const MeetingCalendar = ({ meetings }: CalendarProps) => {
  const classes = useStyles();

  const [eventSources, setEventSources] = useState<EventSourceInput[]>();

  useEffect(() => {
    const storedMeetings = meetings;
    const mappedMeetings = storedMeetings
      .filter((m) => !m.isCanceled && m.isFinalTime) //only not canceled and final time meetings
      .map(convertToEventInput);
    const eventSourcesm = [
      {
        events: mappedMeetings,
      },
    ];
    setEventSources(eventSourcesm);
  }, [meetings]);

  const convertToEventInput = (meeting: Meeting) => {
    const start = new Date(meeting.finalTime);
    const end = new Date(start);
    end.setMinutes(start.getMinutes() + meeting.duration);
    return {
      id: String(meeting.id),
      title: meeting.title,
      start: start,
      end: end,
      allDay: false,
    };
  };
  const handleExportClick = () => {
    console.log("Export button clicked");
  };
  function handleEventClick(info: any) {
    console.log(info.event.title);
  }

  return (
    <ThemeProvider theme={Theme}>
      <div className={classes.calendarContainer}>
        <FullCalendar
          weekNumberCalculation="ISO"
          firstDay={1}
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
};

export default MeetingCalendar;
