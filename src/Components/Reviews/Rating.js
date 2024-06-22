import React, { useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rating = ({ rating, setRating, handleRatingChange }) => {
  // const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    handleRatingChange(selectedRating);
  };

  const handleStarHover = (hoveredRating) => {};

  const handleStarHalfClick = (star) => {
    const decimalRating = Math.floor(rating) + 0.5;
    if (decimalRating === star) {
      setRating(Math.floor(rating));
      handleRatingChange(Math.floor(rating));
    } else {
      handleStarClick(star);
    }
  };

  const renderStar = (star) => {
    const isSelected = star <= Math.floor(rating);
    const isHalfSelected =
      Math.floor(rating) < star && star <= Math.floor(rating) + 0.5;

    return (
      <span
        key={star}
        className={`star ${isSelected ? "selected" : ""} ${
          isHalfSelected ? "half-selected" : ""
        }`}
        onClick={() => handleStarHalfClick(star)}
        onMouseEnter={() => handleStarHover(star)}
      >
        {isHalfSelected ? (
          <FontAwesomeIcon icon={faStar} size="2x" className="star-icon" />
        ) : (
          <>
            <FontAwesomeIcon icon={faStar} size="2x" className="star-icon" />
          </>
        )}
      </span>
    );
  };

  return (
    <div>
      <div>{[1, 2, 3, 4, 5].map((star) => renderStar(star))}</div>
    </div>
  );
};

export default Rating;
