import {
  Box,
  Container,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import PositionListItem from "../Components/Positions/PositionListItem";
import Theme from "../Styles/Theme";
import { JobLocation, Position, WorkTime } from "../Types/types";

const Positions = () => {
  const [allPositions, setAllPositions] = useState<Position[]>([]);
  const getPositions = useCallback(async () => {
    const response = await axios.get("positions");
    console.log(response.data);
    const positions = response.data;
    setAllPositions(positions);
  }, []);

  useEffect(() => {
    getPositions();
  }, []);
  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            All open positions
          </Typography>
        </Container>
      </Box>
      <Container>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          {allPositions.map((position) => (
            <PositionListItem
              key={position.id}
              id={position.id}
              positionName={position.name}
              location={JobLocation[position.location]}
              time={WorkTime[position.workTime]}
            ></PositionListItem>
          ))}
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Positions;
