import axios from "axios";
import React from "react";
import { CreateMeetingDto } from "../Types/types";

const getEndTime = (startTime: Date, durationMinutes: number): Date => {
  const endDate = new Date(
    new Date(startTime).getTime() + durationMinutes * 60000
  );
  return endDate;
};

const queryParams = new URLSearchParams({
  conferenceDataVersion: "1",
}).toString();

const getGoogleAccessToken = async () => {
  const response = await axios.get("/curentUser");
  const user = response.data;
  return user.googleAccessToken;
};

export const createMeeting = async (meeting: CreateMeetingDto) => {
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
        requestId: `${meeting.description}`,
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

  if (response.ok) {
    return data;
  } else {
    console.error(`Failed to create event: ${data.error.message}`);
    return null;
  }
};

export default createMeeting;
