import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import AddProjectDialog from "../Components/Projects/AddProjectDialog";
import ProjectListItem from "../Components/Projects/ProjectListItem";
import { ColumnStackStrech } from "../Styles/Theme";
import { NordProduct, Project } from "../Types/types";

const Projects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isEmployee, setIsEmployee] = useState(false);
  const [productFilter, setProductFilter] = useState<NordProduct>(
    NordProduct.All
  );

  const getProjects = useCallback(async () => {
    const response = await axios.get("projects");
    const projects = response.data;
    setAllProjects(projects);
  }, []);
  const handleProductFilterChange = (
    event: SelectChangeEvent<NordProduct | "">
  ) => {
    setProductFilter(event.target.value as NordProduct);
  };

  const filteredProjects = allProjects.filter((project) => {
    if (
      productFilter !== NordProduct.All &&
      project.product !== productFilter
    ) {
      return false;
    }
    return true;
  });
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
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            {isEmployee ? <AddProjectDialog></AddProjectDialog> : ""}
          </Stack>
        </Container>
      </Box>
      <Container sx={{ mb: 8 }}>
        <FormControl sx={{ width: 200, mb: 1 }}>
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
            <MenuItem value={NordProduct.NordSecurity}>Nord Security</MenuItem>
          </Select>
        </FormControl>
        <ColumnStackStrech alignItems="strech">
          {filteredProjects.map((pr) => (
            <div key={pr.id}>
              <ProjectListItem project={pr} key={pr.id}></ProjectListItem>
            </div>
          ))}
        </ColumnStackStrech>
      </Container>
    </div>
  );
};

export default Projects;
