import React, { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert/Alert";

export default function LoginButton() {
  const navigate = useNavigate();
  const [failed, setFailed] = useState(false);

  const onSuccess = async (credentialResponse: CredentialResponse) => {
    const accessToken = credentialResponse.credential as string;
    const decoded = jwt_decode(accessToken);
    console.log(decoded);
    const response = await fetch("https://localhost:7108/api/googlelogin", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        accessToken,
      }),
    });

    console.log(response);

    if (response.status == 200) {
      const token = await response.json();
      localStorage.setItem("accessToken", token.accessToken);
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
