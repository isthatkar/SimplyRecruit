import React, { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  const navigate = useNavigate();

  const onSuccess = (credentialResponse: CredentialResponse) => {
    const jwtToken = credentialResponse.credential as string;
    console.log(credentialResponse);
    const decoded = jwt_decode(jwtToken);
    localStorage.setItem("accessToken", jwtToken);
    console.log(decoded);
    return navigate("/");
  };
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
