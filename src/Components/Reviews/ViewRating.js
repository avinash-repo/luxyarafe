import React, { useContext, useState } from "react";
import { faStar, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthContext from "../../context/AuthContext";
import { environmentVar } from "../../config/environmentVar";
import { toast } from "react-toastify";
import axios from "axios";

const IconWrapper = styled.div`
  position: relative;
`;

const MoreIconDiv = styled.div`
  cursor: pointer;
  padding: 8px;
  &:hover {
    background-color: rgb(245, 245, 245);
    border-radius: 50%;
  }
`;
const DropDownDiv = styled.div`
  position: absolute;
  top: 25px;
  right: 0px;
  border-radius: 10px;
  /* left: 0px; */
  background: white;
  // border: 1px solid rgb(204, 204, 204);
  padding: 0.5em;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
  z-index: 1000;
`;
const DropdownButton = styled.button`
  border: none;
  width: 100%;
  padding: 2px 20px;
  background-color: ${(p) => (p.savemain ? "#1976d2" : "white")};
  color: ${(p) => (p.savemain ? "#fff" : "inherit")};
  text-align: left;
  cursor: pointer;

  ${(p) =>
    p.editsave &&
    `
    width: auto !important;
    border: 0.5px solid lightgrey;
    margin: 6px;
    border-radius: 20px;
  `}

  &:hover {
    background-color: ${(p) => (p.savemain ? "#1976d2" : "rgb(245, 245, 245)")};
  }
`;
const EditModediv = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditMoreCancelDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ViewRating = ({ data, index, updatedState, setUpdatedState }) => {
  const { userInfo } = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleMoreVertClick = () => {
    setShowOptions(!showOptions);
  };
  const handleEdit = () => {
    // if (authData === undefined) {
    //   setShowPopup(true);
    //   setShowOptions(!showOptions);
    // }
    // else {
    setEditMode(!editMode);
    setShowOptions(!showOptions);
    // }
  };
  //   const [selectedStars, setSelectedStars] = useState(0);
  //   const [review, setReview] = useState("");
  const [newRate, setNewRate] = useState(data?.rate);
  const [newReview, setNewReview] = useState(data?.review);

  const handleStarClick = (clickedStar) => {
    setNewRate(clickedStar);
  };
  const handleReviewChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^A-Za-z\s,./\t]+/g, "");
    setNewReview(sanitizedValue);
  };

  const formatDate = (dateString) => {
    if (dateString == null || dateString == undefined || dateString == "") {
      return "";
    }

    return dateString.split("T")[0]; // Remove the comma after the year
  };

  const handleSaveClick = () => {
    const postData = {
      rate: newRate,
      review: newReview,
      product_id: data?.product_id?.toString(),
    };

    let config = {
      method: "post",
      url: `${environmentVar?.apiUrl}/api/user/review/add`,
      withCredentials: true,
      data: postData,
    };

    axios
      .request(config)
      .then((response) => {
        // setReview("");
        // setSelectedStars(0);
        setUpdatedState(!updatedState);
        toast.success("Review Updated!", {
          autoClose: 2000,
        });
        setShowOptions(false);
        setEditMode(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
    // let data = JSON.stringify({
    //   rating: newRating,
    //   review: newReview,
    //   hotelId: value.hotelId,
    // });

    // let config = {
    //   method: "post",
    //   url: `${baseUrl}auth/editratingreview`,
    //   headers: {
    //     _token: authData?.token,
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     if (response.data.message === "Problems occurs") {
    //       setShowOptions(false);
    //       setEditMode(false);
    //     } else {
    //       setNewRating(response.data.data.rating);
    //       setNewReview(response.data.data.review);
    //       setTime(response.data.data.updatedAt);
    //       setShowOptions(false);
    //       setEditMode(false);
    //       getAverageRating();
    //     }
    //   })
    //   .catch((error) => {
    //     setShowOptions(false);
    //     setEditMode(false);
    //   });
  };

  const handleDelete = (data) => {
    // if (authData === undefined) {
    //   setShowPopup(true);
    //   setShowOptions(!showOptions);
    // } else {
    // let config = {
    //   method: "delete",
    //   url: `${baseUrl}auth/deleteratingreview/${value.hotelId}/${authData?._id}`,
    //   headers: {
    //     _token: authData?.token,
    //     "Content-Type": "application/json",
    //   },
    // };

    // axios
    //   .request(config)
    //   .then((response) => {
    //     if (response.data.message === "Review Deleted Successfully") {
    //       setReviewShow(true);
    //       getRating();
    //       setShowOptions(!showOptions);
    //       getAverageRating();
    //     } else {
    //       setShowOptions(!showOptions);
    //       setEditMode(false);
    //     }
    //   })
    //   .catch((error) => {
    //   });
    // }

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/review/delete?review_id=${data?.id}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setUpdatedState(!updatedState);
        toast.success("Review Deleted!", {
          autoClose: 2000,
        });
        setShowOptions(false);
        setEditMode(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="user-reviews-main" key={index}>
      <div className="user-reviews-left">
        <div className="user-reviews-profile">
          {data?.user?.name.charAt(0).toUpperCase()}
        </div>
      </div>

      {editMode ? (
        <div className="user-reviews-right">
          <div className="name-stars">
            <div>
              <div>
                <h2>{data?.user?.name}</h2>
                <ul>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <li
                      key={index}
                      className={index <= newRate ? "active" : ""}
                      onClick={() => handleStarClick(index)}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        size="2x"
                        className="star-icon"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <EditModediv className="feedback-form">
                  <input
                    type="text"
                    placeholder="Please write product review here."
                    value={newReview}
                    onChange={handleReviewChange}
                    //   onClick={() => {
                    //     setRatingError("");
                    //     setReviewError("");
                    //   }}
                  />
                  <EditMoreCancelDiv>
                    <DropdownButton
                      editsave
                      onClick={() => {
                        setShowOptions(false);
                        setEditMode(false);
                      }}
                    >
                      Cancel
                    </DropdownButton>
                    <DropdownButton editsave savemain onClick={handleSaveClick}>
                      Save
                    </DropdownButton>
                  </EditMoreCancelDiv>
                </EditModediv>
              </div>
            </div>
          </div>
          {/* <h3>{data?.review}</h3>
          <h4>{formatDate(data?.updated_at)}</h4> */}
        </div>
      ) : (
        <div className="user-reviews-right">
          <div className="name-stars">
            <div style={{ display: "flex" }}>
              <div>
                <h2>{data?.user?.name}</h2>
                <ul>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <li
                      key={index}
                      className={index <= data?.rate ? "active" : ""}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        size="2x"
                        className="star-icon"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <IconWrapper>
                  {userInfo && userInfo?.id === data?.user_id && (
                    <MoreIconDiv>
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        size="2x"
                        className="ellipsis-icon"
                        onClick={handleMoreVertClick}
                      />
                      {/* <MoreVertIcon onClick={handleMoreVertClick} /> */}
                    </MoreIconDiv>
                  )}
                  {showOptions && (
                    <DropDownDiv>
                      <DropdownButton onClick={handleEdit}>Edit</DropdownButton>
                      <DropdownButton onClick={() => handleDelete(data)}>
                        Delete
                      </DropdownButton>
                    </DropDownDiv>
                  )}
                </IconWrapper>
              </div>
            </div>
          </div>
          <h3>{data?.review}</h3>
          <h4>{formatDate(data?.updated_at)}</h4>
        </div>
      )}
    </div>
  );
};

export default ViewRating;
