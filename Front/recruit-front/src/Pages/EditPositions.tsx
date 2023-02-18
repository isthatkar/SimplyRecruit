import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Box from "@mui/material/Box/Box";
import dayjs, { Dayjs } from "dayjs";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Theme from "../Styles/Theme";
import { Field, JobLocation, Position, WorkTime } from "../Types/types";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";

const EditPositions = (props: any) => {
  const navigate = useNavigate();

  const [position, setPosition] = React.useState<Position>();
  const [name, setName] = React.useState("");
  const [expectations, setExpectations] = React.useState("");
  const [duties, setDuties] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [offers, setOffers] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(true);
  const [deadline, setDeadline] = React.useState<Dayjs | null>(
    dayjs("2023-08-18T21:11:54")
  );
  const [selectedWorkTime, setSelectedWorkTime] = React.useState("0");
  const [selectedLocation, setSelectedLocation] = React.useState("0");
  const [selectedField, setSelectedField] = React.useState("0");

  const worktimeChanged = (event: SelectChangeEvent) => {
    setSelectedWorkTime(event.target.value as string);
  };

  const locationChanged = (event: SelectChangeEvent) => {
    setSelectedLocation(event.target.value as string);
  };

  const fieldChanged = (event: SelectChangeEvent) => {
    setSelectedField(event.target.value as string);
  };

  const deadlineChanged = (newValue: Dayjs | null) => {
    setDeadline(newValue);
  };

  const { positionId } = useParams();
  const nordFields = Object.keys(Field).filter((x) => !(parseInt(x) >= 0));
  const workTimes = Object.keys(WorkTime).filter((x) => !(parseInt(x) >= 0));
  const locations = Object.keys(JobLocation).filter((x) => !(parseInt(x) >= 0));

  const editPosition = async (): Promise<void> => {
    const positionsDto = {
      name: name,
      description: description,
      deadLine: deadline?.format(),
      location: selectedLocation,
      workTime: selectedWorkTime,
      field: selectedField,
      salaryRange: salary,
      duties: duties,
      isOpen: isOpen,
      expectations: expectations,
      offers: offers,
    };

    const response = await axios.put(`positions/${positionId}`, positionsDto);
    if (response.status === 200) {
      return navigate(`/positions/${positionId}`);
    } else {
      toast.error("Failed to edit position !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const getPosition = useCallback(async () => {
    const response = await axios.get(`positions/${positionId}`);
    const position = response.data;
    console.log(position);
    setPosition(position);
    setName(position.name);
    setDescription(position.description);
    setDuties(position.duties);
    setIsOpen(position.isOpen);
    setSalary(position.salaryRange);
    setExpectations(position.expectations);
    setOffers(position.offers);
    setDeadline(position.deadline);
    setSelectedWorkTime(position.workTime);
    setSelectedLocation(position.location);
    setSelectedField(position.field);
  }, []);

  useEffect(() => {
    getPosition();

    const roles = localStorage.getItem("roles");
  }, []);
  const handleSave = () => {
    editPosition();
    return;
  };

  return (
    <ThemeProvider theme={Theme}>
      <ToastContainer />

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 2,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Edit {position?.name} position
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 1 }} maxWidth="md">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          maxWidth="md"
          sx={{ pb: 6 }}
        >
          <Box
            component="form"
            autoComplete="off"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "50ch",
              },
            }}
          >
            <FormGroup sx={{ mx: 2, mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isOpen}
                    onChange={(e) => setIsOpen(e.target.checked)}
                  />
                }
                label="Is open"
              />
            </FormGroup>
            <div>
              <TextField
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                id="outlined-name-input"
                label="Name"
                type="text"
              />
            </div>

            <div>
              <TextField
                onChange={(e) => setDescription(e.target.value)}
                required
                value={description}
                id="outlined-description-input"
                label="Description"
                multiline
                maxRows={4}
                type="text"
              />
            </div>
            <div>
              <TextField
                onChange={(e) => setSalary(e.target.value)}
                required
                value={salary}
                id="outlined-salary-input"
                label="Gross salary range"
                type="text"
              />
            </div>
            <div>
              <TextField
                onChange={(e) => setDuties(e.target.value)}
                required
                value={duties}
                id="outlined-duties-input"
                label="Duties"
                multiline
                maxRows={4}
                type="text"
              />
            </div>
            <div>
              <TextField
                onChange={(e) => setExpectations(e.target.value)}
                required
                value={expectations}
                id="outlined-expectations-input"
                label="Expectations"
                multiline
                maxRows={4}
                type="text"
              />
            </div>
            <div>
              <TextField
                onChange={(e) => setOffers(e.target.value)}
                required
                value={offers}
                id="outlined-offers-input"
                label="Offers"
                multiline
                maxRows={4}
                type="text"
              />
            </div>
            <div>
              <FormControl sx={{ m: 1, width: "50ch" }}>
                <InputLabel id="field-select-label">Field *</InputLabel>
                <Select
                  labelId="field-select-label"
                  id="field-simple-select"
                  value={selectedField}
                  required
                  label="Field"
                  onChange={fieldChanged}
                >
                  {nordFields.map((field) => (
                    <MenuItem
                      key={field}
                      value={Object.values(Field).indexOf(field)}
                    >
                      {field}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: 1, width: "50ch" }}>
                <InputLabel id="location-select-label">Location *</InputLabel>
                <Select
                  labelId="location-select-label"
                  id="location-simple-select"
                  value={selectedLocation}
                  required
                  label="Location"
                  onChange={locationChanged}
                >
                  {locations.map((location) => (
                    <MenuItem
                      key={location}
                      value={Object.values(JobLocation).indexOf(location)}
                    >
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: 1, width: "50ch" }}>
                <InputLabel id="worktime-select-label">Work time *</InputLabel>
                <Select
                  labelId="worktime-select-label"
                  id="worktime-select"
                  value={selectedWorkTime}
                  required
                  label="Work time"
                  onChange={worktimeChanged}
                >
                  {workTimes.map((time) => (
                    <MenuItem
                      key={time}
                      value={Object.values(WorkTime).indexOf(time)}
                    >
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Deadline"
                value={deadline}
                onChange={deadlineChanged}
                inputFormat="MM/DD/YYYY"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ mt: 3, mb: 4 }}
          >
            Save changes
          </Button>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default EditPositions;
