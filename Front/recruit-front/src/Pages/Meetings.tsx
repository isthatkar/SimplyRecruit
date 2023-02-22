import { ThemeProvider } from "@mui/material";
import React from "react";
import Theme from "../Styles/Theme";

const Meetings = () => {
  return <ThemeProvider theme={Theme}>Meetings view page</ThemeProvider>;
};

export default Meetings;
