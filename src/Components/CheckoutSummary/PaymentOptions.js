import axios from "axios";
import React, { useEffect, useState } from "react";
import { environmentVar } from "../../config/environmentVar";
import { useNavigate } from "react-router-dom";

const PaymentOptions = ({
  payMethod,
  checkedTermConditions,
  setCheckedTermConditions,
  setPayMethod,
  setPayOption,
  payOption,
  setPaymentOptions,
  paymentOptions,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="payment-options-main">
        {paymentOptions &&
          paymentOptions?.payment_options &&
          paymentOptions?.payment_options.map((val) => (
            <div className="payment-options-radio-content">
              <input
                checked={payOption == val.id}
                value={val.id}
                onClick={(e) => {
                  setPayOption(e.target.value);
                  setPayMethod(val?.option);
                }}
                type="radio"
              />
              <div className="payment-options-content">
                <h2>{val?.option}</h2>
                <h3>{val?.description}</h3>
              </div>
            </div>
          ))}
        <p>
          Please review the order details and payment details before proceeding
          to confirm your order
        </p>
        <div className="agree-check">
          <input
            checked={checkedTermConditions}
            onClick={() => setCheckedTermConditions(!checkedTermConditions)}
            type="checkbox"
          />
              <div className="links">
                I agree to the 
                <span
                  className="links-inside"
                  onClick={() => navigate("/termsandconditions")}
                 > Terms of use</span> &
                <span
                  className="links-inside"
                  onClick={() => navigate("/privacypolicy")} > Privacy policy
                </span>
              </div>
          
        </div>
       
      </div>
    </>
  );
};

export default PaymentOptions;
