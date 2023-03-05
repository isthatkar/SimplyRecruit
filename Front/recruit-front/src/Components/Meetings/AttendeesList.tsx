import React from "react";
import { Chip } from "@mui/material";
import { RowStackCenter } from "../../Styles/Theme";

interface AttendeeListProps {
  attendees: string;
}

const AttendeeList: React.FC<AttendeeListProps> = ({ attendees }) => {
  const attendeesArray = attendees.split(";");
  return (
    <RowStackCenter>
      {attendeesArray.map((attendee, index) => (
        <Chip
          key={index}
          label={attendee}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        />
      ))}
    </RowStackCenter>
  );
};

export default AttendeeList;
