import { Grid, Typography, Button, Box, Stack } from "@mui/material";
import React from "react";
import image from "../img/Projects/homepage.jpg";

const Home = () => {
  return (
    <Grid
      container
      component="main"
      sx={{ minHeight: "90vh", overflowX: "auto" }}
    >
      <Grid xs={false} sm={false} md={7} alignItems="bottom" sx={{ mt: 20 }}>
        <Stack alignItems="bottom">
          <img src={image}></img>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={5} justifyContent="center" container>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            sx={{
              width: "auto",
              mt: 16,
              heigt: "*",
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="h2" variant="h1">
              Recruit simply.
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 8 }}>
              Searching for a job or recruiting top talent can be a
              time-consuming and frustrating process. Our platform simplifies
              the process, making it easy for job seekers to find and apply for
              jobs and for employers to find and hire top talent. Say goodbye to
              the hassle with SimplyRecruit.
            </Typography>
            <Button sx={{ mt: 4 }} size="large" variant="outlined">
              Login
            </Button>
          </Box>

          <Box
            sx={{
              width: "auto",
              heigt: "*",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "bottom",
            }}
          ></Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Home;
