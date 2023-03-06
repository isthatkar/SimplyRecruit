import React from "react";
import { Avatar } from "@mui/material";
import { MoodBadOutlined as MoodBadOutlinedIcon } from "@mui/icons-material";

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
    <Avatar
      className="avatar"
      sx={{ backgroundColor, height: "50px", width: "50px" }}
      onClick={handleClick}
    >
      {getIcon(value)}
    </Avatar>
  );
};

const getBackgroundColor = (value: number): string => {
  switch (value) {
    case 1:
      return "#a4bdff";
    case 2:
      return "#8facff";
    case 3:
      return "#7a9bff";
    case 4:
      return "#5375ff";
    case 5:
      return "#3446fd";
    default:
      return "";
  }
};

const getIcon = (value: number) => {
  switch (value) {
    case 1:
      return <i className="fa-solid fa-face-grimace"></i>;
    case 2:
      return <i className="fa-solid fa-face-rolling-eyes"></i>;
    case 3:
      return <i className="fa-solid fa-face-meh-blank"></i>;
    case 4:
      return <i className="fa-solid fa-face-grin-tongue-wink"></i>;
    case 5:
      return <i className="fa-regular fa-face-grin-hearts"></i>;
    default:
      return <MoodBadOutlinedIcon />;
  }
};

export default RatingIcon;
