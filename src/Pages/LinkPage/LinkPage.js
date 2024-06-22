import React, { useState } from "react";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Loader from "../../Components/Common/Loader/Loader";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const InnerDiv = styled.div`
  padding: 100px 0;
`;
const HeadingText = styled.div`
  font-size: 36px;
  color: #4d4d4d;
  font-weight: 500;
`;
const BellorHeadingText = styled.div``;

const LinkPage = ({title}) => {
  const email = new URLSearchParams(window.location.search).get("email");
  const [text, setText] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const updateEmailPreferences = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoader(true);
        let data = {
          email: email,
          message: text,
        };

        let config = {
          method: "post",
          url: `${environmentVar?.apiUrl}/api/user/newsletter/unsubscribe`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            setLoader(false);
            toast.success("Unsubcribed Successfully", {
              autoClose: 2000,
            });
            navigate("/");
          })
          .catch((error) => {
            setLoader(false);
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
          });
      }
    });
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <>
    <Container>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <InnerDiv>
        <HeadingText>Communication Preferences</HeadingText>
        <BellorHeadingText>
          <input
            type="text"
            placeholder="Text a message"
            value={text}
            onChange={handleChange}
          />
        </BellorHeadingText>
        {loader ? (
          <Loader />
        ) : (
          <button onClick={() => updateEmailPreferences()}>
            Update Email Preferenced
          </button>
        )}
      </InnerDiv>
    </Container>
    </>
  );
};

export default LinkPage;
