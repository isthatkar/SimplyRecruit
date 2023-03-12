import React from "react";
import { Meeting } from "../Types/types";

const accessToken = localStorage.getItem("gtoken"); // obtain access token using OAuth2.0 flow

const getEndTime = (startTime: string, durationMinutes: number): string => {
  const startDate = new Date(startTime);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  return endDate.toISOString();
};

const createMeeting = async (meeting: Meeting) => {
  const event = {
    summary: meeting.title,
    location: "Remote",
    start: {
      dateTime: meeting.finalTime,
      timeZone: "Europe/Vilnius",
    },
    end: {
      dateTime: getEndTime(meeting.finalTime, meeting.duration),
      timeZone: "Europe/Vilnius",
    },
    description: meeting.description,
    attendees: meeting.attendees.split(";"),
  };

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  const data = await response.json();

  if (response.ok) {
    console.log(`Event created: ${data.htmlLink}`);
  } else {
    console.error(`Failed to create event: ${data.error.message}`);
  }
};

export default createMeeting;
