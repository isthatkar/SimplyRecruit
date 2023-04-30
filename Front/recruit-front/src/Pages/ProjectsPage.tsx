import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import AddProjectDialog from "../Components/Projects/AddProjectDialog";
import ProjectListItem from "../Components/Projects/ProjectListItem";
import {
  ColumnStackStrech,
  RowStackCenter,
  RowStackItemsBetween,
  RowStackLeft,
} from "../Styles/Theme";
import { NordProduct, Project } from "../Types/types";
import SearchBar from "../Components/SearchBar";
import Loader from "../Components/Loading/Loader";

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isEmployee, setIsEmployee] = useState(false);
  const [productFilter, setProductFilter] = useState<NordProduct>(
    NordProduct.All
  );
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const itemsPerPage = 8;
  const [numPages, setNumPages] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);
  const [currentPageItems, setCurrentPageItems] = useState<Project[]>([]);

  const getProjects = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get("projects");
    const projects = response.data;
    setAllProjects(projects);
    const filtered = filterProjects(projects);
    setNumPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPageItems(filtered.slice(startIndex, endIndex));
    setFilteredProjects(filtered);
    setIsLoading(false);
  }, []);

  const handleProductFilterChange = (
    event: SelectChangeEvent<NordProduct | "">
  ) => {
    setProductFilter(event.target.value as NordProduct);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    return;
  };

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setStartIndex((value - 1) * itemsPerPage);
    setEndIndex(value * itemsPerPage);
    setPage(value);
  };

  const filterProjects = (projects: Project[]): Project[] => {
    return projects.filter((project) => {
      if (
        productFilter !== NordProduct.All &&
        project.product !== productFilter
      ) {
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    setNumPages(Math.ceil(filteredProjects.length / itemsPerPage));
    setCurrentPageItems(filteredProjects.slice(startIndex, endIndex));
  }, [page]);

  useEffect(() => {
    let filtered = filterProjects(allProjects);
    if (searchValue !== "") {
      filtered = filtered.filter(
        ({ name, description }) =>
          name.toLowerCase().includes(searchValue.toLowerCase()) ||
          description.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    setStartIndex(0);
    setEndIndex(8);
    setFilteredProjects(filtered);
    setCurrentPageItems(filtered.slice(0, 8));
    setNumPages(Math.ceil(filtered.length / itemsPerPage));
    setPage(1);
  }, [productFilter, searchValue]);

  useEffect(() => {
    getProjects();
    const roles = localStorage.getItem("roles");
    const isEmployee = roles?.includes("Employee");
    setIsEmployee(isEmployee ? isEmployee : false);
  }, []);
  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 4,
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
            Recruiting projects
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Here you can gain a deeper understanding of the company&apos;s
            recruiting project portfolio.
          </Typography>
        </Container>
      </Box>
      <Container sx={{ mb: 8 }}>
        <RowStackItemsBetween sx={{ mb: 3 }}>
          <RowStackLeft>
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="location-select-label">Product</InputLabel>

              <Select
                value={productFilter}
                label={"Product"}
                onChange={handleProductFilterChange}
              >
                <MenuItem value={NordProduct.All}>All products</MenuItem>

                <MenuItem value={NordProduct.NordPass}>NordPass</MenuItem>
                <MenuItem value={NordProduct.NordVPN}>NordVPN</MenuItem>
                <MenuItem value={NordProduct.NordLocker}>NordLocker</MenuItem>
                <MenuItem value={NordProduct.NordLayer}>NordLayer</MenuItem>
                <MenuItem value={NordProduct.NordSecurity}>
                  Nord Security
                </MenuItem>
              </Select>
            </FormControl>
            <SearchBar
              value={searchValue}
              onChange={handleSearchChange}
            ></SearchBar>
          </RowStackLeft>

          {isEmployee ? <AddProjectDialog></AddProjectDialog> : ""}
        </RowStackItemsBetween>

        {isLoading ? (
          <Loader></Loader>
        ) : (
          <ColumnStackStrech alignItems="strech">
            <RowStackCenter>
              <Pagination
                count={numPages}
                page={page}
                onChange={handlePageChange}
              />
            </RowStackCenter>

            {currentPageItems.map((pr) => (
              <div key={pr.id}>
                <ProjectListItem project={pr} key={pr.id}></ProjectListItem>
              </div>
            ))}
          </ColumnStackStrech>
        )}
      </Container>
    </div>
  );
};

export default Projects;
