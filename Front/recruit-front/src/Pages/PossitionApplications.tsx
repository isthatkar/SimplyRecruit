import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../Styles/Theme";
import { Application, Position, Stage } from "../Types/types";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Grid, Paper, Typography, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GetStateLabel from "../Helpers/ApplicationStateToText";

export default function EnhancedTable() {
  const [allApplications, setAllApplications] = React.useState<Application[]>(
    []
  );
  const [position, setPosition] = React.useState<Position>();

  const { positionId } = useParams();

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
    setAllApplications(applications);
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
  };

  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ overflowX: "auto", mt: 8 }}>
        <Stack justifyContent="center" alignItems="center">
          <Typography variant="h2" align="center" gutterBottom>
            {position?.name} Applicants
          </Typography>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={1}
              sx={{ my: 4, height: "auto" }}
            >
              {Object.values(Stage)
                .filter((x) => parseInt(x as string) >= 0)
                .map((stageIndex: any) => (
                  <Grid item key={stageIndex}>
                    <Paper sx={{ p: 1, width: 160 }}>
                      <Box sx={{ height: "60px" }}>
                        <Typography variant="h6" gutterBottom>
                          {GetStateLabel(stageIndex)}
                        </Typography>
                      </Box>

                      <Droppable droppableId={stageIndex.toString()}>
                        {(provided: any, snapshot: any) => (
                          <Box
                            ref={provided.innerRef}
                            sx={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#e0e2f2"
                                : "grey.100",
                              minHeight: "50vh",
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
                                          minHeight: "60px",
                                          borderRadius: 1,

                                          backgroundColor: snapshot.isDragging
                                            ? "#6c7bf0"
                                            : "#a5adf5",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <PersonIcon />
                                        <Typography
                                          variant="body1"
                                          sx={{ my: 1 }}
                                        >
                                          {app.fullName}
                                        </Typography>
                                      </Box>
                                    </Paper>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </Box>
                        )}
                      </Droppable>
                    </Paper>
                  </Grid>
                ))}
            </Stack>
          </DragDropContext>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
