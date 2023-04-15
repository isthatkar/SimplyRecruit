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
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ColumnStackCenter, RowStackLeft } from "../Styles/Theme";
import createMeeting from "../Helpers/googleMeetsHelper";
import { CreateMeetingDto, Meeting, MeetingType } from "../Types/types";
import { getUTCDate } from "../Helpers/DateHelper";

type MeetingFormData = {
  title: string;
  description: string;
  finalTime: string;
  attendees: string[];
  meetingTimes: string[];
  duration: number;
  createGoogleMeet: boolean;
};

const initialMeetingFormData: MeetingFormData = {
  title: "",
  description: "",
  finalTime: "",
  attendees: [""],
  meetingTimes: [""],
  createGoogleMeet: false,
  duration: 60,
};

const AddMeeting = () => {
  const [formData, setFormData] = useState(initialMeetingFormData);
  const [selectedType, setSelectedType] = useState<MeetingType>(
    MeetingType.Schedulable
  );
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const typeChanged = (event: SelectChangeEvent<MeetingType>) => {
    setSelectedType(event.target.value as MeetingType);
  };

  const handleGoogleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    setFormData((prevState) => ({ ...prevState, createGoogleMeet: checked }));
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
      meetingUrl: "",
      schedulingUrl: "",
      meetingType: selectedType,
      duration: formData.duration,
      attendees: attendeesNew,
      meetingTimes:
        selectedType === MeetingType.Final ? [] : formData.meetingTimes,
      finalTime:
        selectedType === MeetingType.Final
          ? getUTCDate(formData.finalTime)
          : new Date(Date.UTC(2023, 1, 1)),
    };

    console.log("meeting data");
    console.log(meetingDto);
    let data = undefined;
    if (formData.createGoogleMeet) {
      data = await createMeeting(meetingDto as CreateMeetingDto);
    }

    if (data === null) {
      console.error("failed to create google calendar event");
      toast.error("Failed to create Google Calendar event!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (data !== undefined) {
      meetingDto.meetingUrl = data.htmlLink;
    }

    console.log(meetingDto);
    const response = await axios.post(
      `applications/${applicationId}/meetings`,
      meetingDto
    );

    console.log(response);
    if (response.status === 201) {
      return navigate(`/application/${applicationId}?tab=1`);
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
                <RowStackLeft spacing={3}>
                  <FormControl sx={{ width: 320 }}>
                    <InputLabel id="location-select-label">
                      Meeting type
                    </InputLabel>
                    <Select
                      labelId="field-select-label"
                      id="field-simple-select"
                      value={selectedType}
                      required
                      label="Meeting type"
                      onChange={typeChanged}
                      sx={{ mr: 3 }}
                    >
                      <MenuItem value={MeetingType.Schedulable}>
                        {"Schedulable meeting"}
                      </MenuItem>
                      <MenuItem value={MeetingType.CandidateTimeSelect}>
                        {"Candidate time select meeting"}
                      </MenuItem>
                      <MenuItem value={MeetingType.Final}>
                        {"Final meeting"}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <ColumnStackCenter>
                    <FormControlLabel
                      disabled={selectedType === MeetingType.Schedulable}
                      control={
                        <Checkbox
                          checked={formData.createGoogleMeet}
                          onChange={handleGoogleCheckboxChange}
                          name="createGoogleMeet"
                          color="primary"
                        />
                      }
                      label="Create Google Meet"
                    />
                  </ColumnStackCenter>
                </RowStackLeft>
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
                  <FormControl>
                    <InputLabel htmlFor="duration">
                      Duration (minutes)
                    </InputLabel>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      required
                      inputProps={{ min: 0 }}
                      value={formData.duration}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </Stack>
              </Grid>
              {selectedType === MeetingType.Final ? (
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
