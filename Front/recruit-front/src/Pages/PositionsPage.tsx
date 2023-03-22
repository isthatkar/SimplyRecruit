import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import PositionListItem from "../Components/Positions/PositionListItem";
import { Theme } from "../Styles/Theme";
import { Field, JobLocation, Position, WorkTime } from "../Types/types";

const Positions = () => {
  const [locationFilter, setLocationFilter] = useState<JobLocation>(
    JobLocation.All
  );
  const [fieldFilter, setFieldFilter] = useState<Field>(Field.All);

  const handleLocationFilterChange = (
    event: SelectChangeEvent<JobLocation | "">
  ) => {
    setLocationFilter(event.target.value as JobLocation);
  };

  const handleFieldFilterChange = (event: SelectChangeEvent<Field>) => {
    setFieldFilter(event.target.value as Field);
  };

  const [allPositions, setAllPositions] = useState<Position[]>([]);
  const getPositions = useCallback(async () => {
    const response = await axios.get("positions");
    console.log(response.data);
    const positions = response.data;
    const openPositions = (positions as Position[]).filter(
      (position) => position.isOpen
    );
    setAllPositions(openPositions);
  }, []);

  const filteredPositions = allPositions.filter((position) => {
    if (
      locationFilter !== JobLocation.All &&
      position.location !== locationFilter
    ) {
      return false;
    }
    if (fieldFilter !== Field.All && position.field !== fieldFilter) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    getPositions();
  }, []);
  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
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
            All open positions
          </Typography>
        </Container>
      </Box>
      <Container>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid container spacing={2} alignItems="center" sx={{ ml: 2 }}>
            <Grid item>
              <FormControl sx={{ width: 200 }}>
                <InputLabel id="location-select-label">Location</InputLabel>

                <Select
                  value={locationFilter}
                  label={"Location"}
                  onChange={handleLocationFilterChange}
                >
                  <MenuItem value={JobLocation.All}>All Locations</MenuItem>

                  <MenuItem value={JobLocation.Kaunas}>Kaunas</MenuItem>
                  <MenuItem value={JobLocation.Vilnius}>Vilnius</MenuItem>
                  <MenuItem value={JobLocation.Berlin}>Berlin</MenuItem>
                  <MenuItem value={JobLocation.Warsaw}>Warsaw</MenuItem>
                  <MenuItem value={JobLocation.WashingtonDC}>
                    Washington DC
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl sx={{ width: 200 }}>
                <InputLabel id="location-select-label">Field</InputLabel>
                <Select
                  value={fieldFilter}
                  label={"Field"}
                  onChange={handleFieldFilterChange}
                >
                  <MenuItem value={Field.All}>All Fields</MenuItem>
                  <MenuItem value={Field.Administration}>
                    Administration
                  </MenuItem>
                  <MenuItem value={Field.Architecture}>Architecture</MenuItem>
                  <MenuItem value={Field.Backend}>Backend</MenuItem>
                  <MenuItem value={Field.Bussiness}>Bussiness</MenuItem>
                  <MenuItem value={Field.Communications}>
                    Communications
                  </MenuItem>
                  <MenuItem value={Field.Data}>Data Analytics</MenuItem>
                  <MenuItem value={Field.Design}>Product Design</MenuItem>
                  <MenuItem value={Field.DesktopApps}>
                    Desktop applications
                  </MenuItem>
                  <MenuItem value={Field.Finance}>Finance</MenuItem>
                  <MenuItem value={Field.Frontend}>Front-end</MenuItem>
                  <MenuItem value={Field.HR}>Human Resources</MenuItem>
                  <MenuItem value={Field.Infrastructure}>
                    Infrastructure
                  </MenuItem>
                  <MenuItem value={Field.Leadership}>Tech Leadership</MenuItem>
                  <MenuItem value={Field.Legal}>Legal</MenuItem>
                  <MenuItem value={Field.Marketing}>Marketing</MenuItem>
                  <MenuItem value={Field.Mobile}>Mobile apps</MenuItem>
                  <MenuItem value={Field.Payments}>Payments</MenuItem>
                  <MenuItem value={Field.QA}>Quality Assurance</MenuItem>
                  <MenuItem value={Field.Risk}>Risk Management</MenuItem>
                  <MenuItem value={Field.Sales}>Sales</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {filteredPositions.map((position) => (
            <PositionListItem
              key={position.id}
              id={position.id}
              positionName={position.name}
              location={JobLocation[position.location]}
              time={WorkTime[position.workTime]}
            ></PositionListItem>
          ))}
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Positions;
