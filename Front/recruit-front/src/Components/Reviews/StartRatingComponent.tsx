import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface StarRatingProps {
  value: number;
}

const StarRating = ({ value }: StarRatingProps) => {
  const roundedValue = Math.round(value * 2) / 2;
  const fullStars = Math.floor(roundedValue);
  const hasHalfStar = roundedValue % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div>
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index} />
      ))}
      {hasHalfStar && <StarHalfIcon />}
      {[...Array(emptyStars)].map((_, index) => (
        <StarBorderIcon key={index} />
      ))}
    </div>
  );
};

export default StarRating;
