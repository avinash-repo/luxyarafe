import React, { useContext, useEffect } from "react";
import PersonalSidebar from "../../Components/Common/PersonalCenter/PersonalSidebar";
import MyWishlist from "../../Components/MyWishlist/MyWishlist";
// import AccountInfo from '../../Components/AccountInfo/AccountInfo'
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Coupens from "../../Components/Coupens/Coupens";
import MyOrders from "../../Components/MyOrders/MyOrders";
import Address from "../../Components/Address/Address";
import AccountInfo from "../../Components/AccountInfo/AccountInfo";
import MyAccount from "../../Components/MyAccount/MyAccount";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { CartDetailContext } from "../../context/CartDetailContext";
import FooterMobile from "../../Components/Common/Footer/FooterMobile";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const WishlistMain = styled.div`
  background-color: #f9fafb;
  padding: 50px 0;
  @media screen and (max-width: 576px) {
    padding: 20px 0;
  }
`;

const BackStrip = styled.div`
      /* background-color: #0fa3ff;
      padding: 20px; */
      a{
        color: #000;
        display: flex;
        align-items: center;
        text-decoration: none;
        font-size: 18px;
      }
`;

const Wishlist = ({ path,title }) => {
  const { isAuth } = useContext(AuthContext);
  const { isMobile } = useContext(CartDetailContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  const getComponent = () => {
    if (path == "wishlist") {
      return <MyWishlist />;
    } else if (path == "coupons") {
      return <Coupens />;
    } else if (path == "orderhistory") {
      return <MyOrders />;
    } else if (path == "address") {
      return <Address />;
    } else if (path == "accountinfo") {
      return <AccountInfo />;
    } else if (path == "myaccount" && !isMobile) {     
      return <MyAccount />;
    } else {
      return <></>;
    }
  };


  return (
    <>
    <Helmet>
        <title>{title || "Welcome To Vuezen"}</title>
      </Helmet>
      <WishlistMain>
        <Container>
          <Row>

            {(!isMobile) ? (
              <PersonalSidebar />
            ) :
              (
                path == "myaccount" && isMobile) ? (
                <PersonalSidebar />
              ) : (
                <Col sm={12}>
                  <BackStrip>
                    <Link to='/myaccount'>
                      <FontAwesomeIcon
                            icon={faArrowLeft}
                            size="1x"
                            className="back-button"
                          />
                          Back</Link>
                  </BackStrip>
                </Col>

              )}
            {getComponent()}
            {isMobile && (
              <FooterMobile />
            )}
          </Row>
        </Container>
      </WishlistMain>
    </>
  );
};

export default Wishlist;
