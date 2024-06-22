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
      padding-bottom: 10px;
    }
  }
  p {
    font-size: 18px;
    line-height: 18px;
    font-weight: 500;
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

const CancellationContent = () => {
  return (
    <>
      <Container className="mt-30 mb-30">
        <TermsContentSection>
          <h2>Cancellation Policy</h2>
          <p>
            Vuezen strives to provide our customers with the best possible
            service and experience. We understand that sometimes plans change,
            and we’re here to accommodate your needs to the best of our
            abilities.
          </p>
          <p>Please take a moment to review our cancellation policy:</p>
        </TermsContentSection>

        <TermsContentSection>
          <h2>Order Cancellation</h2>
          <p>
            You may cancel your order within 24 hours of purchase for a full
            refund. Requests for cancellation beyond this timeframe will be
            handled on a case-by-case basis.
          </p>
          <p>
            To cancel your order, please contact our customer service team at
            [support@vuezen.io /8800682518] with your order details.
          </p>
        </TermsContentSection>

        <TermsContentSection>
          <h2>Customized or Prescription Eyewear</h2>
          <p>
            Orders for customized or prescription eyewear cannot be canceled
            once they have entered production. Please ensure all details are
            accurate before placing your order.
          </p>
          <p>
            Changes to prescription orders must be made within 24–48 hours of
            purchase and the item will be dispatched accordingly. Any
            alterations requested after this period may incur additional
            charges.
          </p>
        </TermsContentSection>

        <TermsContentSection>
          <h2>Return Policy</h2>
          <p>
            If you are dissatisfied with your purchase, you may return it within
            7 days for a full refund or exchange, excluding shipping costs.
            Eyewear must be in its original condition, unworn, and with all tags
            and packaging intact.
          </p>
          <p>
            Please contact our customer service team to initiate a return or
            visit our website.
          </p>
        </TermsContentSection>

        <TermsContentSection>
          <h2>Refund Processing</h2>
          <p>
            Refunds will be initiated after the returned item is received and
            inspected. After that, we’ll initiate the refund process and the
            amount will be processed within 7-10 business days.
          </p>
        </TermsContentSection>

        <TermsContentSection>
          <h2>Cancellation of Out-of-Stock Items</h2>
          <p>
            In the rare event that an item becomes unavailable after your order
            is placed, we will notify you promptly.
          </p>
          <p>
            You may choose to wait for the item to be restocked, select an
            alternative product, or cancel your order for a full refund.
          </p>
        </TermsContentSection>

        <TermsContentSection>
          <h2>Cancellation by Vuezen</h2>
          <p>
            We reserve the right to cancel any order due to unforeseen
            circumstances, including but not limited to inventory issues,
            payment problems, or fraudulent activity.
          </p>
          <p>
            In such cases, you will be notified promptly, and a full refund will
            be issued.
          </p>
          <p>
            *Please note that our cancellation policy is subject to change
            without prior notice. We encourage you to review this page
            periodically for any updates. If you have any questions or require
            assistance, please don't hesitate to contact our customer service
            team. We're always here to help!*
          </p>
        </TermsContentSection>
      </Container>
    </>
  );
};

export default CancellationContent;
