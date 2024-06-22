import React, { useContext, useEffect, useRef, useState } from "react";
import ImageDetailsSection from "./ImageDetailsSection";
import DetailBanner from "./DetailBanner";
import FrameSizes from "./FrameSizes";
import FrameProperty from "./FrameProperty";
import AlsoLike from "./AlsoLike";
import Reviews from "../Reviews/Reviews";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { CartDetailContext } from "../../context/CartDetailContext";

const DetailPage = () => {
  const { id } = useParams();
  const [updatedState, setUpdatedState] = useState(false);
  const [userAddReview, setUserAddReview] = useState(false);
  const { scroll, setScroll, homeUpdate } = useContext(CartDetailContext);

  const userEditOrAdd = () => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/user/review/check_user_give_review?id=${id}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        if (response?.data?.message?.includes("Edit")) {
          setUserAddReview(false);
        } else {
          setUserAddReview(true);
        }
      })
      .catch((error) => {
        setUserAddReview(false);
      });
  };
  const fetchData = async (id, updatedState) => {
    try {
      let config = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/user/review/get_by_id?id=${id}`,
      };
      const response = await axios(config);
      // const { totalItems, totalPages, currentPage, data } = response.data;

      return {
        data: response.data,
      };
    } catch (error) {
      throw error;
    }
  };

  const { data, isLoading, isError, refetch } = useQuery(
    ["ratingreview", id],
    () => fetchData(id)
    // { enabled: false }
  );

  const handleRefetch = () => {
    refetch();
  };

  // Use useEffect to refetch when the state changes
  useEffect(() => {
    handleRefetch();
    userEditOrAdd();
  }, [updatedState]);

  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, [homeUpdate]);

  const facilitiesRef = useRef(null);

  const handleScroll = (e) => {
    if (e === 1 && facilitiesRef?.current) {
      const scrollPosition = facilitiesRef.current.offsetTop;
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    if (scroll === 1) {
      const scrollPosition = facilitiesRef.current.offsetTop;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
    setScroll(null);
  }, []);

  return (
    <>
      <ImageDetailsSection reviewData={data} handleScroll={handleScroll} />
      <DetailBanner />
      <FrameProperty />
      <FrameSizes />
      <Reviews
        data={data}
        updatedState={updatedState}
        setUpdatedState={setUpdatedState}
        userAddReview={userAddReview}
        refdata={facilitiesRef}
      />
      <AlsoLike />
    </>
  );
};

export default DetailPage;
