import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Meeting } from "../../Types/types";
import { ColumnStackStrech } from "../../Styles/Theme";
import { toast } from "react-toastify";
import { GetFormatedDate } from "../../Helpers/DateHelper";

interface EditMeetingDialogProps {
  meeting: Meeting;
}

type MeetingFormData = {
  title: string;
  description: string;
  finalTime: Date;
  isFinalTime: boolean;
  attendees: string[];
  meetingTimes: string[];
  duration: number;
};

const EditMeetingDialog = ({ meeting }: EditMeetingDialogProps) => {
  const initialMeetingFormData: MeetingFormData = {
    title: meeting.title,
    description: meeting.description,
    finalTime: meeting.finalTime,
    isFinalTime: meeting.isFinalTime,
    attendees: meeting.attendees.split(";"),
    meetingTimes: [],
    duration: meeting.duration,
  };
  const [attendees, setAttendees] = useState<string[]>(
    meeting.attendees.split(";")
  );
  const [formData, setFormData] = useState(initialMeetingFormData);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    setOpen(false);
    const meetingDto = {
      title: formData.title,
      description: formData.description,
      finalTime: formData.finalTime,
      attendees: formData.attendees.join(";"),
      duration: formData.duration,
      newMeetingTimes: meeting.isFinalTime ? null : formData.meetingTimes,
    };

    const response = await axios.put(`meetings/${meeting.id}`, meetingDto);

    console.log(response);
    if (response.status !== 200) {
      toast.error("Failed to edit meeting!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    console.log(formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAttendeeEmailChange = (event: any, index: number) => {
    const newAttendees = [...attendees];
    newAttendees[index] = event.target.value;
    setAttendees(newAttendees);
  };

  const handleAddAttendee = () => {
    setAttendees((prevAttendees) => [...prevAttendees, ""]);
  };

  const handleRemoveAttendee = (index: number) => {
    setAttendees((prevAttendees) =>
      prevAttendees.filter((_, i) => i !== index)
    );
  };

  const handleAddMeetingTime = () => {
    setFormData((prevState) => ({
      ...prevState,
      meetingTimes: [...prevState.meetingTimes, ""],
    }));
  };

  const handleMeetingTimeChange = (event: any, index: number) => {
    const { value } = event.target;
    setFormData((prevState) => {
      const newMeetingTimes = [...prevState.meetingTimes];
      newMeetingTimes[index] = value;
      return { ...prevState, meetingTimes: newMeetingTimes };
    });
  };

  const handleRemoveMeetingTime = (index: number) => {
    setFormData((prevState) => {
      const newMeetingTimes = [...prevState.meetingTimes];
      newMeetingTimes.splice(index, 1);
      return { ...prevState, meetingTimes: newMeetingTimes };
    });
  };

  return (
    <div>
      <Tooltip title="Edit">
        <IconButton color="secondary" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box component="form" onSubmit={handleSubmit} width="800px">
          <DialogTitle id="alert-dialog-title">
            {"Edit the meetings information"}
          </DialogTitle>
          <DialogContent>
            <ColumnStackStrech spacing={2} sx={{ mt: 2, px: 2 }}>
              <Grid>
                <TextField
                  name="title"
                  label="Meeting Title"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Meeting Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  maxRows={5}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  {attendees.map((attendee, index) => (
                    <Box display="flex" alignItems="center" key={index}>
                      <TextField
                        fullWidth
                        required
                        label={`Attendee ${index + 1} Email`}
                        value={attendee}
                        onChange={(event) =>
                          handleAttendeeEmailChange(event, index)
                        }
                        sx={{ my: 1 }}
                      />
                      {index > 0 && (
                        <IconButton
                          onClick={() => handleRemoveAttendee(index)}
                          sx={{ ml: 2 }}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      )}
                    </Box>
                  ))}

                  <Button
                    variant="text"
                    startIcon={<AddIcon />}
                    onClick={handleAddAttendee}
                  >
                    Add attendee
                  </Button>
                </Box>
                <FormControl>
                  <InputLabel htmlFor="duration">
                    Duration (minutes) *
                  </InputLabel>
                  <Input
                    id="duration"
                    required
                    name="duration"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
              {formData.isFinalTime ? (
                <Grid item xs={12}>
                  <TextField
                    name="finalTime"
                    label="Meeting Time"
                    type="datetime-local"
                    variant="outlined"
                    fullWidth
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={formData.finalTime}
                    onChange={handleInputChange}
                  />
                </Grid>
              ) : (
                <>
                  <Typography variant="subtitle2">Meeting times:</Typography>
                  {meeting.meetingTimes.map((meetingTime, index) => (
                    <Grid item xs={12} key={meetingTime.id}>
                      <Stack direction="row" spacing={2}>
                        <Typography align="right">
                          {GetFormatedDate(
                            meeting.meetingTimes[index].startTime
                          )}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                  {formData.meetingTimes.map((meetingTime, index) => (
                    <Grid item xs={12} key={meetingTime}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <TextField
                          name="finalTime"
                          label="Meeting Time"
                          type="datetime-local"
                          variant="outlined"
                          fullWidth
                          required
                          value={formData.meetingTimes[index]}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(event) =>
                            handleMeetingTimeChange(event, index)
                          }
                        />
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleRemoveMeetingTime(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      variant="text"
                      startIcon={<AddIcon />}
                      onClick={handleAddMeetingTime}
                    >
                      Add neeting time
                    </Button>
                  </Grid>
                </>
              )}
            </ColumnStackStrech>
          </DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained" sx={{ mr: 3, mb: 3 }}>
              Save changes
            </Button>{" "}
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default EditMeetingDialog;
