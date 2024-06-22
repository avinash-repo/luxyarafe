import React from "react";
import { Col } from "react-bootstrap";
import MyOrders from "../MyOrders/MyOrders";
import "./MyAccount.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import cartBigImg from "../../Images/cartBig-Img.webp";
import cartImg from "../../Images/Bag.webp";
import couponBigImg from "../../Images/coupenBig-Img.webp";
import couponImg from "../../Images/coupen.webp";
import wishlistBigImg from "../../Images/wishlistBig-Img.webp";
import wishlistImg from "../../Images/wishlist.webp";
import { useQuery } from "react-query";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";

const MyAccount = () => {
  const fetchAccountInfo = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/get_user_account_info_data`,
      withCredentials: true,
    };

    const response = await axios.request(config);
    return response.data.data;
  };
  const { data, loading, error } = useQuery(
    "fetchaccountinfo",
    fetchAccountInfo
  );
  return (
    <>
      <Col md={9}>
        <div className="my-wishlist-main">
          <h1>My Account</h1>
          <div className="row my-account-main">
            <div className="col-md-4 my-account-box1">
              <div className="my-account-left">
                <h2>{data?.carts}</h2>
                <div className="my-account-left-b">
                  <img src={cartImg} />
                  <h3>Cart</h3>
                </div>
              </div>
              <div className="my-account-right">
                <img src={cartBigImg} />
              </div>
            </div>

            {/* <div className="col-md-4 my-account-box1">
              <div className="my-account-left">
                <h2>{data?.coupons}</h2>
                <div className="my-account-left-b">
                  <img src={couponImg} />
                  <h3>Coupons</h3>
                </div>
              </div>
              <div className="my-account-right">
                <img src={couponBigImg} />
              </div>
            </div> */}

            <div className="col-md-4 my-account-box1">
              <div className="my-account-left">
                <h2>{data?.wishlists}</h2>
                <div className="my-account-left-b">
                  <img src={wishlistImg} />
                  <h3>Wishlist</h3>
                </div>
              </div>
              <div className="my-account-right">
                <img src={wishlistBigImg} />
              </div>
            </div>
          </div>
          <MyOrders col99={12} />
        </div>
      </Col>
    </>
  );
};

export default MyAccount;
