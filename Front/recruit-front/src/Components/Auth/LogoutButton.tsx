import React, { useState } from "react";
import { CredentialResponse, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function LoginButton() {
  const navigate = useNavigate();

  const Logout = (e: any): void => {
    e.preventDefault();
    googleLogout();
    localStorage.removeItem("accessToken");
    return navigate("/login");
  };

  return <Button onClick={(e) => Logout(e)}>Logout</Button>;
}
