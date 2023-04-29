import { Meeting, MeetingTime } from "../Types/types";

export function GetFormatedDate(dateString: string) {
  const date = new Date(dateString);
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    date.getDay()
  ];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()];
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const formattedDate = `${month} ${date.getDate()}, ${weekday}, ${hour}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${ampm}`;
  return formattedDate;
}

export function findTimeConflictingMeetings(
  meetingTime: MeetingTime,
  meetingDuration: number,
  meetings: Meeting[]
): Meeting[] {
  const conflictedMeetings: Meeting[] = [];
  const meetingTimeStart = new Date(meetingTime.startTime);
  const meetingTimeEnd = new Date(
    new Date(meetingTime.startTime).getTime() + meetingDuration * 60000
  );

  for (const meeting of meetings) {
    const meetingStartTime = new Date(meeting.finalTime);
    const meetingEndTime = new Date(
      meetingStartTime.getTime() + meeting.duration * 60000
    );
    if (
      meetingStartTime <= meetingTimeEnd &&
      meetingEndTime >= meetingTimeStart
    ) {
      conflictedMeetings.push(meeting);
    }
  }

  return conflictedMeetings;
}

export const getUTCDate = (ISOdateString: string): Date => {
  return new Date(
    Date.UTC(
      parseInt(ISOdateString.substr(0, 4)), // Year
      parseInt(ISOdateString.substr(5, 2)) - 1, // Month (zero-based)
      parseInt(ISOdateString.substr(8, 2)), // Day
      parseInt(ISOdateString.substr(11, 2)), // Hour
      parseInt(ISOdateString.substr(14, 2)) // Minute
    )
  );
};
