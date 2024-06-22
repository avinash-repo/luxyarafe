import React from "react";
import { Container } from "react-bootstrap";
import "./BenefitsBanner.scss";
import BenefitsBannerimg from "../../Images/benefits-banner.webp";
import { useNavigate } from "react-router-dom";
import { environmentVar } from "../../config/environmentVar";

const BenefitsBanner = ({ landingPageData }) => {
  const navigate = useNavigate(null);
  return (
    <>
      {landingPageData && landingPageData.length > 0 ? (
        <>
          {" "}
          <div className="benefits-banner-main">
            <Container>
              <div className="benefits-banner">
                <div className="benefits-image">
                  <img
                    src={`${environmentVar?.cdnUrl}/uploads/ui/${landingPageData[1]?.image}`}
                    alt=""
                  />
                </div>
                <div className="benefits-text">
                  <h1>{landingPageData[1]?.module_heading}</h1>
                  <h5>{landingPageData[1]?.module_description}</h5>
                  <button
                    className="light-white-button"
                    onClick={() => navigate(`/${landingPageData[1]?.slug}`)}
                  >
                    Discover More
                  </button>
                </div>
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

export default BenefitsBanner;
