import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import MoodBadOutlinedIcon from "@mui/icons-material/MoodBadOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import React from "react";
import { Avatar } from "@mui/material";

type Props = {
  value: number;
};

const RatingIcon = ({ value }: Props) => {
  if (value >= 1 && value <= 5) {
    switch (value) {
      case 1:
        return (
          <Avatar sx={{ backgroundColor: "#ff3838" }}>
            <MoodBadOutlinedIcon />
          </Avatar>
        );
      case 2:
        return (
          <Avatar sx={{ backgroundColor: "#ff9338" }}>
            <SentimentDissatisfiedOutlinedIcon />
          </Avatar>
        );
      case 3:
        return (
          <Avatar sx={{ backgroundColor: "#fff338" }}>
            <SentimentNeutralOutlinedIcon />
          </Avatar>
        );
      case 4:
        return (
          <Avatar sx={{ backgroundColor: "#d2ff38" }}>
            <SentimentSatisfiedOutlinedIcon />
          </Avatar>
        );
      case 5:
        return (
          <Avatar sx={{ backgroundColor: "#82ff38" }}>
            <SentimentVerySatisfiedOutlinedIcon />
          </Avatar>
        );
    }
  }
  return <SickOutlinedIcon />; // or a default icon
};

export default RatingIcon;
