import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import loginImg from "../../Images/login-img.webp";
import "./Login.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { resetPassSchema } from "../../formik/schemas/resetPasswordSchema.js";
import { environmentVar } from "../../config/environmentVar.js";
import { toast } from "react-toastify";
import Loader from "../Common/Loader/Loader";
const ResetPassword = () => {
  const { state } = useLocation();

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [email, setEmail] = useState(null);
  const initialValues = {
    password: "",
    confirm: "",
  };
  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPassSchema,
    onSubmit: async (values) => {
      setIsSubmit(true);
      const newOtp = state?.otp?.join("");
      let data = {
        email: email,
        password: values.password,
        otp_code: newOtp,        
      };

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${environmentVar?.apiUrl}/api/user/reset_password`,
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          toast.success("Password Changed Successfully", {
            autoClose: 2000,
          });
          setIsSubmit(false);
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });
          setIsSubmit(false);
        });
    },
  });
  useEffect(() => {
    if (state?.email) {
      setEmail(state?.email);
    } else {
      navigate("/login");
    }
  }, [state]);
  const { values, errors, handleSubmit } = formik;
  return (
    <>
      <Col md={5} className="login-form-main">
        <Form>
          <h1>Reset Password</h1>
          <p>Please enter your new Password</p>
          <Form.Group controlId="formBasicPassword" className="eyeeye-main">
            <Form.Label className="logform-lable">New Password</Form.Label>
            <Form.Control
              type={showPassword1 ? "text" : "password"}
              placeholder="Enter Your Password"
              className="logform-input"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FontAwesomeIcon
              onClick={() => setShowPassword1(!showPassword1)}
              className="eyeeye"
              icon={showPassword1 ? faEyeSlash : faEye}
            />
          </Form.Group>
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          ) : null}
          <Form.Group controlId="formBasicPassword" className="eyeeye-main">
            <Form.Label className="logform-lable">Confirm Password</Form.Label>
            <Form.Control
              type={showPassword2 ? "text" : "password"}
              placeholder="Enter Your Password"
              className="logform-input"
              name="confirm"
              value={formik.values.confirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FontAwesomeIcon
              onClick={() => setShowPassword2(!showPassword2)}
              className="eyeeye"
              icon={showPassword2 ? faEyeSlash : faEye}
            />
          </Form.Group>
          {formik.touched.confirm && formik.errors.confirm ? (
            <div style={{ color: "red" }}>{formik.errors.confirm}</div>
          ) : null}

          <Button
            onClick={handleSubmit}
            disabled={isSubmit}
            variant="primary"
            className="login-button"
          >
            {isSubmit ? <Loader size={30} /> : "Submit"}
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default ResetPassword;
