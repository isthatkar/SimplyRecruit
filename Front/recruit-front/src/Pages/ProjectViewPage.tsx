import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PositionListItem from "../Components/Positions/PositionListItem";
import {
  JobLocation,
  NordProduct,
  Position,
  Project,
  WorkTime,
} from "../Types/types";

const Projects = () => {
  const [project, setProject] = useState<Project>();
  const [allPositions, setProjectsPositions] = useState<Position[]>([]);
  const [isEmployee, setIsEmployee] = useState(false);
  const { projectid } = useParams();
  const navigate = useNavigate();

  const getProjects = useCallback(async () => {
    const response = await axios.get(`projects/${projectid}`);
    const project = response.data;
    setProject(project);
  }, []);

  const getPositions = useCallback(async () => {
    const response = await axios.get(`projects/${projectid}/positions`);
    const positions = response.data;
    setProjectsPositions(positions);
  }, []);

  const handleClickAdd = () => {
    navigate("addPosition");
  };

  useEffect(() => {
    getProjects();
    getPositions();
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
            {NordProduct[project?.product as number]} {project?.name} positions
          </Typography>

          {isEmployee ? (
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {" "}
              <Button variant="contained" onClick={handleClickAdd}>
                Add new position
              </Button>
            </Stack>
          ) : (
            ""
          )}
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Container>
      </Box>
      <Container sx={{ py: 1, mb: 8 }} maxWidth="md">
        <Stack direction="column" justifyContent="center" alignItems="center">
          {allPositions.map((position) => (
            <PositionListItem
              key={position.id}
              isOpen={position.isOpen}
              id={position.id}
              positionName={position.name}
              location={JobLocation[position.location]}
              time={WorkTime[position.workTime]}
            ></PositionListItem>
          ))}
        </Stack>
      </Container>
    </div>
  );
};

export default Projects;
