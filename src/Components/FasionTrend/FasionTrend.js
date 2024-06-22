import React from "react";
import "./FasionTrend.scss";
import { Container } from "react-bootstrap";
import TrendSlider from "../SmallComponents/TrendSlider";
import { useNavigate } from "react-router-dom";

const FasionTrend = ({ landingPageData, data }) => {
  const navigate = useNavigate(null);
  return (
    <>
      {landingPageData && landingPageData.length > 0 ? (
        <>
          {" "}
          <Container>
            <div className="fasion-trend">
              <h2>{landingPageData[5]?.module_heading}</h2>
              <h5>{landingPageData[5]?.module_description}</h5>
              <div className="fasion-trend-list">
                <TrendSlider data={data} />
              </div>
              {/* <div
                className="light-white-button mt-30 only-desktop"
                onClick={() => navigate(`/${landingPageData[5]?.slug}`)}
              >
                View More
              </div> */}
            </div>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default FasionTrend;
