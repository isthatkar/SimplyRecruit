import React from "react";
import { Avatar } from "@mui/material";
import {
  MoodBadOutlined as MoodBadOutlinedIcon,
  SentimentDissatisfiedOutlined as SentimentDissatisfiedOutlinedIcon,
  SentimentNeutralOutlined as SentimentNeutralOutlinedIcon,
  SentimentSatisfiedOutlined as SentimentSatisfiedOutlinedIcon,
  SentimentVerySatisfiedOutlined as SentimentVerySatisfiedOutlinedIcon,
} from "@mui/icons-material";

type Props = {
  value: number;
  selected: boolean;
  onClick?: (value: number) => void;
};

const RatingIcon = ({ value, selected, onClick }: Props) => {
  const handleClick = () => {
    if (onClick) {
      onClick(value);
    }
  };

  const backgroundColor = selected ? "#3f51b5" : getBackgroundColor(value);

  return (
    <Avatar sx={{ backgroundColor }} onClick={handleClick}>
      {getIcon(value)}
    </Avatar>
  );
};

const getBackgroundColor = (value: number): string => {
  switch (value) {
    case 1:
      return "#e3e6fd";
    case 2:
      return "#d1d6fb";
    case 3:
      return "#a5adf5";
    case 4:
      return "#6c7bf0";
    case 5:
      return "#3446fd";
    default:
      return "";
  }
};

const getIcon = (value: number) => {
  switch (value) {
    case 1:
      return <MoodBadOutlinedIcon />;
    case 2:
      return <SentimentDissatisfiedOutlinedIcon />;
    case 3:
      return <SentimentNeutralOutlinedIcon />;
    case 4:
      return <SentimentSatisfiedOutlinedIcon />;
    case 5:
      return <SentimentVerySatisfiedOutlinedIcon />;
    default:
      return <MoodBadOutlinedIcon />;
  }
};

export default RatingIcon;
