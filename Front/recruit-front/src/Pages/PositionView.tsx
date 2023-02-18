import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddPositionDialog from "../Components/Positions/AddPositionPage";
import PositionListItem from "../Components/Positions/PositionListItem";
import Theme from "../Styles/Theme";
import {
  JobLocation,
  NordProduct,
  Position,
  Project,
  WorkTime,
} from "../Types/types";

const PositionView = () => {
  const [position, setPosition] = useState<Position>();
  const [isEmployee, setIsEmployee] = useState(false);
  const { positionId } = useParams();
  const navigate = useNavigate();

  const getPosition = useCallback(async () => {
    const response = await axios.get(`positions/${positionId}`);
    console.log(response);
    const project = response.data;
    setPosition(project);
  }, []);

  useEffect(() => {
    getPosition();
    const roles = localStorage.getItem("roles");
    const isEmployee = roles?.includes("Employee");
    setIsEmployee(isEmployee ? isEmployee : false);
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <Typography>{position?.name}</Typography>
    </ThemeProvider>
  );
};

export default PositionView;
