import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Task } from "../../Types/types";
import { ColumnStackCenter } from "../../Styles/Theme";
import CandidateTaskListItem from "./CandidateTaskListItem";

const CandidateTasks = (props: any) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const getTasks = useCallback(async () => {
    const applicationTasks: Task[] = [
      {
        id: 1,
        title: "Create a Facebook Advertising Campaign",
        goal: "Drive traffic to the company website and increase conversions for a specific product",
        state: 0,
        fileName: "sdws",
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
        url: "sdsdsd",
        fileData: undefined,
        deadline: new Date(),
      },
      {
        id: 2,
        title: "Create a Facebook Advertising Campaign",
        goal: "Drive traffic to the company website and increase conversions for a specific product",
        state: 2,
        fileName: "",
        url: "asdsad",
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
      {tasks.length > 0 ? (
        <Box
          sx={{
            mt: 6,
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
            <Typography variant="h5" sx={{ mb: 5 }}>
              Your tasks for this position
            </Typography>
            {tasks.map((task) => (
              <CandidateTaskListItem
                key={task.id}
                task={task}
              ></CandidateTaskListItem>
            ))}
          </ColumnStackCenter>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default CandidateTasks;
