import { ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import AddProjectDialog from "../Components/Projects/AddProjectDialog";
import EditProjectDialog from "../Components/Projects/EditProjectDialog";
import projectImages from "../img/Projects/projectImages";
import Theme from "../Styles/Theme";
import { NordProduct, Project } from "../Types/types";

const Projects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isEmployee, setIsEmployee] = useState(false);

  function GetImage() {
    const randomImage =
      projectImages[Math.floor(Math.random() * projectImages.length)];
    return randomImage;
  }

  const getProjects = useCallback(async () => {
    const response = await axios.get("projects");
    const projects = response.data;
    projects.forEach((project: Project) => (project.image = GetImage()));
    setAllProjects(projects);
  }, []);

  useEffect(() => {
    getProjects();
    const roles = localStorage.getItem("roles");
    const isEmployee = roles?.includes("Employee");
    setIsEmployee(isEmployee ? isEmployee : false);
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
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {allProjects.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    pt: "5%",
                  }}
                  image={card.image}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h1">
                    {NordProduct[card.product]}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.name}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  {isEmployee ? (
                    <EditProjectDialog projectId={card.id}></EditProjectDialog>
                  ) : (
                    ""
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Projects;
