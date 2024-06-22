import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const TermsContentSection = styled.div`
  padding: 30px 0;
  @media screen and (max-width: 1700px) {
    padding: 10px 0;
  }
  @media screen and (max-width: 1400px) {
    padding: 10px 0;
  }
  @media screen and (max-width: 1200px) {
    padding: 0;
  }
  @media screen and (max-width: 992px) {
    padding: 0;
  }
  h2 {
    color: #505050;
    font-size: 24px;
    font-weight: 600;
    padding-bottom: 0;
    @media screen and (max-width: 1700px) {
      padding-bottom: 0;
    }
  }
  p {
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    color: #4d4d4d;
    text-align: justify;
    @media screen and (max-width: 1400px) {
      padding-bottom: 10px;
    }
  }
  ul {
    list-style: circle;
    li {
      padding-bottom: 10px;
    }
  }
`;

const ShippingContent = () => {
  return (
    <>
      <Container className="mt-30 mb-30">
        <TermsContentSection>
          <h2>Shipping and Delivery</h2>
          <p>
            We aim to process and ship orders promptly within 4–7 days. However,
            shipping times may vary depending on your location.
          </p>
          <p>
            Vuezen is not responsible for delays or issues caused by third-party
            shipping carriers. Once the order is shipped, it becomes the
            responsibility of the carrier.
          </p>
        </TermsContentSection>

        <TermsContentSection>
          <h2>Tracking Information</h2>
          <p>
            Once your order has been shipped, you will receive a shipping
            confirmation email containing tracking information. You can track
            the status of your delivery using the provided tracking number on
            our website or through the carrier's website.
          </p>
        </TermsContentSection>

        <TermsContentSection>
          <h2>Delivery Delays</h2>
          <p>
            While our aim is to deliver your order within the estimated
            timeframe, unforeseen circumstances such as inclement weather,
            customs delays, or carrier issues may occasionally cause delays.
          </p>
          <p>
            In the event of a significant delay, our customer service team will
            notify you promptly and work to resolve the issue as quickly as
            possible.
          </p>
        </TermsContentSection>
      </Container>
    </>
  );
};

export default ShippingContent;
