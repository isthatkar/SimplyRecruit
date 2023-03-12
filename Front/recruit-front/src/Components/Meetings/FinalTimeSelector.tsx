import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { Meeting, MeetingTime } from "../../Types/types";
import PersonIcon from "@mui/icons-material/Person";
import GetFormatedDate from "../../Helpers/DateFormater";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FinalTimeSelectorProps {
  meeting: Meeting;
}
const FinalTimeSelector = ({ meeting }: FinalTimeSelectorProps) => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<number>(-1);

  function handleTimeClick(timeId: number) {
    console.log(timeId);
    console.log(meeting.meetingTimes);
    setSelectedTime(timeId);
  }

  const handleSaveClick = async () => {
    await saveFinalTime();
  };

  const saveFinalTime = useCallback(async () => {
    const finalTime = meeting.meetingTimes.find(
      (time) => time.id === selectedTime
    );
    console.log(finalTime);
    console.log("starttime");
    console.log(finalTime?.startTime);
    const response = await axios.put(`/meetings/${meeting.id}`, {
      isFinalTime: true,
      finalTime: finalTime?.startTime,
    });
    console.log(response);
    navigate(`/meetings/${meeting.id}`);
  }, [selectedTime]);

  return (
    <Container>
      <List>
        {meeting.meetingTimes.map((time: MeetingTime) => (
          <ListItem
            key={time.id}
            button
            selected={selectedTime === time.id}
            onClick={() => handleTimeClick(time.id)}
          >
            <ListItemText primary={GetFormatedDate(time.startTime)} />

            <Tooltip
              title={
                time.selectedAttendees.length === 0
                  ? "No attendees selected"
                  : time.selectedAttendees.split(";").join(", ")
              }
            >
              <div>
                {time.selectedAttendees.length === 0
                  ? ""
                  : time.selectedAttendees.split(";").map((attendee, index) => (
                      <React.Fragment key={attendee}>
                        <PersonIcon color="secondary" />
                      </React.Fragment>
                    ))}
              </div>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        onClick={handleSaveClick}
        disabled={selectedTime < 0}
        sx={{ my: 3 }}
      >
        Confirm meeting
      </Button>
    </Container>
  );
};

export default FinalTimeSelector;
