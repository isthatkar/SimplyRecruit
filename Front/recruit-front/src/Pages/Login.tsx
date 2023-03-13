import React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import image from "../img/Projects/project9.png";
import LoginButton from "../Components/Auth/LoginButton";
import personsImage from "../img/Projects/persons.png";
import { Stack } from "@mui/material";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();

  console.log(location);
  return (
    <Grid
      container
      component="main"
      sx={{ minHeight: "90vh", overflowX: "auto" }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={12} md={5} justifyContent="center" container>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            sx={{
              width: "auto",
              mt: 20,
              heigt: "*",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 2,
                backgroundColor: "#7986cb",
                height: "50px",
                width: "50px",
              }}
            >
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h3">
              SIGN IN
            </Typography>
            <LoginButton></LoginButton>
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
          >
            <img height="250px" src={personsImage}></img>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Login;
