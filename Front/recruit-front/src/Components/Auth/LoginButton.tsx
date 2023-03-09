import React, { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
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

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    setFailed(false);
    const accessToken = credentialResponse.credential as string;
    const decoded = jwt_decode(accessToken);
    console.log(decoded);
    const body = JSON.stringify({ accessToken: accessToken });
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
