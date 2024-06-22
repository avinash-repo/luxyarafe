import React, { useState } from "react";
import "./TermsBanner.scss";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { environmentVar } from "../../../config/environmentVar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TermsBannerMain = styled.div`
  background-color: #f0eae2;
  padding: 50px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TrackOrderSearch = styled.div`
  display: flex;
  input {
    width: 380px;
    height: 60px;
    padding: 20px 20px;
    border: 0;
    font-size: 16px;
    @media screen and (max-width: 576px) {
      width: auto;
    }
  }
  h5 {
    height: 60px;
    padding: 0 30px;
    background-color: #032140;
    color: #fff;
    font-size: 16px;
    margin: 0;
    display: flex;
    align-items: center;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const validationSchema = Yup.object({
  orderValue: Yup.number()
    .typeError("Please enter a valid number")
    .positive("Please enter a positive number")
    .integer("Please enter an integer")
    .min(1000000000000, "Order number must be at least 13 digits")
    .max(9999999999999, "Order number must be up to 13 digits"),
});
const TermsBanner = ({ heading, para, isActive }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      orderValue: "",
    },
    validationSchema,
    onSubmit: (values) => {
      let config = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/order/get_track_order?order_id=${values?.orderValue}`,
        withCredentials: true,
      };

      axios
        .request(config)
        .then((response) => {
          navigate(`/orderstrack/${values?.orderValue}`);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });
        });
    },
  });
  const { handleSubmit } = formik;
  return (
    <>
      <TermsBannerMain className="termsbannermain">
        <h1>{heading}</h1>
        <p>{para}</p>
        {isActive ? (
          <TrackOrderSearch>
            <InputWrapper>
              <input
                type="number"
                placeholder="Order Id"
                name="orderValue"
                value={formik.values.orderValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.orderValue && formik.errors.orderValue ? (
                <div style={{ color: "red", textAlign: "left" }}>
                  {formik.errors.orderValue}
                </div>
              ) : null}
            </InputWrapper>

            <h5 className="search-submit" type="submit" onClick={handleSubmit}>
              Submit
            </h5>
          </TrackOrderSearch>
        ) : (
          <></>
        )}
      </TermsBannerMain>
    </>
  );
};

export default TermsBanner;
