import React, { useEffect, useState, useContext } from "react";
import "./Explore.scss";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import SubCategory from "./SubCategory";
import { environmentVar } from "../../config/environmentVar";
import { CartDetailContext } from "../../context/CartDetailContext";
import axios from "axios";
import { useQuery } from "react-query";

const Root = styled.div`
  background-color: #f9fafb;
`;

const Category = ({ landingPageData }) => {
  const { collectionData } = useContext(CartDetailContext);
  const fetchCategoriesData = async () => {
    const response = await axios.get(
      `${environmentVar?.apiUrl}/api/category/get_category`
    );
    return response?.data?.data;
  };

  const { data, isLoading, error } = useQuery(
    "categories",
    fetchCategoriesData
  );
  return (
    <>
      {data ? (
        <>
          {" "}
          <Root>
            <Container className="explore-container">
              {data?.map((item, index) => {
                return item?.genderData.length > 0 ? (
                  <div className="explore">
                    <h2>{item?.title}</h2>
                    <Row className="explore-list">
                      {item?.genderData?.map((innerItem, innerIndex) => {
                        return (
                          <>
                            <Col xs={3} className="px-2">
                              <SubCategory
                                item={item}
                                innerItem={innerItem}
                              />
                            </Col>
                          </>
                        )
                      })}
                    </Row>
                  </div>
                ) : (
                  ''
                );
              })}
            </Container>
          </Root>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Category;
