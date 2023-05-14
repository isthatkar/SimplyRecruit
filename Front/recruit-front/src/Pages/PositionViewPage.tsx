import { Button, List, ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationForm from "../Components/Applications/ApplicationForm";
import { Position } from "../Types/types";

const PositionView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState<Position>();
  const [isEmployee, setIsEmployee] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const { positionId } = useParams();
  const navigate = useNavigate();
  const [expectations, setExpectations] = useState<string[]>([]);
  const [duties, setDuties] = useState<string[]>([]);
  const [offers, setOffers] = useState<string[]>([]);

  const getPosition = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get(`positions/${positionId}`);
    const position = response.data;
    setPosition(position);

    const expectationList = position?.expectations.split(";");
    if (expectationList) {
      setExpectations(expectationList);
    }
    const dutiesList = position?.expectations.split(";");
    if (dutiesList) {
      setDuties(dutiesList);
    }
    const offersList = position?.offers.split(";");
    if (offersList) {
      setOffers(offersList);
    }
    const roles = localStorage.getItem("roles");
    setIsEmployee(roles ? roles.includes("Employee") : false);
    setIsCandidate(roles ? roles.includes("Candidate") : false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getPosition();
  }, []);

  const handleViewApplications = () => {
    return navigate(`/positions/${positionId}/applications`);
  };

  const handleClickAdd = () => {
    return navigate(`/editPosition/${positionId}`);
  };

  return (
    <div>
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
            {position?.name}
          </Typography>
          {isEmployee ? (
            <Stack>
              <Button variant="contained" onClick={handleViewApplications}>
                View applications
              </Button>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                {" "}
                <Button variant="outlined" onClick={handleClickAdd}>
                  Edit position
                </Button>
              </Stack>
            </Stack>
          ) : (
            ""
          )}
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
          <Stack sx={{ pt: 2 }} spacing={1} justifyContent="left">
            <Typography variant="subtitle1" color="text.primary">
              {position?.description}
            </Typography>
            <Typography variant="h6" color="text.primary">
              What You Will Do
            </Typography>
            <List
              sx={{
                listStyleType: "disc",
                pl: 2,
                "& .MuiListItem-root": {
                  display: "list-item",
                },
              }}
            >
              {duties.map((dutie) => (
                <ListItem key={dutie}>{dutie}</ListItem>
              ))}
            </List>
            <Typography variant="h6" color="text.primary">
              What We Expect
            </Typography>
            <List
              sx={{
                listStyleType: "disc",
                pl: 2,
                "& .MuiListItem-root": {
                  display: "list-item",
                },
              }}
            >
              {expectations.map((expectation) => (
                <ListItem key={expectation}>{expectation}</ListItem>
              ))}
            </List>
            <Typography variant="h6" color="text.primary">
              What We Offer
            </Typography>

            <List
              sx={{
                listStyleType: "disc",
                pl: 2,
                "& .MuiListItem-root": {
                  display: "list-item",
                },
              }}
            >
              {offers.map((offer) => (
                <ListItem key={offer}>{offer}</ListItem>
              ))}
              <ListItem>
                {"Gross salary. "} {position?.salaryRange}
              </ListItem>
            </List>
            {isCandidate ? (
              <ApplicationForm positionId={positionId}></ApplicationForm>
            ) : (
              ""
            )}
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default PositionView;
