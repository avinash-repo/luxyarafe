import React, { useEffect, useState, useContext } from "react";
import "./Collections.scss";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import CollectionImage from "../../SmallComponents/CollectionImage";
import Collection1 from "../../../Images/women.webp";
import Collection2 from "../../../Images/men.webp";
import Collection3 from "../../../Images/computer-glasses.webp";
import Collection4 from "../../../Images/kids.webp";
import Collection5 from "../../../Images/sunglasses.webp";
import Collection6 from "../../../Images/men-sun.webp";
import axios from "axios";
import { environmentVar } from "../../../config/environmentVar";
import { CartDetailContext } from "../../../context/CartDetailContext";

const Root = styled.div`
  background-color: #f9fafb;
`;

const Collections = ({ landingPageData }) => {
  const { collectionData } = useContext(CartDetailContext);
  // const [collectionData, setCollectionData] = useState(null);

  // const getCollectionData = () => {
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: `${environmentVar?.apiUrl}/api/collection/get_beautiful_eyewear`,
  //     withCredentials: true,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setCollectionData(response.data.data);
  //     })
  //     .catch((error) => {
  //     });
  // };
  // useEffect(() => {
  //   getCollectionData();
  // }, []);
  return (
    <>
      {landingPageData && landingPageData.length > 0 ? (
        <>
          {" "}
          <Root>
            <Container>
              <div className="collections">
                <h2>{landingPageData[4]?.module_heading}</h2>
                <h5>{landingPageData[4]?.module_description}</h5>
                <Row className="collections-list">
                  {collectionData &&
                    collectionData.map((val) => (
                      <>
                        <Col xl={2} md={4} xs={6}>
                          <CollectionImage
                            pic={`${environmentVar?.cdnUrl}/uploads/ui/${val?.image}`}
                            txt={`${val?.name}`}
                            collectionlink={`${val?.slug}`}
                          />
                        </Col>
                      </>
                    ))}
                </Row>
              </div>
            </Container>
          </Root>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Collections;
