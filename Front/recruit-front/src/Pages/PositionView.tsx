import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
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
import ApplicationForm from "../Components/Applications/ApplicationForm";
import { Position } from "../Types/types";

const PositionView = () => {
  const [position, setPosition] = useState<Position>();
  const [isEmployee, setIsEmployee] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const { positionId } = useParams();
  const navigate = useNavigate();
  const [expectations, setExpectations] = useState<string[]>([]);
  const [duties, setDuties] = useState<string[]>([]);
  const [offers, setOffers] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const getPosition = useCallback(async () => {
    const response = await axios.get(`positions/${positionId}`);
    console.log(response);
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
  }, []);

  useEffect(() => {
    getPosition();

    const roles = localStorage.getItem("roles");
    setIsEmployee(roles ? roles.includes("Employee") : false);
    setIsCandidate(roles ? roles.includes("Candidate") : false);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleViewApplications = () => {
    return navigate(`/positions/${positionId}/applications`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAdd = () => {
    return navigate(`/editPosition/${positionId}`);
  };

  const onDelete = async () => {
    const response = await axios.delete(`positions/${positionId}`);

    console.log(response);
    if (response.status === 204) {
      navigate(`/projects/${position?.projectId}`);
    } else {
      toast.error("Could not delete position !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setOpen(false);
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
                <Button variant="contained" onClick={handleClickAdd}>
                  Edit position
                </Button>
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button size="medium" color="error" onClick={handleClickOpen}>
                    Delete position
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Are you sure you want to delete this position?"}
                    </DialogTitle>
                    <DialogContent>
                      All of the positions applications will also be deleted.
                      This cannot be undone.
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={handleClose} autoFocus>
                        Disagree
                      </Button>
                      <Button onClick={() => onDelete()}>Agree</Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
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
