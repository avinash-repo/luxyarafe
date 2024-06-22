import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import OrderSummary from "../../Components/CheckoutSummary/OrderSummary";
import DeliveryAddress from "../../Components/CheckoutSummary/DeliveryAddress";
import { Helmet } from "react-helmet-async";

const Checkout = ({title}) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [zipcode, setZipcode] = useState();
  const [selectMobile, setSelectMobile] = useState();
  const [availabilityError, setAvailabilityError] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
    <Helmet>
        <title>{title || "Welcome To Vuezen"}</title>
      </Helmet>
      <div className="cart-details-fluid">
        <Container>
          <Row>
            <DeliveryAddress
              zipcode={zipcode}
              setZipcode={setZipcode}
              setSelectMobile={setSelectMobile}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              setAvailabilityError={setAvailabilityError}
            />
            <OrderSummary zipcode={zipcode} selectedAddress={selectedAddress} availabilityError={availabilityError} setAvailabilityError={setAvailabilityError} selectMobile={selectMobile}/>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Checkout;
