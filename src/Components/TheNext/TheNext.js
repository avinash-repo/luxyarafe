import React from "react";
import { Container } from "react-bootstrap";
import "./TheNext.scss";
import NexImage from "../../Images/spax.webp";
import { useNavigate } from "react-router-dom";
import { environmentVar } from "../../config/environmentVar";

const TheNext = ({ landingPageData }) => {
  const navigate = useNavigate(null);
  return (
    <>
      {landingPageData && landingPageData.length > 0 ? (
        <div className="the-next-main">
          <Container className="the-next">
            <div className="the-next-image">
              <img
                src={`${environmentVar?.cdnUrl}/uploads/ui/${landingPageData[3]?.image}`}
                alt=""
              />{" "}
            </div>
            <div className="the-next-text">
              <h1>
                {landingPageData[3]?.module_heading}
                <span style={{ color: "#6B6263" }}>
                  {landingPageData[3]?.module_description}
                </span>
              </h1>
              <button
                className="button"
                onClick={() => navigate(`/${landingPageData[3]?.slug}`)}
              >
                View More
              </button>
            </div>
          </Container>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TheNext;
