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

const Login = () => {
  return (
    <Grid
      container
      component="main"
      sx={{ minHeight: "95vh", overflowX: "auto" }}
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
      <Grid item xs={12} sm={12} md={5} container>
        <Box
          sx={{
            width: "auto",
            mt: 16,
            heigt: "*",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "top",
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: "#1a237e" }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <LoginButton></LoginButton>
        </Box>
        <Box
          sx={{
            width: "auto",
            mt: 16,
            heigt: "*",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "bottom",
          }}
        >
          <img src={personsImage}></img>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
