import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventSourceInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import { Meeting } from "../../Types/types";

function MeetingCalendar(props: any) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [eventSources, setEventSources] = useState<EventSourceInput[]>();

  useEffect(() => {
    // fetch meetings from API or local storage
    const storedMeetings = props.meetings;
    if (storedMeetings) {
      setMeetings(storedMeetings);
    }

    const eventSourcesm = [
      {
        events: meetings.map(convertToEventInput),
        color: "purple",
        textColor: "white",
      },
    ];
    setEventSources(eventSourcesm);
    console.log(eventSourcesm);
  }, []);

  function handleEventClick(info: any) {
    console.log(info.event.title);
  }

  function handleEventDrop(info: any) {
    console.log(info.event.title, info.event.start);
    // save updated meeting to API or local storage
    const updatedMeetings = meetings.map((meeting) =>
      meeting.id === info.event.id
        ? { ...meeting, start: info.event.start, end: info.event.end }
        : meeting
    );
    setMeetings(updatedMeetings);
    localStorage.setItem("meetings", JSON.stringify(updatedMeetings));
  }

  function convertToEventInput(meeting: Meeting): EventInput {
    const durationMinutes = 60; // set the duration in minutes
    const start = new Date(meeting.finalTime); // convert the start time to a Date object

    const end = new Date(start); // create a new Date object with the same value as start
    end.setMinutes(start.getMinutes() + durationMinutes); // add the duration to the minutes value of the end time
    return {
      id: String(meeting.id),
      title: meeting.title,
      start: new Date(meeting.finalTime),
      end: end,
      allDay: false,
    };
  }

  return (
    <div className="meeting-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        initialView="timeGridWeek"
        selectable={true}
        eventSources={eventSources}
        eventClick={handleEventClick}
      />
    </div>
  );
}

export default MeetingCalendar;
