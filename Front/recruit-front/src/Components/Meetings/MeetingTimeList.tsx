import React, { useState } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Tooltip,
} from "@mui/material";
import { MeetingTime } from "../../Types/types";

interface MeetingsListProps {
  meetingTimes: MeetingTime[];
  onSave: (selectedTimes: MeetingTime[]) => void;
}

const MeetingsList: React.FC<MeetingsListProps> = ({
  meetingTimes,
  onSave,
}) => {
  const [selectedTimes, setSelectedTimes] = useState<MeetingTime[]>([]);

  const handleToggle = (time: MeetingTime) => () => {
    const currentIndex = selectedTimes.findIndex(
      (selectedTime) => selectedTime.id === time.id
    );
    const newSelectedTimes = [...selectedTimes];

    if (currentIndex === -1) {
      newSelectedTimes.push(time);
    } else {
      newSelectedTimes.splice(currentIndex, 1);
    }

    setSelectedTimes(newSelectedTimes);
  };

  const handleSave = () => {
    onSave(selectedTimes);
  };

  const renderAttendeesTooltip = (attendees: string) => (
    <Tooltip title={<span>{attendees.split(";").join(", ")}</span>}>
      <span>{attendees.split(";").length}</span>
    </Tooltip>
  );

  return (
    <>
      <List>
        {meetingTimes.map((meetingTime) => {
          const labelId = `checkbox-list-label-${meetingTime.startTime}`;
          return (
            <ListItem
              key={meetingTime.id}
              role={undefined}
              dense
              onClick={handleToggle(meetingTime)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={
                    selectedTimes.findIndex(
                      (selectedTime) =>
                        selectedTime.startTime === meetingTime.startTime
                    ) !== -1
                  }
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={meetingTime.startTime}
                secondary={renderAttendeesTooltip(
                  meetingTime.selectedAttendees
                )}
              />
            </ListItem>
          );
        })}
      </List>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </>
  );
};

export default MeetingsList;
