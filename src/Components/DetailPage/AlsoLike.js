import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../Common/Product/Product";
import styled from "styled-components";
import axios from "axios";
import Loader from "../Loading/Loader";
import AuthContext from "../../context/AuthContext";
import { useQuery } from "react-query";
import { FilterContext } from "../../context/FilterContext";
import { environmentVar } from "../../config/environmentVar";
import { ProductDetailContext } from "../../context/ProductDetailContext";

const AlsoLikeProducts = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 50px;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        padding: 0 20px;
    }
`


const AlsoLike = (props) => {
  // const containerStyle = {
  //   width: props.width || "calc(33.33% - 10px)",
  //   margin: props.margin || "0 0 70px",
  // };
  const queryRef = useRef();
  const [updateState, setUpdateState] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const {
    productDataInContext,
  } = useContext(ProductDetailContext);
  const { country_code, shapeIds } = useContext(FilterContext);

  
  const fetchCategoriesData = async ({ queryKey }) => {
    const [, productDataInContext, country_code, shapeIds] = queryKey;
    let apiUrl = `${
      environmentVar?.apiUrl
    }/api/product/fetch_all_product?cat_id=${
      productDataInContext?.cat_id
    }&gender=${productDataInContext?.gender?.[0]}&country_code=${
      country_code || "IN"
    }`;

    const data = {
      shape_id: shapeIds,
    };

    const config = {
      method: "post",
      url: apiUrl,
      data: data,
    };

    const response = await axios(config);

    return response?.data?.data;
  };

  const { data, isLoading, error, refetch } = useQuery(
    ["productsalsomaylike", productDataInContext, country_code, shapeIds],
    fetchCategoriesData
  );

  useEffect(() => {
    queryRef.current = {
      queryKey: ["products", productDataInContext, shapeIds, country_code],
    };
  }, [productDataInContext, shapeIds, country_code]);

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

  if (!data?.length) {
    return <h3>Coming Soon</h3>;
  }

  return (
    <>
      <div className="also-like-main">
        <h2>You Might Also Like</h2>
        <AlsoLikeProducts>
          {data?.slice(0, 8)?.map((item, index) => {
            return (
              <Product
                width="23%"
                // margin="0 0 70px"
                item={item}
                index={index}
                setUpdateState={setUpdateState}
                updateState={updateState}
              />
            );
          })}
        </AlsoLikeProducts>
      </div>
    </>
  );
};

export default AlsoLike;
