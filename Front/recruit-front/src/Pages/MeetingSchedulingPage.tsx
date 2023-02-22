import { ThemeProvider } from "@mui/material";
import React from "react";
import Theme from "../Styles/Theme";

const MeetingSchedulingPage = () => {
  return <ThemeProvider theme={Theme}>Meeting scheduling page</ThemeProvider>;
};

export default MeetingSchedulingPage;
