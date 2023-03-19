import React from "react";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
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

  return <div onClick={handleClick}>{getIcon(value)}</div>;
};

const getIcon = (value: number) => {
  switch (value) {
    case 1:
      return (
        <LooksOneIcon
          sx={{ color: "#a4bdff", height: "30px", width: "30px" }}
        />
      );
    case 2:
      return (
        <LooksTwoIcon
          sx={{ color: "#8facff", height: "30px", width: "30px" }}
        />
      );
    case 3:
      return (
        <Looks3Icon sx={{ color: "#7a9bff", height: "30px", width: "30px" }} />
      );
    case 4:
      return (
        <Looks4Icon sx={{ color: "#5375ff", height: "30px", width: "30px" }} />
      );
    case 5:
      return (
        <Looks5Icon sx={{ color: "#3446fd", height: "30px", width: "30px" }} />
      );
    default:
      return <MoodBadOutlinedIcon />;
  }
};

export default RatingIcon;
