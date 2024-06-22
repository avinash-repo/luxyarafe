import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import helpIcon from "../../Images/help-icon.webp";
import { useNavigate } from "react-router-dom";

const Root = styled.div`
  background-color: #f9fafb;
  padding: 50px 0 30px;
`;

const ContactDetails = () => {
  const navigate = useNavigate();
  return (
    <>
      <Root>
        <Container className="contact-details-box-main">
          <Row>
            <Col
              md={12}
              className="contact-details-box"
              // onClick={() => navigate("/faqs")}
            >
              <img src={helpIcon} />
              <h2>Help & FAQs</h2>
              <div className="contact-details-box-timings">
                <p>All of your eyewear questions answered all in one place.</p>
                <button className="product-light-white-button new-pad"
                onClick={() => navigate("/faqs")}>
                   Click here
                  </button>
              </div>
            </Col>
          </Row>
        </Container>
      </Root>
    </>
  );
};

export default ContactDetails;
