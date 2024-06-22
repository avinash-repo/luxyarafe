import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import loginImg from "../../Images/login-img.webp";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { forgetSchema } from "../../formik/schemas/forgetPassSchema.js";
import { useFormik } from "formik";
import { environmentVar } from "../../config/environmentVar.js";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Common/Loader/Loader.js";
import { Helmet } from "react-helmet-async";
import ReCAPTCHA from "react-google-recaptcha";

const Forgot = ({title}) => {
  const captchaRef = useRef();

  const sitekey = environmentVar.siteKey;
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);

  const onChangeRecaptcha = (value) => {
    formik.setFieldValue("captchaValue", value);
  };

  let initialTime = 60;
  const [time, setTime] = useState(initialTime);
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let formattedMin = String(minutes).padStart(2, "0");
    let formattedSec = String(seconds).padStart(2, "0");
    return `${formattedMin}:${formattedSec}`;
  };

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [isOtp, setIsOtp] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate(null);

  const initialValues = {
    email: "",
    captchaValue : ""
  };
  const handleChangeOtp = (e, index) => {
    const inputValue = e.target.value;
    if (
      /^[0-9]*$/.test(inputValue) ||
      inputValue === "" ||
      e.Key === "Backspace" ||
      e.key === "Delete"
    ) {
      let arr = [...otp];
      arr[index] = inputValue;
      setOtp(arr);
      if (
        index < inputRefs.length - 1 &&
        inputValue !== "" &&
        e.key !== "Delete" &&
        e.key !== "Backspace"
      ) {
        inputRefs[index + 1].current.focus();
      }
      if (e.key == "Backspace" && index > 0) {
        inputRefs[index - 1].current.focus();
        let arr = [...otp];
        arr[arr.length - 1] = "";
        setOtp(arr);
      }
    } else {
      e.preventDefault();
    }
  };
  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: forgetSchema,
    onSubmit: async (values) => {
      setIsSubmit(true);

      let data = {
        email: values.email,
        captchaValue : values.captchaValue
      };

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${environmentVar?.apiUrl}/api/user/forgot_password`,
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setIsOtp(true);
          setIsSubmit(false);
          const timer = setInterval(() => {
            setTime((prev) => {
              if (prev > 0) {
                return prev - 1;
              } else {
                clearInterval(timer);
                return 0;
              }
            });
          }, 1000);
          return () => {
            clearInterval(timer);
          };
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });
          setIsSubmit(false);
        });
    },
  });
  const { values, errors, handleSubmit } = formik;
  const handleSubmitVerify = () => {
    const newOtp = otp.join("");

    setIsSubmit(true);

    let data = {
      email: formik.values.email,
      otp_code: newOtp,
    };

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/verify_otp`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        navigate("/reset-password", { state: { email: formik.values.email , otp: otp } });
        setIsSubmit(false);
        setOtp(["", "", "", ""]);
      })
      .catch((error) => {
        setOtp(["", "", "", ""]);
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
        setIsSubmit(false);
      });
  };
  const handleSubmitOtp = () => {
    setTime(initialTime);
    let data = {
      email: values.email,
    };
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/forgot_password`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setIsOtp(true);
        setIsSubmit(false);
        const timer = setInterval(() => {
          setTime((prev) => {
            if (prev > 0) {
              return prev - 1;
            } else {
              clearInterval(timer);
              return 0;
            }
          });
        }, 1000);
        return () => {
          clearInterval(timer);
        };
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
        setIsSubmit(false);
      });
  };
  return (
    <>
    <Helmet>
        <title>{title || "Welcome To Vuezen"}</title>
      </Helmet>
      <Container>
        <Row>
          <Col md={5} className="login-form-main">
            <Form>
              <h1>Forgot Your Password</h1>
              <p>
                Please enter your email address below. We will send the
                verification code to your email to help you reset the password.
                If you don't receive your verification code Email, Please check
                the spam box.
              </p>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="logform-lable custom-placeholder-color">
                  Enter Your Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  // placeholder="e.g . johndoe@vuezen.com"
                  className="logform-input"
                  name="email"
                  value={formik.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isOtp}
                />
              </Form.Group>
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
          {
            !isOtp && (
              <>
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
            </>
            )
          }
         

              {isOtp ? (
                <>
                  <Form.Label className="logform-lable custom-placeholder-color">
                    Enter OTP
                  </Form.Label>
                  <div
                    style={{
                      display: "flex",
                      // justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        className="square-input"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChangeOtp(e, index)}
                        onKeyDown={(e) => handleChangeOtp(e, index)}
                        ref={inputRefs[index]}
                      />
                    ))}
                  </div>
                  <div>
                    <span
                      onClick={() => {
                        if (time == 0) handleSubmitOtp();
                      }}
                      style={
                        time == 0
                          ? { textDecoration: "underline", cursor: "pointer", marginBottom:"10px" }
                          : { textDecoration: "underline", cursor: "default" }
                      }
                    >
                      Resend OTP
                    </span>{" "}
                    in {formatTime(time)}
                  </div>
                </>
              ) : (
                <></>
              )}
              <Button
                variant="primary"
                onClick={isOtp ? handleSubmitVerify : handleSubmit}
                className="login-button"
                style={{marginTop:"30px"}}
              >
                {isSubmit ? <Loader size={30} /> : "Submit"}
              </Button>
            </Form>
            <h3>
              Already a member?{" "}
              <span onClick={() => navigate("/login")}> Login here</span>
            </h3>
          </Col>
          <Col md={7}>
            <img src={loginImg} className="img-block-100" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Forgot;
