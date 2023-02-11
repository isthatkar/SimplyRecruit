import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert/Alert";
import image from "../img/login-image.png";
import LoginButton from "../Components/Auth/LoginButton";

const Login = () => {
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  return (
    <Grid container component="main" sx={{ height: "95vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <LoginButton></LoginButton>
          </Box>
          {failed ? (
            <Alert severity="error">
              Failed to login. Please check crediantials and try again.
            </Alert>
          ) : (
            ""
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
