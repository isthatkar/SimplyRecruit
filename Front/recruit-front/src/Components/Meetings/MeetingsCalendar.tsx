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
import * as ics from "ics";

interface CalendarProps {
  meetings: Meeting[];
}

const MeetingCalendar = ({ meetings }: CalendarProps) => {
  const classes = useStyles();

  const [eventSources, setEventSources] = useState<EventSourceInput[]>();
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>();

  useEffect(() => {
    const mappedMeetings = meetings
      .filter((m) => !m.isCanceled && m.isFinalTime) //only not canceled and final time meetings
      .map(convertToEventInput);
    const eventSourcesm = [
      {
        events: mappedMeetings,
      },
    ];
    setUpcomingMeetings(meetings.filter((m) => !m.isCanceled && m.isFinalTime));
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
    downloadICal();
  };

  function handleEventClick(info: any) {
    console.log(info.event.title);
  }

  function downloadICal() {
    if (upcomingMeetings) {
      const events = upcomingMeetings.map((meeting) => {
        const start = new Date(meeting.finalTime);
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + meeting.duration);

        return {
          title: meeting.title,
          start: [
            start.getFullYear(),
            start.getMonth() + 1,
            start.getDate(),
            start.getHours(),
            start.getMinutes(),
          ],
          end: [
            end.getFullYear(),
            end.getMonth() + 1,
            end.getDate(),
            end.getHours(),
            end.getMinutes(),
          ],
          description: meeting.description,
        };
      });

      const { error, value } = ics.createEvents(events as any);

      if (error) {
        console.error(error);
        return;
      }

      const blob = new Blob([value as any], {
        type: "text/calendar;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "calendar.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
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
