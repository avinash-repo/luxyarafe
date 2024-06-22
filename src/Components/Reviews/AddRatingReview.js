import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddRatingReview = ({
  setRatingError,
  setReviewError,
  handleStarClick,
  selectedStars,
  ratingError,
  review,
  reviewError,
  ReviewClick,
  handleReviewChange,
}) => {
  return (
    <div className="feedback-form">
      <div className="stars-review-100">
        <h2>Rate this product</h2>
        <div className="stars">
          <ul
            onClick={() => {
              setRatingError("");
              setReviewError("");
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <li
                key={star}
                onClick={() => handleStarClick(star)}
                className={star <= selectedStars ? "active" : ""}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className="star-icon"
                />
              </li>
            ))}
          </ul>
          {ratingError && <span style={{ color: "red" }}>{ratingError}</span>}

          <h5>Good</h5>
        </div>
        <input
          type="text"
          placeholder="Please write product review here."
          value={review}
          onChange={handleReviewChange}
          onClick={() => {
            setRatingError("");
            setReviewError("");
          }}
        />
        {reviewError && <span style={{ color: "red" }}>{reviewError}</span>}
      </div>
      <div className="button" onClick={ReviewClick}>
        Submit
      </div>
      {/* <div className="add-review-button">Add Review</div> */}
    </div>
  );
};

export default AddRatingReview;
