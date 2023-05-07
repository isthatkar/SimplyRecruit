import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert/Alert";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginButton() {
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const from = location.state?.from.pathname ?? "/";

  const getToken = async (code: string) => {
    const params = new URLSearchParams();
    let accessToken;
    let refreshToken;
    let idToken;
    params.append("code", code);

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });
      const data = await response.json();
      idToken = data.id_token;
      accessToken = data.access_token;
      refreshToken = data.refresh_token;
      return { idToken, accessToken, refreshToken };
    } catch {
      console.log("exception while getting google token");
    }

    return { idToken, accessToken, refreshToken };
  };

  const onSuccess = async (credentialResponse: any) => {
    setFailed(false);
    const { idToken, accessToken, refreshToken } = await getToken(
      credentialResponse.code
    );

    if (accessToken) {
      const body = JSON.stringify({
        accessToken: idToken,
        googleAccessToken: accessToken,
        googleRefreshToken: refreshToken,
      });
      const response = await axios.post("googlelogin", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        const token = response.data;
        localStorage.setItem("accessToken", token.accessToken);
        localStorage.setItem("refreshToken", token.refreshToken);
        localStorage.setItem("roles", token.roles);
        localStorage.setItem("userId", token.userId);
        localStorage.setItem("email", token.email);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.accessToken}`;

        setIsLoading(false);
        return await navigateToPage(from);
      } else {
        setFailed(true);
      }
    } else {
      setFailed(true);
    }
    setIsLoading(false);
  };

  const login = useGoogleLogin({
    onSuccess: async (response: any) => {
      onSuccess(response);
    },
    onError: () => {
      setIsLoading(false);
    },
    onNonOAuthError: () => {
      setIsLoading(false);
    },
    scope: "https://www.googleapis.com/auth/calendar",
    flow: "auth-code",
  });

  const handleSignIn = async () => {
    setIsLoading(true);
    const googleAuthResponse = await login();
  };

  async function navigateToPage(to: string) {
    return navigate(to);
  }
  return (
    <Box
      sx={{
        my: 4,
        width: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress size={24} />
      ) : (
        <Button
          sx={{ padding: "10px 20px" }}
          variant="contained"
          onClick={handleSignIn}
          endIcon={<GoogleIcon />}
        >
          Login with Google
        </Button>
      )}

      {failed ? (
        <Alert severity="error" variant="outlined" sx={{ my: 1, width: "ū0%" }}>
          <AlertTitle>Error</AlertTitle>
          Login failed. Please try again.
        </Alert>
      ) : (
        ""
      )}
    </Box>
  );
}
