import React, { useState, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { registerSchema } from "../../formik/schemas/registerSchema.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader/Loader.js";
import { environmentVar } from "../../config/environmentVar.js";
import axios from "axios";
import { useFormik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const captchaRef = useRef();
  const sitekey = environmentVar.siteKey;
  const [country, setCountry] = useState(null);
  const [mobile, setMobile] = useState("");
  const [agreeChecked, setAgreechecked] = useState(false);
  const navigate = useNavigate(null);
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    country: "",
    captchaValue: "",
  };

  const onChangeRecaptcha = (value) => {
    formik.setFieldValue("captchaValue", value);
  };

  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      if (agreeChecked === false) {
        toast.error("Please accept terms & conditions", {
          autoClose: 2000,
        });
      } else {
        setIsSubmit(true);

        let data = {
          name: values.name,
          email: values.email,
          phone: `+${mobile}`,
          country: `${country}`,
          captchaValue: values.captchaValue,
        };

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${environmentVar?.apiUrl}/api/user/register`,
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            // formik.resetForm();
            // setMobile("");
            toast.success(
              "Registered Successfully. Please check your mail for the activation link.",
              {
                autoClose: 2000,
              }
            );
            setIsSubmit(false);
            navigate("/login");
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
            setIsSubmit(false);
          });
      }
    },
  });
  // const handleSubmit = () => {
  //   if (true) {
  //     setIsSubmit(true);
  //     let data = {
  //       name: name,
  //       email: email,
  //       phone: `+${mobile}`,
  //     };

  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: `${environmentVar?.apiUrl}/api/user/register`,
  //       data: data,
  //     };

  //     axios
  //       .request(config)
  //       .then((response) => {

  //         setIsSubmit(false);
  //       })
  //       .catch((error) => {

  //         setIsSubmit(false);
  //       });
  //   }
  // };
  const { values, errors, handleSubmit } = formik;

  return (
    <>
      <Col md={5} className="login-form-main">
        <Form>
          <h1>Sign Up</h1>
          <p>Please enter your signup details</p>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="logform-lable custom-placeholder-color">
              Full Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              className="logform-input"
              value={formik.name}
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="logform-lable custom-placeholder-color">
              Enter Your Email
            </Form.Label>
            <Form.Control
              type="email"
              // placeholder="e.g . johndoe@vuezen.com"
              placeholder="Enter Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.email}
              className="logform-input"
              name="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="logform-lable custom-placeholder-color">
              Phone Number
            </Form.Label>
            {/* <Form.Control
              type="number"
              placeholder="+91 9999999999"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="logform-input"
              name="mobile"
            /> */}
            <PhoneInput
              country={"in"}
              value={mobile}
              onChange={(value, country) => {
                if (country && country?.dialCode) {
                  setCountry(country.countryCode.toUpperCase());
                  const originalNumber = value.slice(country.dialCode.length);
                  setMobile(`${country.dialCode}-${originalNumber}`);
                } else {
                  setMobile(value);
                }
              }}
              className="logform-input"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="eyeeye-main">
            <ReCAPTCHA
              sitekey={sitekey}
              onChange={onChangeRecaptcha}
              ref={captchaRef}
            />
          </Form.Group>
          {formik.touched.captchaValue && formik.errors.captchaValue ? (
            <div style={{ color: "red" }}>{formik.errors.captchaValue}</div>
          ) : null}

          <Form.Group as={Row} className="mb-2">
            <Col xs={12} className="flex-aligncenter mt-30">
              <Form.Check
                type="checkbox"
                // label="Join Vuezen"
                className="keep-check"
                checked={agreeChecked}
                onChange={() => {
                  setAgreechecked(!agreeChecked);
                }}
              />
              <div className="links">
                I agree to the{" "}
                <span
                  className="links-inside"
                  onClick={() => navigate("/termsandconditions")}
                >
                  {" "}
                  Terms of use{" "}
                </span>{" "}
                &
                <span
                  className="links-inside"
                  onClick={() => navigate("/privacypolicy")}
                >
                  {" "}
                  Privacy policy
                </span>
              </div>
              {/* <a className="forgot-text-small">
                I want to join Vuezen, and agree to the rewards{" "}
                <span>Terms & Conditions</span>
              </a> */}
            </Col>
          </Form.Group>

          <Button
            onClick={handleSubmit}
            variant="primary"
            className="login-button"
            disabled={isSubmit}
          >
            {isSubmit ? <Loader size={30} /> : "Sign Up"}
          </Button>
        </Form>

        <h3>
          Already a member?{" "}
          <span onClick={() => navigate("/login")}> Login here</span>
        </h3>
      </Col>
    </>
  );
};

export default Signup;
