import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import "./PersonalSidebarMain.scss";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import {
  faAddressBook,
  faHeart,
  faStickyNote,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { CartDetailContext } from "../../../context/CartDetailContext";

const PersonalSidebar = () => {
  const { userInfo } = useContext(AuthContext);
  const { isMobile } = useContext(CartDetailContext);
  const navigate = useNavigate(null);

  return (
    <>
      <Col md={3}>
        <div className="personal-sidebar-main">
      
          {isMobile ? (
            <h2>Personal Center </h2>
          ) : (
            <h2>Personal Center </h2>
          )}
          <ul>
            <li onClick={() => navigate("/myaccount")}>
              {" "}
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="personal-sidebar-icon"
              />{" "}
              My Account
            </li>
            <li onClick={() => navigate("/accountinfo")}>
              {" "}
              <FontAwesomeIcon
                icon={faUser}
                size="2x"
                className="personal-sidebar-icon"
              />{" "}
              Account Information
            </li>
            <li onClick={() => navigate("/orderhistory")}>
              {" "}
              <FontAwesomeIcon
                icon={faHistory}
                size="2x"
                className="personal-sidebar-icon"
              />{" "}
              Order History
            </li>
            <li onClick={() => navigate("/wishlist")}>
              {" "}
              <FontAwesomeIcon
                icon={faHeart}
                size="2x"
                className="personal-sidebar-icon"
              />{" "}
              My wishlist
            </li>
            {/* <li onClick={() => navigate("/coupons")}> <FontAwesomeIcon icon={faStickyNote} size="2x" className='personal-sidebar-icon'/> Coupons</li> */}
            <li onClick={() => navigate("/address")}>
              {" "}
              <FontAwesomeIcon
                icon={faAddressBook}
                size="2x"
                className="personal-sidebar-icon"
              />{" "}
              Address
            </li>
            {/* <li onClick={() => navigate("/helpcenter")}> <FontAwesomeIcon icon={faCircleInfo} size="2x" className='personal-sidebar-icon'/> Help Center</li> */}
          </ul>
        </div>
      </Col>
    </>
  );
};

export default PersonalSidebar;
