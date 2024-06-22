import React, { useState } from "react";
import "./Form.scss";
import formImg from "../../Images/contact-form-img.webp";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import ContactDetails from "./ContactDetails";
import { useFormik } from "formik";
import { contactSchema } from "../../formik/schemas/contactusSchema";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { toast } from "react-toastify";
import { Loader1 } from "../Common/Loader/Loader";
import PhoneInput from "react-phone-input-2";

const ContactForm = () => {
  const [loader, setLoader] = useState(false);
  let initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: contactSchema,
    onSubmit: (values, action) => {
      setLoader(true);
      let data = {
        full_name: values?.name,
        email: values?.email,
        phone: `+${values?.phone}`,
        message: values?.message,
      };

      let config = {
        method: "post",
        url: `${environmentVar?.apiUrl}/api/contactus/query`,
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setLoader(false);
          action.resetForm();
          formik.setFieldValue("phone", "");
          toast.success(
            "Thank you for getting in touch with us. Our team will revert you back shortly.",
            {
              autoClose: 2000,
            }
          );
        })
        .catch((error) => {
          setLoader(false);
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });
        });
    },
  });

  const handleKeyPressText = (e) => {
    const onlyLettersRegex = /^[A-Za-z\s]+$/;

    if (!onlyLettersRegex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isCtrlPressed = event.ctrlKey || event.metaKey; // Check if Ctrl key is pressed

    if (
      keyCode === 8 || // Allow backspace key (key code 8)
      keyCode === 46 || // Allow delete key (key code 46)
      (keyCode >= 48 && keyCode <= 57) || // Allow numeric keys (0-9)
      (isCtrlPressed && keyValue === "r") || // Allow Ctrl+R combination
      keyCode === 37 || // Allow left arrow key (key code 37)
      keyCode === 39 || // Allow right arrow key (key code 39)
      (isCtrlPressed && (keyValue === "c" || keyValue === "v")) // Allow Ctrl+C and Ctrl+V combinations
    ) {
      // Check for plus (+) and minus (-) symbols
      if (keyValue === "+" || keyValue === "-") {
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
  };
  return (
    <>
      <Container>
        <Row className="formContainer">
          <Col lg={6} className="formContainer-left">
            <div className="form-title">Email Us</div>
            <div className="form-lable-input">
              <h2>Name</h2>
              <div>
                {" "}
                <input
                  type="text"
                  placeholder="Your Full Name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  onKeyDown={handleKeyPressText}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error">{formik.errors.name}</div>
                ) : null}
              </div>
            </div>
            <div className="form-lable-input">
              <h2>Email Address</h2>
              <div>
                <input
                  type="text"
                  placeholder="Enter Email"
                  // placeholder="e.g. johndoe@vuezen.com"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="form-lable-input">
              <h2>Phone</h2>
              <div className="contact-tel">
                <PhoneInput
                  country={"in"}
                  placeholder={null}
                  value={formik.values.phone}
                  onChange={(value, country) => {
                    if (country && country?.dialCode) {
                      const originalNumber = value.slice(
                        country.dialCode.length
                      );
                      formik.setFieldValue(
                        "phone",
                        `${country.dialCode}-${originalNumber}`
                      );
                    } else {
                      formik.setFieldValue("phone", value);
                    }
                  }}
                  className="logform-input"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error">{formik.errors.phone}</div>
                ) : null}
              </div>
            </div>
            {/* <div className="form-lable-input">
              <h2>Subject</h2>
              <select value={Dropdown}>
                <option value="">Select One</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div> */}
            <div className="form-lable-input">
              <h2>Message</h2>
              <input
                type="textarea"
                placeholder="Enter your message here"
                name="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
            </div>

            <button
              className="button"
              onClick={() => formik.handleSubmit()}
              type="button"
            >
              {loader ? <Loader1 size={25} /> : "Submit"}
            </button>
          </Col>
          <Col lg={6} className="formContainer-right">
            {/* <img src={formImg} /> */}
            <div>
              <div className="address-shop">
                <h3 className="shop-name">VUEZEN PRIVATE LIMITED</h3>
                <p className="shop-address">
                  Address- A-63, Sector 4, Noida, 201301
                </p>
              </div>

              <div className="address-shop">
                <h3 className="shop-name">
                  Have questions or need assistance?
                </h3>
                <p className="content_subhead">
                  We're here to help! Reach out to us at
                </p>
                <p className="content">support@vuezen.io</p>
              </div>

              <div className="address-shop">
                <h3 className="shop-name">Or call us at</h3>
                <p className="content">8800682518</p>
              </div>

              <div>
                <p>
                  For quick responses, connect with us on social media. Your
                  satisfaction is our priority. Looking forward to hearing from
                  you!
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ContactDetails />
    </>
  );
};

export default ContactForm;
