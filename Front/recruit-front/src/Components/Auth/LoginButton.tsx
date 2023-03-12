import React, { useState } from "react";
import {
  CredentialResponse,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert/Alert";
import axios from "axios";

export default function LoginButton() {
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);

  const location = useLocation();
  const from = location.state?.from.pathname ?? "/";
  console.log(from);

  const getToken = async (code: string) => {
    const params = new URLSearchParams();
    console.log("gettoken");
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
      console.log(data);

      idToken = data.id_token;
      accessToken = data.access_token;
      refreshToken = data.refresh_token;
      return { idToken, accessToken, refreshToken };
    } catch {
      console.log("catched");
    }

    return { idToken, accessToken, refreshToken };
  };

  const onSuccess = async (credentialResponse: any) => {
    setFailed(false);

    console.log(credentialResponse);
    const { idToken, accessToken, refreshToken } = await getToken(
      credentialResponse.code
    );

    localStorage.setItem("gtoken", accessToken);
    console.log(accessToken);
    console.log(refreshToken);
    if (accessToken) {
      console.log(idToken);
      const decoded = jwt_decode(idToken);
      console.log(decoded);
      const body = JSON.stringify({ accessToken: idToken });
      console.log(body);
      const response = await axios.post("googlelogin", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.status);
      console.log("response data");
      console.log(response.data);

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

        return await navigateToPage(from);
      } else {
        setFailed(true);
      }
    } else {
      setFailed(true);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (response: any) => {
      console.log(response);
      onSuccess(response);
    },
    scope: "https://www.googleapis.com/auth/calendar",
    flow: "auth-code",
  });

  const handleSignIn = async () => {
    const googleAuthResponse = await login();
    console.log(googleAuthResponse);
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
      <GoogleLogin
        width="strech"
        onSuccess={onSuccess}
        onError={() => {
          setFailed(true);
        }}
      />

      <button onClick={handleSignIn}>Sign in with Google</button>

      {failed ? (
        <Alert severity="error" variant="outlined" sx={{ my: 1, width: "50%" }}>
          <AlertTitle>Error</AlertTitle>
          Login failed. Please try again.
        </Alert>
      ) : (
        ""
      )}
    </Box>
  );
}
