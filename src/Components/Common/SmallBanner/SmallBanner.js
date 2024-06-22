import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "./SmallBanner.scss";
import styled from "styled-components";
import { environmentVar } from "../../../config/environmentVar";
import Contact from "../../../Images/contact.webp";

const SmallBannerMain = styled.div`
  height: 350px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${(props) => (props.color ? props.color : "antiquewhite")};
  @media screen and (max-width: 576px) {
    background-color: #f2f6f4;
  }
  h2 {
    color: #032140;
    font-size: 48px;
    font-weight: 700;
    @media screen and (max-width: 576px) {
      font-size: 18px;
      padding-top: 10px;
      text-align: center;
      /* font-weight: 500; */
    }
  }
  h3 {
    color: #4d4d4d;
    font-size: 24px;
    font-weight: 400;
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  @media screen and (max-width: 576px) {
    height: 55px;
  }
`;

const SmallBanner = ({
  smallBannerHead,
  smallBannerPara,
  smallBannerImage,
  smallBannerColor,
}) => {
  const getImage = () => {
    if (smallBannerHead == "Contact Us") {
      return Contact;
    } else if (smallBannerHead == "About Us") {
      return smallBannerImage;
    } else {
      return `${environmentVar?.cdnUrl}/uploads/ui/${smallBannerImage}`;
    }
  };
  return (
    <>
      <SmallBannerMain
        color={smallBannerColor ? smallBannerColor : "antiquewhite"}
      >
        <Container>
          <div className="small-hero-text-img-main">
            <div className="small-hero-text">
              <h2>{smallBannerHead}</h2>
              <h3>{smallBannerPara}</h3>
            </div>
            <div className="small-hero-img">
              <img src={getImage()} />
            </div>
          </div>
        </Container>
      </SmallBannerMain>
    </>
  );
};

export default SmallBanner;
