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
      return "#ff3838";
    case 2:
      return "#ff9338";
    case 3:
      return "#fff338";
    case 4:
      return "#d2ff38";
    case 5:
      return "#82ff38";
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
