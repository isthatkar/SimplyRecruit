import * as React from "react";
import { Application, Position, Stage } from "../Types/types";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Tooltip,
  Chip,
} from "@mui/material";
import GetStateLabel from "../Helpers/ApplicationStateToText";
import StarRating from "../Components/Reviews/StartRatingComponent";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { RowStackCenter, RowStackItemsBetween } from "../Styles/Theme";
import { useReward } from "react-rewards";

export default function EnhancedTable() {
  const [allApplications, setAllApplications] = React.useState<Application[]>(
    []
  );
  const [position, setPosition] = React.useState<Position>();

  const { positionId } = useParams();
  const { reward: confettiReward, isAnimating: isConfettiAnimating } =
    useReward("confettiReward", "confetti");

  const editApplication = React.useCallback(
    async (application: Application) => {
      const applicationDto = {
        stage: application.stage,
      };

      await axios.put(`applications/${application.id}`, applicationDto);
    },
    []
  );

  const getPositionApplications = React.useCallback(async () => {
    const response = await axios.get(`positions/${positionId}/applications`);
    const applications = response.data;
    const notArchivedApplications = (applications as Application[]).filter(
      (a) => !a.isArchived
    );
    setAllApplications(notArchivedApplications);
  }, []);

  const getPosition = React.useCallback(async () => {
    const response = await axios.get(`positions/${positionId}`);
    const position = response.data;
    setPosition(position);
  }, []);

  React.useEffect(() => {
    getPositionApplications();
    getPosition();
  }, []);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newApplications = [...allApplications];
    const draggedApplication = newApplications.find(
      (app) => app.id === parseInt(draggableId)
    );

    if (!draggedApplication) {
      return;
    }

    const newStageIndex = parseInt(destination.droppableId);

    draggedApplication.stage = newStageIndex;

    editApplication(draggedApplication);
    setAllApplications(newApplications);

    if (newStageIndex === 7) {
      confettiReward();
    }
  };

  return (
    <Box sx={{ overflowX: "auto", mt: 8 }}>
      <Stack>
        <Typography variant="h2" align="center" gutterBottom>
          {position?.name} applicants
        </Typography>
        <RowStackCenter>
          <Tooltip title="Rating = 50% skills + 25% communication + 25% attitude">
            <InfoOutlinedIcon></InfoOutlinedIcon>
          </Tooltip>
          <Typography variant="subtitle1" align="center" sx={{ ml: 1 }}>
            Stars next to the applicant name visualize the average rating
          </Typography>
        </RowStackCenter>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            alignItems="stretch"
            sx={{ my: 4, mx: "auto" }}
          >
            {Object.values(Stage)
              .filter((x) => parseInt(x as string) >= 0)
              .map((stageIndex: any) => (
                <Grid item key={stageIndex}>
                  <Paper sx={{ p: 1, width: 190, height: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      {" "}
                      <Box sx={{ height: "60px" }}>
                        <RowStackItemsBetween>
                          <Typography variant="h6" gutterBottom>
                            {GetStateLabel(stageIndex)}{" "}
                          </Typography>
                          <Chip
                            label={
                              allApplications.filter(
                                (app) => app.stage === stageIndex
                              ).length
                            }
                            sx={{ background: "#e0e2f2" }}
                          ></Chip>
                        </RowStackItemsBetween>
                      </Box>
                      <Droppable droppableId={stageIndex.toString()}>
                        {(provided: any, snapshot: any) => (
                          <Box
                            ref={provided.innerRef}
                            sx={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#e9ebf6"
                                : "grey.100",
                              minHeight: "60vh",
                              height: "auto",
                              flexGrow: 1,
                            }}
                            {...provided.droppableProps}
                          >
                            {allApplications
                              .filter((app) => app.stage === stageIndex)
                              .map((app, index) => (
                                <Draggable
                                  key={app.id.toString()}
                                  draggableId={app.id.toString()}
                                  index={index}
                                >
                                  {(provided: any, snapshot: any) => (
                                    <Paper
                                      component={Link}
                                      to={`/application/${app.id}`}
                                      sx={{
                                        textDecoration: "none",
                                        "&:hover": {
                                          textDecoration: "none",
                                        },
                                      }}
                                    >
                                      <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        sx={{
                                          mb: 1,
                                          py: 1,
                                          px: 1,
                                          minHeight: "65px",
                                          borderRadius: 1,
                                          backgroundColor: snapshot.isDragging
                                            ? "#a5adf5"
                                            : "#e0e2f2",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <Typography variant="body1">
                                          {app.fullName}
                                        </Typography>
                                        <StarRating
                                          value={app.averageRating}
                                        ></StarRating>
                                      </Box>
                                    </Paper>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </Box>
                        )}
                      </Droppable>
                    </Box>
                  </Paper>
                </Grid>
              ))}

            <span className="bottom-right-span" id="confettiReward"></span>
          </Stack>
        </DragDropContext>
      </Stack>
    </Box>
  );
}
