import React, { useContext, useEffect, useRef, useState } from "react";
import Product from "../Common/Product/Product";
import { Col } from "react-bootstrap";
import "./MyWishlist.scss";
import AlsoLike from "../DetailPage/AlsoLike";
import styled from "styled-components";
import Loader from "../Loading/Loader";
import { useQuery } from "react-query";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { FilterContext } from "../../context/FilterContext";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import WishIcon from "../../Images/sunglasses.gif";

const AlsoLikeProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 50px;
  /* justify-content: space-between; */
`;

const MyWishlist = () => {
  const { country_code } = useContext(FilterContext);
  const [updateState, setUpdateState] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryRef = useRef();
  const fetchCategoriesData = async ({ queryKey }) => {
    const [, country_code] = queryKey;
    let apiUrl = `${
      environmentVar?.apiUrl
    }/api/wishlist/get_wishlist_products_data?country_code=${
      country_code || "IN"
    }`;

    const config = {
      method: "get",
      url: apiUrl,
      withCredentials: true,
    };

    const response = await axios(config);

    return response?.data?.data;
  };

  const { data, isLoading, error, refetch } = useQuery(
    ["getwishlisteddata", country_code],
    fetchCategoriesData
  );

  useEffect(() => {
    queryRef.current = {
      queryKey: ["products", country_code],
    };
  }, [country_code]);

  const handleRefetch = () => {
    refetch(queryRef.current);
  };
  useEffect(() => {
    handleRefetch();
  }, [updateState, userInfo]);

  if (isLoading) return <Loader />;

  if (error) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <>
      <Col md={9}>
        <div className="my-wishlist-main">
          {data?.length > 0 && <h1>My Wishlist</h1>}
          <div className="wish-products">
            {data?.length > 0 ? (
              data?.map((item, index) => (
                <Product
                  key={index}
                  item={item}
                  index={index}
                  setUpdateState={setUpdateState}
                  updateState={updateState}
                  width="calc(33.33% - 10px)"
                />
              ))
            ) : (
              <div style={{ textAlign: "center", width: "100%" }}>
                <img src={WishIcon} style={{ width: "250px" }} />
                <h4>Empty Wishlist</h4>
                <h5>
                  You have no items in your wishlist.{" "}
                  <span
                    style={{
                      fontWeight: "700",
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "#10b2eb",
                    }}
                    onClick={() => navigate("/")}
                  >
                    Start adding!
                  </span>
                </h5>
              </div>
            )}
          </div>
        </div>
      </Col>
    </>
  );
};

export default MyWishlist;
