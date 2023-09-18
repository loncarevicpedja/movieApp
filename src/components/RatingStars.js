import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const RatingStars = ({ size = "default", avgRating }) => {
  const fullStars = Math.floor(avgRating);
  const hasHalfStar = avgRating % 1 !== 0;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<BsStarFill className="text-warning pe-2" />);
  }

  if (hasHalfStar) {
    stars.push(<BsStarHalf className="text-warning pe-2" />);
  }

  const remainingStars = 5 - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<BsStar className="pe-2" />);
  }

  return (
    <div>
      {stars}
      <span className="text-muted">({avgRating})</span>
    </div>
  );
};
export default RatingStars;
