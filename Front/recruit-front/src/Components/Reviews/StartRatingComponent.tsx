import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import React from "react";

interface StarRatingProps {
  value: number;
}

const StarRating = ({ value }: StarRatingProps) => {
  const roundedValue = Math.round(value * 2) / 2; // Round to nearest 0.5
  const fullStars = Math.floor(roundedValue);
  const hasHalfStar = roundedValue % 1 !== 0;

  return (
    <div>
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index} />
      ))}
      {hasHalfStar && <StarHalfIcon />}
    </div>
  );
};

export default StarRating;
