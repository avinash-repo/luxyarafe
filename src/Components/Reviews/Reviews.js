import { faStar, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Reviews.scss";
import styled from "styled-components";
import { environmentVar } from "../../config/environmentVar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from "./Rating";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import AddRatingReview from "./AddRatingReview";
import ViewRating from "./ViewRating";
const StarsProgress = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  h2 {
    font-size: 14px;
    color: #4d4d4d;
    text-wrap: nowrap;
    margin: 0;
    padding: 0;
  }
`;
const BarMain = styled.div`
  background-color: #f5f6f8;
  border: 1px solid #eaebec;
  height: 25px;
  width: 100%;
  margin: 0 10px;
  position: relative;
`;
const BarOverlay = styled.div`
  position: absolute;
  background-color: #ffad33;
  // width: 0%;
  width: ${(props) => (props.percentage ? `${props.percentage}%` : "0%")};
  height: 25px;
  top: 0;
  z-index: 9;
  border: ${(props) => (props.percentage ? "1px solid #ffad33" : "none")};
`;

const Reviews = ({
  data,
  updatedState,
  setUpdatedState,
  userAddReview,
  refdata,
}) => {
  const [isBoughtProduct, setIsBoughtProduct] = useState(false);
  const { id } = useParams();
  const [ratingError, setRatingError] = useState("");
  const [reviewError, setReviewError] = useState("");

  const [editMode, setEditMode] = useState(false);

  const handleIsBoughtProduct = (productId) => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/product/check_is_product_purchased?product_id=${productId}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setIsBoughtProduct(response?.data?.success);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleIsBoughtProduct(id);
  }, []);

  const [selectedStars, setSelectedStars] = useState(0);
  const [review, setReview] = useState("");

  const handleStarClick = (clickedStar) => {
    setSelectedStars(clickedStar);
  };
  const handleReviewChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^A-Za-z\s,./\t]+/g, "");
    setReview(sanitizedValue);
  };

  const ReviewClick = (e) => {
    e.preventDefault();
    if (!selectedStars) {
      setRatingError("Rating is required");
    } else {
      setRatingError("");
    }

    if (!review) {
      setReviewError("Review is required");
    } else {
      setReviewError("");
    }

    const data = {
      rate: selectedStars,
      review: review,
      product_id: id,
    };

    let config = {
      method: "post",
      url: `${environmentVar?.apiUrl}/api/user/review/add`,
      withCredentials: true,
      data: data,
    };

    if (selectedStars && review) {
      axios
        .request(config)
        .then((response) => {
          setReview("");
          setSelectedStars(0);
          setUpdatedState(!updatedState);
          toast.success("Thank You for review!", {
            autoClose: 2000,
          });
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });
        });
    }
  };

  return (
    <>
      {isBoughtProduct || data?.data?.fetchData?.length > 0 ? (
        <>
          <Container ref={refdata}>
            <div className="reviews-heading">Ratings & Reviews</div>
            <Row>
              <Col md={3}>
                <div className="customers-count">
                  <div className="stars-main">
                    <h2>{data?.data?.overallRating}</h2>
                    <div className="stars">
                      <ul>
                        <li>
                          <FontAwesomeIcon
                            icon={faStar}
                            size="2x"
                            className="star-icon-1"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h3>Customer Reviews ({data?.data?.fetchData?.length})</h3>
                  <div className="cutomers-reviews-graph">
                    <StarsProgress>
                      <h2>5 star</h2>
                      <BarMain>
                        <BarOverlay
                          percentage={data?.data?.percentageRatings?.[5]}
                        ></BarOverlay>
                      </BarMain>
                      <h2>{data?.data?.percentageRatings?.[5]} %</h2>
                    </StarsProgress>
                    <StarsProgress>
                      <h2>4 star</h2>
                      <BarMain>
                        <BarOverlay
                          percentage={data?.data?.percentageRatings?.[4]}
                        ></BarOverlay>
                      </BarMain>
                      <h2>{data?.data?.percentageRatings?.[4]} %</h2>
                    </StarsProgress>
                    <StarsProgress>
                      <h2>3 star</h2>
                      <BarMain>
                        <BarOverlay
                          percentage={data?.data?.percentageRatings?.[3]}
                        ></BarOverlay>
                      </BarMain>
                      <h2>{data?.data?.percentageRatings?.[3]} %</h2>
                    </StarsProgress>
                    <StarsProgress>
                      <h2>2 star</h2>
                      <BarMain>
                        <BarOverlay
                          percentage={data?.data?.percentageRatings?.[2]}
                        ></BarOverlay>
                      </BarMain>
                      <h2>{data?.data?.percentageRatings?.[2]} %</h2>
                    </StarsProgress>
                    <StarsProgress>
                      <h2>1 star</h2>
                      <BarMain>
                        <BarOverlay
                          percentage={data?.data?.percentageRatings?.[1]}
                        ></BarOverlay>
                      </BarMain>
                      <h2>{data?.data?.percentageRatings?.[1]} %</h2>
                    </StarsProgress>
                  </div>
                </div>
              </Col>
              <Col md={9}>
                {isBoughtProduct && userAddReview ? (
                  <>
                    <AddRatingReview
                      setRatingError={setRatingError}
                      setReviewError={setReviewError}
                      handleStarClick={handleStarClick}
                      selectedStars={selectedStars}
                      ratingError={ratingError}
                      reviewError={reviewError}
                      review={review}
                      handleReviewChange={handleReviewChange}
                      ReviewClick={ReviewClick}
                    />
                  </>
                ) : (
                  <></>
                )}
                {data?.data?.fetchData?.map((item, index) => {
                  return (
                    <ViewRating
                      data={item}
                      index={index}
                      updatedState={updatedState}
                      setUpdatedState={setUpdatedState}
                    />
                  );
                })}
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Reviews;
