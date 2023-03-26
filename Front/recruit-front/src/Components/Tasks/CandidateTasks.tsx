import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Task } from "../../Types/types";
import { ColumnStackCenter } from "../../Styles/Theme";
import CandidateTaskListItem from "./CandidateTaskListItem";
import axios from "axios";

interface CandidateTaskProps {
  applicationId: number;
}
const CandidateTasks = ({ applicationId }: CandidateTaskProps) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const getTasks = useCallback(async () => {
    const response = await axios.get(`applications/${applicationId}/tasks`);
    const applicationTasks = response.data;
    setTasks(applicationTasks);
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
                applicationId={applicationId}
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
