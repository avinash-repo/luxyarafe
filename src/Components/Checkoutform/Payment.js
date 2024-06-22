import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutFormNew from "./CheckoutFormNew";
import { environmentVar } from "../../config/environmentVar";
import { Col, Container, Row } from "react-bootstrap";
import { FilterContext } from "../../context/FilterContext";
import { Helmet } from "react-helmet-async";


const Payment = ({title}) => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  const location = useLocation();
  const { country_code } = useContext(FilterContext);
  const { clientSecret, sub_total, orderId } = location.state;
  const stripePromise = loadStripe(environmentVar?.stripeKey);

  const options = {
    clientSecret: clientSecret,
  };
  const getCurrencySymbol = () => {
    if (country_code == "IN") {
      return "₹";
    } else {
      return "$";
    }
  };
  return (
    <div>
      <Helmet>
        <title>{title || "Welcome To Vuezen"}</title>
      </Helmet>
      <Container className="mt-30 mb-30">
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col md={6}>
            <div
              style={{ fontWeight: "700" }}
              className="mb-2"
            >{`Amount : ${getCurrencySymbol()} ${sub_total}`}</div>
            <Elements stripe={stripePromise} options={options}>
              <CheckoutFormNew orderId={orderId} clientSecret={clientSecret} />
            </Elements>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Payment;
