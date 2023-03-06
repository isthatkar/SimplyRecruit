import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Task } from "../../Types/types";
import EmployeeTaskListItem from "./EmployeeTaskListItem";
import AddTaskDialog from "./AddTaskDialog";
import { ColumnStackCenter, RowStackCenter } from "../../Styles/Theme";

const EmployeeTasksTab = (props: any) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const getTasks = useCallback(async () => {
    const applicationTasks: Task[] = [
      {
        id: 1,
        title: "Create a Facebook Advertising Campaign",
        goal: "Drive traffic to the company website and increase conversions for a specific product",
        state: 0,
        fileName: "asdsa",
        url: "https://google.com",
        fileData: undefined,
        deadline: new Date(),
      },
      {
        id: 3,
        title: "Create a Facebook Advertising Campaign",
        goal: "Drive traffic to the company website and increase conversions for a specific product",
        state: 1,
        fileName: "",
        url: "",
        fileData: undefined,
        deadline: new Date(),
      },
      {
        id: 2,
        title: "Create a Facebook Advertising Campaign",
        goal: "Drive traffic to the company website and increase conversions for a specific product",
        state: 2,
        fileName: "",
        url: "",
        fileData: undefined,
        deadline: new Date(),
      },
    ];

    setTasks(applicationTasks);
  }, []);

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div>
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
          <AddTaskDialog />
        </Stack>
      </Box>

      {tasks.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
    </div>
  );
};

export default EmployeeTasksTab;
