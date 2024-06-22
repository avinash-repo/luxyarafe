import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GirlMobile from "../../Images/girl-mobile.webp";
import "./TryOn.scss";
import { useNavigate } from "react-router-dom";
import { environmentVar } from "../../config/environmentVar";

const TryOn = ({ landingPageData }) => {
  const navigate = useNavigate();
  return (
    <>
      {landingPageData && landingPageData.length > 0 ? (
        <>
          {" "}
          <div className="tryon-main hero-banner">
                    <img 
                    class="img-block-hero"
                      src={`${environmentVar?.cdnUrl}/uploads/ui/${landingPageData[2]?.image}`}
                      alt=""
                    />
            <Container className="tryon">
              
                  <div className="absoluet-left">
                    <h2>{landingPageData[2]?.module_heading}</h2>
                    <h5>{landingPageData[2]?.module_description}</h5>
                    {/* <button
                      onClick={() => navigate(`/${landingPageData[2]?.slug}`)}
                      className="light-white-button"
                    >
                      3D TRY ON
                    </button> */}
                  </div>
                
            </Container>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TryOn;
