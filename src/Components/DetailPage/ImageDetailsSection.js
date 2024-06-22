import React, { useContext, useEffect, useState } from "react";
import DetailPageCarousel from "./DetailPageCarousel";
import { Col, Container, Row } from "react-bootstrap";
import DetailPageDetails from "./DetailPageDetails";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { environmentVar } from "../../config/environmentVar";
import { FilterContext } from "../../context/FilterContext";
import DetailPageLoader from "../Loading/DetailPageLoader";

const ImageDetailsSection = ({ reviewData, handleScroll }) => {
  const { id, catid, genderid } = useParams();
  const { shapeIds, country_code } = useContext(FilterContext);
  const [updateState, setUpdatedState] = useState(false);
  const fetchCategoriesData = async ({ queryKey }) => {
    const [, id, country_code] = queryKey;
    let apiUrl = `${
      environmentVar?.apiUrl
    }/api/product/fetch_product_by_id?id=${id}&country_code=${
      country_code || "IN"
    }`;

    const config = {
      method: "get",
      url: apiUrl,
    };

    const response = await axios(config);
    return response?.data?.data;
  };

  const { data, isLoading, error, refetch } = useQuery(
    ["productbyid", id, country_code],
    fetchCategoriesData
  );
  const fetchOtherProductsData = async ({ queryKey }) => {
    const [, catid, genderid, shape_ids, country_code] = queryKey;
    let apiUrl = `${
      environmentVar?.apiUrl
    }/api/product/fetch_all_product?country_code=${country_code || "IN"}`;

    const data = {
      shape_id: [shape_ids],
    };

    const config = {
      method: "post",
      url: apiUrl,
      data: data,
    };

    const response = await axios(config);
    return response?.data?.data;
  };

  const {
    data: productOtherData,
    isproductOtherDataLoading,
    productOtherDataerror,
  } = useQuery(
    ["otherproducts", catid, genderid, data?.[0]?.shape_id, country_code],
    fetchOtherProductsData
  );
  const handleRefetch = () => {
    refetch();
  };
  useEffect(() => {
    handleRefetch();
  }, [updateState]);

  if (isLoading) return <DetailPageLoader />;

  if (error) {
    return <h3>Error</h3>;
  }

  if (!data?.length) {
    return <h3>Coming Soon</h3>;
  }

  return (
    <Container className="product-image-detail-main">
      <Row>
        <Col lg={6}>
          <DetailPageCarousel
            data={data?.[0]}
            otherProduct={productOtherData}
          />
        </Col>
        <Col lg={1}></Col>
        <Col lg={5}>
          <DetailPageDetails
            data={data?.[0]}
            otherProduct={productOtherData}
            reviewData={reviewData}
            handleScroll={handleScroll}
            updateState={updateState}
            setUpdatedState={setUpdatedState}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ImageDetailsSection;
