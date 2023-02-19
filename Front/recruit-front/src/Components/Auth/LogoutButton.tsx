import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

export default function LoginButton() {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  const Logout = async (e: any): Promise<void> => {
    e.preventDefault();
    const response = await axios.post(`revoke/${id}`, "");

    console.log(response);
    googleLogout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    return navigate("/login");
  };

  return (
    <Button sx={{ my: 2, color: "white" }} onClick={(e) => Logout(e)}>
      Logout
    </Button>
  );
}
