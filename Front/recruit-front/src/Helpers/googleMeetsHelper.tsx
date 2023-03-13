import axios from "axios";
import React from "react";
import { Meeting } from "../Types/types";

const getEndTime = (startTime: string, durationMinutes: number): string => {
  const startDate = new Date(startTime);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  return endDate.toISOString();
};

const queryParams = new URLSearchParams({
  conferenceDataVersion: "1",
}).toString();

const getGoogleAccessToken = async () => {
  const response = await axios.get("/curentUser");
  console.log(response.data);
  const user = response.data;
  return user.googleAccessToken;
};

const createMeeting = async (meeting: Meeting) => {
  const accessToken = await getGoogleAccessToken();
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
    attendees: meeting.attendees.split(";").map((email) => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: `${meeting.id}${meeting.schedulingUrl}`,
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    reminders: {
      useDefault: true,
    },
    visibility: "default",
    guestsCanModify: false,
    guestsCanInviteOthers: false,
  };

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${queryParams}`,
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

  console.log("event data");
  console.log(data);

  if (response.ok) {
    return data.htmlLink;
  } else {
    console.error(`Failed to create event: ${data.error.message}`);
    return null;
  }
};

export default createMeeting;
