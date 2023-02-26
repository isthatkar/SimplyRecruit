import React, { useState } from "react";
import RatingIcon from "./RatingIcon";
import { Button, Stack } from "@mui/material";

type Props = {
  onIconClick: (value: number) => void;
  defaultValue?: number;
};

const RatingSelector = ({ onIconClick, defaultValue = 3 }: Props) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleIconClick = (value: number) => {
    setSelectedValue(value);
    onIconClick(value);
  };

  const buttonStyle = { minWidth: 0 };
  const selectedButtonStyle = {
    minWidth: 0,
    backgroundColor: "#e0e0e0",
  };

  React.useEffect(() => {
    setSelectedValue(3);
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
      sx={{ my: 3 }}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <Button
          key={value}
          style={value === selectedValue ? selectedButtonStyle : buttonStyle}
          onClick={() => handleIconClick(value)}
        >
          <RatingIcon value={value} selected={false} />
        </Button>
      ))}
    </Stack>
  );
};

export default RatingSelector;
