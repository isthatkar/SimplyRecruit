import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import PositionListItem from "../Components/Positions/PositionListItem";
import { ColumnStackCenter, RowStackCenter, Theme } from "../Styles/Theme";
import { Field, JobLocation, Position, WorkTime } from "../Types/types";
import SearchBar from "../Components/SearchBar";

const Positions = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [numPages, setNumPages] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [endIndex, setEndIndex] = useState(6);
  const [currentPageItems, setCurrentPageItems] = useState<Position[]>([]);
  const [filteredPositions, setFilteredPositions] = useState<Position[]>([]);
  const [locationFilter, setLocationFilter] = useState<JobLocation>(
    JobLocation.All
  );
  const [fieldFilter, setFieldFilter] = useState<Field>(Field.All);

  const handleLocationFilterChange = (
    event: SelectChangeEvent<JobLocation | "">
  ) => {
    setLocationFilter(event.target.value as JobLocation);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    return;
  };

  const handleFieldFilterChange = (event: SelectChangeEvent<Field>) => {
    setFieldFilter(event.target.value as Field);
  };

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setStartIndex((value - 1) * itemsPerPage);
    setEndIndex(value * itemsPerPage);
    setPage(value);
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
    const filtered = filterPositions(openPositions);
    setNumPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPageItems(filtered.slice(startIndex, endIndex));
    setFilteredPositions(filtered);
  }, []);

  const filterPositions = (positions: Position[]): Position[] => {
    return positions.filter((position) => {
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
  };

  useEffect(() => {
    setNumPages(Math.ceil(filteredPositions.length / itemsPerPage));
    setCurrentPageItems(filteredPositions.slice(startIndex, endIndex));
  }, [page]);

  useEffect(() => {
    let filtered = filterPositions(allPositions);
    if (searchValue !== "") {
      filtered = filtered.filter(
        ({ name, description }) =>
          name.toLowerCase().includes(searchValue.toLowerCase()) ||
          description.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    setStartIndex(0);
    setEndIndex(6);
    setFilteredPositions(filtered);
    setCurrentPageItems(filtered.slice(0, 6));
    setNumPages(Math.ceil(filtered.length / itemsPerPage));
    setPage(1);
  }, [locationFilter, fieldFilter, searchValue]);

  useEffect(() => {
    getPositions();
  }, []);
  return (
    <>
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
        <ColumnStackCenter spacing={1} sx={{ mb: 12 }}>
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
            <Stack sx={{ mt: 2 }}>
              <SearchBar
                value={searchValue}
                onChange={handleSearchChange}
              ></SearchBar>
            </Stack>
          </Grid>
          <RowStackCenter>
            <Pagination
              count={numPages}
              page={page}
              onChange={handlePageChange}
            />
          </RowStackCenter>
          {currentPageItems.map((position) => (
            <PositionListItem
              key={position.id}
              id={position.id}
              isOpen={position.isOpen}
              positionName={position.name}
              location={JobLocation[position.location]}
              time={WorkTime[position.workTime]}
            ></PositionListItem>
          ))}
        </ColumnStackCenter>
      </Container>
    </>
  );
};

export default Positions;
