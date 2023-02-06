import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert/Alert";
import image from "../img/login-image.png";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("https://localhost:7054/api/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userName,
        password,
      }),
    });

    if (response.status == 200) {
      const token = await response.json();
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("username", token.userName);
      localStorage.setItem("refreshToken", token.refreshToken);
      localStorage.setItem("roles", token.roles);
      localStorage.setItem("userId", token.userId);
      localStorage.setItem("email", token.email);
      return navigate("/");
    } else {
      setFailed(true);
    }
  };

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
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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
