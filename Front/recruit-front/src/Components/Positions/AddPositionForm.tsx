import * as React from "react";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box/Box";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Field, JobLocation, WorkTime } from "../../Types/types";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CenteredContainer, ColumnStackCenter } from "../../Styles/Theme";

const AddPositionPage = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [expectations, setExpectations] = React.useState("");
  const [duties, setDuties] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [offers, setOffers] = React.useState("");
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

  const { projectid } = useParams();
  const nordFields = Object.keys(Field).filter((x) => !(parseInt(x) >= 0));
  const workTimes = Object.keys(WorkTime).filter((x) => !(parseInt(x) >= 0));
  const locations = Object.keys(JobLocation).filter((x) => !(parseInt(x) >= 0));

  const addPosition = async (): Promise<void> => {
    const positionsDto = {
      name: name,
      description: description,
      location: selectedLocation,
      workTime: selectedWorkTime,
      field: selectedField,
      salaryRange: salary,
      duties: duties,
      deadline: new Date(),
      expectations: expectations,
      offers: offers,
    };

    console.log(positionsDto);
    const response = await axios.post(
      `projects/${projectid}/positions`,
      positionsDto
    );

    console.log(response);
    if (response.status === 201) {
      return navigate(`/projects/${projectid}`);
    } else {
      toast.error("Failed to add position!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    addPosition();
    return;
  };

  return (
    <div>
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
            Add a new position
          </Typography>
          <Typography
            component="h1"
            variant="subtitle1"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            For bullet points in multiline fields separate the sentances with ;
          </Typography>
        </Container>
      </Box>
      <CenteredContainer sx={{ py: 1 }} maxWidth="sm">
        <ColumnStackCenter maxWidth="md" sx={{ pb: 6 }}>
          <Box
            component="form"
            onSubmit={handleAdd}
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "70ch",
              },
            }}
          >
            <TextField
              onChange={(e) => setName(e.target.value)}
              required
              id="outlined-name-input"
              label="Name"
              type="text"
            />

            <TextField
              onChange={(e) => setDescription(e.target.value)}
              required
              id="outlined-description-input"
              label="Description"
              multiline
              maxRows={4}
              type="text"
            />
            <TextField
              onChange={(e) => setSalary(e.target.value)}
              required
              id="outlined-salary-input"
              label="Gross salary range"
              type="text"
            />
            <TextField
              onChange={(e) => setDuties(e.target.value)}
              required
              id="outlined-duties-input"
              label="Duties"
              multiline
              rows={3}
              type="text"
            />
            <TextField
              onChange={(e) => setExpectations(e.target.value)}
              required
              id="outlined-expectations-input"
              label="Expectations"
              multiline
              rows={3}
              type="text"
            />
            <TextField
              onChange={(e) => setOffers(e.target.value)}
              required
              id="outlined-offers-input"
              label="Offers"
              multiline
              rows={3}
              type="text"
            />
            <FormControl sx={{ m: 1, width: "70ch" }}>
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

            <FormControl sx={{ m: 1, width: "70ch" }}>
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

            <FormControl sx={{ m: 1, width: "70ch" }}>
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
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 4, ml: 1 }}
            >
              Add position
            </Button>
          </Box>
        </ColumnStackCenter>
      </CenteredContainer>
    </div>
  );
};

export default AddPositionPage;
