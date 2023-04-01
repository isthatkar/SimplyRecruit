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
    console.log("meetings conflict?");
    console.log(meeting);
    const meetingStartTime = new Date(meeting.finalTime);
    const meetingEndTime = new Date(
      meetingStartTime.getTime() + meeting.duration * 60000
    );

    console.log(meetingStartTime);
    console.log(meetingEndTime);
    console.log(meetingTimeEnd);
    console.log(meetingTimeStart);
    if (
      meetingStartTime <= meetingTimeEnd &&
      meetingEndTime >= meetingTimeStart
    ) {
      conflictedMeetings.push(meeting);
    }
  }

  return conflictedMeetings;
}
