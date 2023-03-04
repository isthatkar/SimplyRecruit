import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import AddProjectDialog from "../Components/Projects/AddProjectDialog";
import ProjectListItem from "../Components/Projects/ProjectListItem";
import { ColumnStackStrech } from "../Styles/Theme";
import { Project } from "../Types/types";

const Projects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isEmployee, setIsEmployee] = useState(false);

  const getProjects = useCallback(async () => {
    const response = await axios.get("projects");
    const projects = response.data;
    setAllProjects(projects);
  }, []);

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
      <Container>
        <ColumnStackStrech spacing={3} alignItems="strech">
          {allProjects.map((pr) => (
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
