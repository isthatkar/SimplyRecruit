import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
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
import createMeeting from "../../Helpers/googleMeetsHelper";
import { nullLiteralTypeAnnotation } from "@babel/types";

interface FinalTimeSelectorProps {
  meeting: Meeting;
}
const FinalTimeSelector = ({ meeting }: FinalTimeSelectorProps) => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<number>(-1);
  const [sendGoogleMeetsInvite, setSendGoogleMeetsInvite] = useState(true);

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

    const tempMeeting = meeting;
    tempMeeting.isFinalTime = true;
    tempMeeting.finalTime = finalTime?.startTime as string;

    let meetingUrl = null;
    if (sendGoogleMeetsInvite) {
      meetingUrl = await createMeeting(meeting);
    }
    const response = await axios.put(`/meetings/${meeting.id}`, {
      isFinalTime: true,
      finalTime: finalTime?.startTime,
      meetingUrl: meetingUrl,
    });
    console.log(response);
    navigate(`/meetings/${meeting.id}`);
  }, [selectedTime]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSendGoogleMeetsInvite(event.target.checked);
  };

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

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={sendGoogleMeetsInvite}
              onChange={handleCheckboxChange}
              inputProps={{ "aria-label": "controlled checkbox" }}
            />
          }
          label="Create Google Meets event"
        />
      </FormGroup>
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
