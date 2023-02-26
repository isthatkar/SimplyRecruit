import React from "react";
import { Chip } from "@mui/material";

interface AttendeeListProps {
  attendees: string[];
}

const AttendeeList: React.FC<AttendeeListProps> = ({ attendees }) => {
  return (
    <div>
      {attendees.map((attendee, index) => (
        <Chip
          key={index}
          label={attendee}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        />
      ))}
    </div>
  );
};

export default AttendeeList;
