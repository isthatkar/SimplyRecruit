import React from "react";
import { Chip, Stack } from "@mui/material";

interface AttendeeListProps {
  attendees: string[];
}

const AttendeeList: React.FC<AttendeeListProps> = ({ attendees }) => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="flex-start">
      {attendees.map((attendee, index) => (
        <Chip
          key={index}
          label={attendee}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        />
      ))}
    </Stack>
  );
};

export default AttendeeList;
