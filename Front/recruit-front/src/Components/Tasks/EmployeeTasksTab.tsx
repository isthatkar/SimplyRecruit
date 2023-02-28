import { Box, Button, Stack, ThemeProvider, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Theme from "../../Styles/Theme";
import { Task } from "../../Types/types";
import EmployeeTaskListItem from "./EmployeeTaskListItem";
import AddTaskDialog from "./AddTaskDialog";

const EmployeeTasksTab = (props: any) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const getTasks = useCallback(async () => {
    const applicationTasks: Task[] = [
      {
        id: 1,
        title: "Create a Facebook Advertising Campaign",
        goal: "Drive traffic to the company website and increase conversions for a specific product",
        instructions: `Develop a Facebook advertising campaign that targets a specific audience and promotes a specific product or service; 
        Create ad copy and visuals that are engaging and compelling, and that align with the company's brand messaging and marketing goals;
        Set up conversion tracking on the company website to measure the success of the campaign in driving conversions;
        Launch the campaign and monitor performance metrics (e.g. impressions, clicks, conversion rates);
        Optimize the campaign based on performance data to improve results (e.g. adjust targeting, ad creative, bidding strategy)`,
        deliverables: `A Facebook advertising campaign that includes ad copy, visuals, targeting, and bidding strategy;
        A report on campaign performance, including key metrics and insights, and recommendations for optimizing the campaign`,
        criteriaForEval: `Ability to develop an effective Facebook advertising campaign that aligns with business objectives and target audience;
        Creativity in ad copy and visuals;
        Attention to detail in setting up conversion tracking and monitoring performance metrics;
        Analytical skills in interpreting data and making data-driven decisions to optimize the campaign;
        Communication skills in presenting the campaign and performance report, and providing recommendations for improvement.`,
        state: 0,
        deadline: new Date(),
      },
      {
        id: 3,
        title: "Create a Facebook Advertising Campaign",
        goal: "Drive traffic to the company website and increase conversions for a specific product",
        instructions: `Develop a Facebook advertising campaign that targets a specific audience and promotes a specific product or service; 
        Create ad copy and visuals that are engaging and compelling, and that align with the company's brand messaging and marketing goals;
        Set up conversion tracking on the company website to measure the success of the campaign in driving conversions;
        Launch the campaign and monitor performance metrics (e.g. impressions, clicks, conversion rates);
        Optimize the campaign based on performance data to improve results (e.g. adjust targeting, ad creative, bidding strategy)`,
        deliverables: `A Facebook advertising campaign that includes ad copy, visuals, targeting, and bidding strategy;
        A report on campaign performance, including key metrics and insights, and recommendations for optimizing the campaign`,
        criteriaForEval: `Ability to develop an effective Facebook advertising campaign that aligns with business objectives and target audience;
        Creativity in ad copy and visuals;
        Attention to detail in setting up conversion tracking and monitoring performance metrics;
        Analytical skills in interpreting data and making data-driven decisions to optimize the campaign;
        Communication skills in presenting the campaign and performance report, and providing recommendations for improvement.`,
        state: 1,
        deadline: new Date(),
      },
      {
        id: 2,
        title: "Create a Facebook Advertising Campaign",
        goal: "Drive traffic to the company website and increase conversions for a specific product",
        instructions: `Develop a Facebook advertising campaign that targets a specific audience and promotes a specific product or service; 
        Create ad copy and visuals that are engaging and compelling, and that align with the company's brand messaging and marketing goals;
        Set up conversion tracking on the company website to measure the success of the campaign in driving conversions;
        Launch the campaign and monitor performance metrics (e.g. impressions, clicks, conversion rates);
        Optimize the campaign based on performance data to improve results (e.g. adjust targeting, ad creative, bidding strategy)`,
        deliverables: `A Facebook advertising campaign that includes ad copy, visuals, targeting, and bidding strategy;
        A report on campaign performance, including key metrics and insights, and recommendations for optimizing the campaign`,
        criteriaForEval: `Ability to develop an effective Facebook advertising campaign that aligns with business objectives and target audience;
        Creativity in ad copy and visuals;
        Attention to detail in setting up conversion tracking and monitoring performance metrics;
        Analytical skills in interpreting data and making data-driven decisions to optimize the campaign;
        Communication skills in presenting the campaign and performance report, and providing recommendations for improvement.`,
        state: 2,
        deadline: new Date(),
      },
    ];

    setTasks(applicationTasks);
  }, []);

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <ThemeProvider theme={Theme}>
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
          <Stack
            sx={{
              width: "80%",
              maxWidth: "900",
              "@media (max-width: 900px)": {
                width: "100%",
              },
            }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography align="center" variant="h5" sx={{ mb: 5 }}>
              Candidate tasks
            </Typography>
            {tasks.map((task) => (
              <EmployeeTaskListItem
                key={task.id}
                title={task.title}
                description={task.goal}
                state={task.state}
                time={task.deadline}
              ></EmployeeTaskListItem>
            ))}
          </Stack>
        </Box>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <InfoOutlinedIcon fontSize="large"></InfoOutlinedIcon>
          <Typography align="center" variant="h5">
            NO TASKS ADDED YET
          </Typography>
        </Stack>
      )}
    </ThemeProvider>
  );
};

export default EmployeeTasksTab;
