import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./About.scss";
import about4Img from "../../Images/about4.webp";
import about5Img from "../../Images/about5.webp";

const Twoboxes = () => {
  return (
    <>
      <Container className="two-boxes-main">
        <Row className="two-boxes-header">
          <Col lg={8} mdOffset={4}>
            <h2>Crafting Eyewear that Celebrates Individuality</h2>
            <p>
              Our progressive eyewear embraces uniqueness by fusing innovation with individuality. Designed with precision and crafted from diverse materials, each frame stands the test of time, empowering you to express yourself authentically.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12} className="about-left-box">
            <img src={about4Img} className="img-block-100" />
            <h2>Sustainability</h2>
            <p>
            We are committed to making a positive impact on both fashion and the environment. Vuezen embraces sustainable practices, using eco-friendly materials and responsible manufacturing processes. Join us in our journey towards a more sustainable future without compromising on style or quality.
            </p>
            {/* <div className="shop-light">Shop Now</div> */}
          </Col>
          <Col md={6} xs={12} className="about-left-box">
            <img src={about5Img} className="img-block-100" />
            <h2>Customer Experience</h2>
            <p>
            Your satisfaction is our priority. Our customer service team is dedicated to ensuring your experience with Vuezen is seamless from selection to delivery. We offer a range of services, including virtual try-ons and expert guidance, to make choosing the perfect pair of glasses an enjoyable experience.
            </p>
            {/* <div className="shop-light">Shop Now</div> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Twoboxes;
