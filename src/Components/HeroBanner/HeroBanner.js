import React, { useEffect, useState } from "react";
import "./HeroBanner.scss";
import Container from "react-bootstrap/Container";
import bannerUrl from "../../Images/veuzen-banner.webp";
import bannerUrlMobile from "../../Images/veuzen-banner-mobile.webp";
import { useNavigate } from "react-router-dom";
import { environmentVar } from "../../config/environmentVar";

const HeroBanner = ({ landingPageData }) => {
  const navigate = useNavigate(null);
  const [image, setImage] = useState(bannerUrl);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setImage(bannerUrlMobile);
    }
  }, [image]);

  return (
    <>
      {landingPageData && landingPageData.length > 0 ? (
        <section className="hero-banner">
          <img
            src={`${environmentVar?.cdnUrl}/uploads/ui/${landingPageData[0]?.image}`}
            alt=""
            className="img-block-hero"
          />
          <Container>
            <div className="absoluet-left">
              <div className="hero-text">
                <h5>{landingPageData[0]?.module_heading}</h5>
                <h1>{landingPageData[0]?.module_description}</h1>
                <button
                  className="light-white-button"
                  onClick={() => navigate(landingPageData[0]?.slug)}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </Container>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default HeroBanner;
