import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Task } from "../../Types/types";
import EmployeeTaskListItem from "./EmployeeTaskListItem";
import AddTaskDialog from "./AddTaskDialog";
import { ColumnStackCenter, RowStackCenter } from "../../Styles/Theme";
import axios from "axios";
import Loader from "../Loading/Loader";

interface TaskTabProps {
  applicationId: number;
}
const EmployeeTasksTab = ({ applicationId }: TaskTabProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.get(`applications/${applicationId}/tasks`);
    const applicationTasks = response.data;
    setTasks(applicationTasks);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          {" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 5,
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <AddTaskDialog
                applicationId={applicationId}
                onAddObject={getTasks}
              />
            </Stack>
          </Box>
          {tasks.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 8,
              }}
            >
              <ColumnStackCenter
                sx={{
                  width: "80%",
                  maxWidth: "900",
                  "@media (max-width: 900px)": {
                    width: "100%",
                  },
                }}
                spacing={1}
              >
                <Typography align="center" variant="h5" sx={{ mb: 5 }}>
                  Candidate tasks
                </Typography>
                {tasks.map((task) => (
                  <EmployeeTaskListItem
                    key={task.id}
                    applicationId={applicationId}
                    task={task}
                  ></EmployeeTaskListItem>
                ))}
              </ColumnStackCenter>
            </Box>
          ) : (
            <RowStackCenter spacing={1}>
              <InfoOutlinedIcon fontSize="large"></InfoOutlinedIcon>
              <Typography align="center" variant="h5">
                NO TASKS ADDED YET
              </Typography>
            </RowStackCenter>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeTasksTab;
