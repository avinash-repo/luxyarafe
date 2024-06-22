import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import "./Footer.scss";
import FootLogo from "../../../Images/vuezen-logo.webp";
import dropdown_icon from "../../../Images/dropdown_arrow.webp";
import { useNavigate } from "react-router-dom";
import { CartDetailContext } from "../../../context/CartDetailContext";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import { environmentVar } from "../../../config/environmentVar";

const Footer = () => {
  const navigate = useNavigate(null);
  const { homeUpdate, setHomeUpdate } = useContext(CartDetailContext);

  const [isOpenedCarousel, setIsOpenedCarousel] = useState(0);
  const [resData, setResData] = useState();
  const { isAuth } = useContext(AuthContext);

  const getFooterData = () => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/user/footer/get`,
    };

    axios
      .request(config)
      .then((response) => {
        setResData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        setResData();
      });
  };
  useEffect(() => {
    getFooterData();
  }, []);

  return (
    <>
      <div>
        <div className="footer-main">
          <Container>
            <div className="footer">
              <div className="footer-col">
                <ul>
                  <li
                    onClick={() => {
                      navigate("/");
                      setHomeUpdate(!homeUpdate);
                    }}
                  >
                    {" "}
                    <img
                      src={`${environmentVar.cdnUrl}/uploads/footer/${resData?.h1_image}`}
                      alt="Footer Logo"
                    />{" "}
                  </li>
                  <li>{resData?.h1_description}</li>
                  <li>
                    <div className="social-ico">
                      {resData?.social_media_data?.map((item, index) => {
                        return (
                          <a
                            href={item?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            role="button"
                          >
                            <img
                              src={`${environmentVar?.cdnUrl}/uploads/footer/${item?.image}`}
                              alt="Social Image"
                            />
                          </a>
                        );
                      })}
                    </div>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h2
                  onClick={() => {
                    isOpenedCarousel == 3
                      ? setIsOpenedCarousel(0)
                      : setIsOpenedCarousel(3);
                  }}
                >
                  Useful Links{" "}
                  <img
                    src={dropdown_icon}
                    className="only-mobile"
                    alt="Links"
                  />
                </h2>
                <ul
                  className={
                    isOpenedCarousel == 3
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  <li>
                    <a onClick={() => navigate("/trackorder")} role="button">
                      Track Order
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        isAuth ? navigate("/myaccount") : navigate("/login")
                      }
                      role="button"
                    >
                      Account
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() =>
                        isAuth ? navigate("/orderhistory") : navigate("/login")
                      }
                      role="button"
                    >
                      Orders
                    </a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/about")} role="button">
                      About
                    </a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/faqs")} role="button">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-col">
                <h2
                  onClick={() => {
                    isOpenedCarousel == 2
                      ? setIsOpenedCarousel(0)
                      : setIsOpenedCarousel(2);
                  }}
                >
                  Policies{" "}
                  <img
                    src={dropdown_icon}
                    className="only-mobile"
                    alt="Policies"
                  />
                </h2>
                <ul
                  className={
                    isOpenedCarousel == 2
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  <li>
                    <a
                      onClick={() => navigate("/termsandconditions")}
                      role="button"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/privacypolicy")} role="button">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate("/return-exchange-policy")}
                      role="button"
                    >
                      Return Exchange Policy
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate("/shipping-policy")}
                      role="button"
                    >
                      Shipping Policies
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h2
                  onClick={() => {
                    isOpenedCarousel == 4
                      ? setIsOpenedCarousel(0)
                      : setIsOpenedCarousel(4);
                  }}
                >
                  Need Help{" "}
                  <img src={dropdown_icon} className="only-mobile" alt="Help" />
                </h2>
                <ul
                  className={
                    isOpenedCarousel == 4
                      ? "footer-mobile-active"
                      : "footer-mobile"
                  }
                >
                  <li>
                    <a onClick={() => navigate("/contact")} role="button">
                      Contact Us
                    </a>
                  </li>
                  <li>{resData?.footer_email}</li>
                  {resData?.footer_phone && (
                    <li>Call: {resData?.footer_phone}</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="copyright">Vuezen © 2024, All Rights Reserved</div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Footer;
