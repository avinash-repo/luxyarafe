import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "./Newsletter.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { Loader1 } from "../Common/Loader/Loader";

const Newsletter = () => {
  const [text, setText] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubscribe = () => {
    const email = text.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || !emailRegex.test(email)) {
      toast.error("Invalid email address", {
        autoClose: 2000,
      });
      return;
    }
    setLoader(true);
    let data = {
      email: text,
    };

    let config = {
      method: "post",
      url: `${environmentVar?.apiUrl}/api/user/newsletter/subscribe`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response?.data?.isExist) {
          toast.warning(response?.data?.message, {
            autoClose: 2000,
          });
        } else {
          toast.success(response?.data?.message, {
            autoClose: 2000,
          });
        }
        setLoader(false);
        setText("");
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
  };

  const handleChangeInput = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <Container className="newsletter-main">
        <h2>Join our newsletter</h2>
        <div className="subscribe">
          <input
            type="text"
            placeholder="Enter your email address"
            name="message"
            onChange={handleChangeInput}
            value={text}
          />

          <button className="subscribe-button" onClick={handleSubscribe}>
            {loader ? <Loader1 size={18} /> : "Subscribe"}
          </button>
        </div>
      </Container>
    </>
  );
};

export default Newsletter;
