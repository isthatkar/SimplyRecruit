import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

type MeetingFormData = {
  title: string;
  description: string;
  finalTime: string;
  isFinalTime: boolean;
  attendees: string[];
  meetingTimes: string[];
  duration: number;
};

const initialMeetingFormData: MeetingFormData = {
  title: "",
  description: "",
  finalTime: "",
  isFinalTime: false,
  attendees: [""],
  meetingTimes: [""],
  duration: 60,
};

const AddMeeting = () => {
  const [formData, setFormData] = useState(initialMeetingFormData);
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormData((prevState) => ({ ...prevState, isFinalTime: checked }));
  };

  const handleMeetingTimeChange = (event: any, index: number) => {
    const { value } = event.target;
    setFormData((prevState) => {
      const newMeetingTimes = [...prevState.meetingTimes];
      newMeetingTimes[index] = value;
      return { ...prevState, meetingTimes: newMeetingTimes };
    });
  };

  const [attendees, setAttendees] = useState<string[]>([]);

  const handleAttendeeEmailChange = (event: any, index: number) => {
    const newAttendees = [...attendees];
    newAttendees[index] = event.target.value;
    setAttendees(newAttendees);
  };

  const handleAddAttendee = () => {
    setAttendees((prevAttendees) => [...prevAttendees, ""]);
  };

  useEffect(() => {
    console.log(window.history.state);
    setAttendees([window.history.state.usr?.prop]);
  }, []);

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

  const handleRemoveMeetingTime = (index: number) => {
    setFormData((prevState) => {
      const newMeetingTimes = [...prevState.meetingTimes];
      newMeetingTimes.splice(index, 1);
      return { ...prevState, meetingTimes: newMeetingTimes };
    });
  };

  const addMeeting = async (): Promise<void> => {
    const userEmail = localStorage.getItem("email");
    let attendeesNew = "";
    if (attendees.length > 1) {
      attendeesNew = attendees.join(";");
    } else {
      attendeesNew = attendees[0];
    }
    if (userEmail) {
      attendeesNew = attendeesNew + ";" + userEmail;
    }

    const meetingDto = {
      title: formData.title,
      description: formData.description,
      meetingUrl: "https://google.com", //TODO WITH GOOGLE MEETS INTEGRATION
      schedulingUrl: "https://google.com", //TODO
      isFinal: formData.isFinalTime,
      durationMinutes: formData.duration,
      atendees: attendeesNew,
      meetingTimes: formData.isFinalTime
        ? null
        : {
            times: formData.meetingTimes,
          },
      finalTime: formData.isFinalTime
        ? new Date(formData.finalTime)
        : new Date(),
    };

    console.log(meetingDto);
    const response = await axios.post(
      `applications/${applicationId}/meetings`,
      meetingDto
    );

    console.log(response);
    if (response.status === 201) {
      return navigate(`/application/${applicationId}`);
    } else {
      toast.error("Failed to add meeting!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addMeeting();
    console.log(formData);
  };
  return (
    <div>
      <ToastContainer />

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 2,
          mb: 8,
        }}
      >
        <Container sx={{ py: 1 }} maxWidth="md">
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Schedule a Meeting
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                  rows={4}
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
                    Add Attendee
                  </Button>
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isFinalTime}
                        onChange={handleCheckboxChange}
                        name="isFinalTime"
                        color="primary"
                      />
                    }
                    label="Is the meeting time final?"
                  />
                  <FormControl>
                    <InputLabel htmlFor="duration">
                      Duration (minutes)
                    </InputLabel>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      inputProps={{ min: 0 }}
                      value={formData.duration}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Stack>
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
                        {index > 0 && (
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() => handleRemoveMeetingTime(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Stack>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      variant="text"
                      startIcon={<AddIcon />}
                      onClick={handleAddMeetingTime}
                    >
                      Add Meeting Time
                    </Button>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Create Meeting
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default AddMeeting;
