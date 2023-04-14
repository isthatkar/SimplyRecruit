import React from "react";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import { MoodBadOutlined as MoodBadOutlinedIcon } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

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
        <Tooltip title="Poor">
          <LooksOneIcon
            sx={{ color: "#a4bdff", height: "30px", width: "30px" }}
          />
        </Tooltip>
      );
    case 2:
      return (
        <Tooltip title="Below average">
          <LooksTwoIcon
            sx={{ color: "#8facff", height: "30px", width: "30px" }}
          />
        </Tooltip>
      );
    case 3:
      return (
        <Tooltip title="Average">
          <Looks3Icon
            sx={{ color: "#7a9bff", height: "30px", width: "30px" }}
          />
        </Tooltip>
      );
    case 4:
      return (
        <Tooltip title="Good">
          <Looks4Icon
            sx={{ color: "#5375ff", height: "30px", width: "30px" }}
          />
        </Tooltip>
      );
    case 5:
      return (
        <Tooltip title="Excelent">
          <Looks5Icon
            sx={{ color: "#3446fd", height: "30px", width: "30px" }}
          />
        </Tooltip>
      );
    default:
      return <MoodBadOutlinedIcon />;
  }
};

export default RatingIcon;
