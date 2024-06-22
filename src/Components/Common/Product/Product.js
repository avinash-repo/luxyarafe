import React, { useContext } from "react";
import "./product.scss";
import { faHeart as faheart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { environmentVar } from "../../../config/environmentVar";
import axios from "axios";
import { FilterContext } from "../../../context/FilterContext";
import AuthContext from "../../../context/AuthContext";
import { CartDetailContext } from "../../../context/CartDetailContext";
import { toast } from "react-toastify";

const ProductMain = styled.div`
  width: ${(props) => (props.width ? props.width : "32%")};
  padding: 20px;
  transition: 0.5s;
  border-radius: 5px;
  margin: 0 0.6% 70px;
  border: 1px solid #00000012;
  position: relative;
  @media screen and (max-width: 1700px) {
    margin: 0 0.6% 50px;
  }
  @media screen and (max-width: 1400px) {
    margin: 0 0.6% 30px;
    padding: 15px;
  }
  @media screen and (max-width: 992px) {
    margin: 0 0.5% 30px;
    width: 49%;
  }
  @media screen and (max-width: 768px) {
    margin: 0 0.5% 30px;
    width: 49%;
    background-color: #fff;
  }
  @media screen and (max-width: 576px) {
    margin: 0 0 30px;
    width: 100%;
    background-color: #fff;
  }
  &:hover {
    box-shadow: 0px 0px 15px 10px #00000012;
  }
`;

const ColorswithText = styled.div`
  display: flex;
  align-items: center;
 
  ul {
    display: flex;
    margin: 0;
    li {
      width: 15px;
      height: 15px;
      border: 1px solid #c2c2c2;
      border-radius: 50%;
      margin-left: 8px;
    }
  }
`;

const NewArrivals = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #ffffff;
  background-color: #01a7ff;
  position: absolute;
  top: 7px;
  right: 7px;
  padding: 4px 8px;
  border-radius: 5px;
  text-transform: uppercase;
  border: 1px solid #e3e3e3;
`;

const Product = (props) => {
  const { isAuth } = useContext(AuthContext);
  const {
    symbol,
    updateStateWishlist,
    setUpdateStateWishlist,
    updateStateCart,
    setUpdateStateCart,
  } = useContext(FilterContext);
  const { homeUpdate, setHomeUpdate } = useContext(CartDetailContext);
  const navigate = useNavigate(null);
  const location = useLocation();
  const path = location.pathname;

  const wishlistedButton = () => {
    if (!isAuth) {
      localStorage.setItem("statevalue", path?.replace("/", "", 1));
      navigate("/login", { state: path?.replace("/", "", 1) });
    } else {
      let config = {
        method: "post",
        url: `${environmentVar?.apiUrl}/api/wishlist/add_to_wishlist?product_id=${props?.item?.id}`,
        withCredentials: true,
      };

      axios
        .request(config)
        .then((response) => {
          props?.setUpdateState(!props?.updateState);
          setUpdateStateWishlist(!updateStateWishlist);
          if (response.status === 201) {
            toast.success("Added to wishlist.", {
              autoClose: 2000,
            });
          } else {
            toast.success("An item removed from wishlist.", {
              autoClose: 2000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  let totalDiscount = Number(
    props?.item?.variants?.[0]?.variant_price_details?.[0]?.discount
  );
  let totalPrice = Number(
    props?.item?.variants?.[0]?.variant_price_details?.[0]?.price
  );

  const BuyNow = (variantDataInContext, quantity) => {
    if (isAuth) {
      let dataforapi = {
        product_id: props?.item?.id,
        product_variant_id: variantDataInContext?.variant_id,
        quantity: quantity,
      };
      let config = {
        method: "post",
        url: `${environmentVar?.apiUrl}/api/cart/add_to_cart`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
        data: dataforapi,
      };
      axios
        .request(config)
        .then((response) => {
          setUpdateStateCart(!updateStateCart);
          navigate("/checkout", {
            state: {
              ...variantDataInContext,
              buynow: "buynow",
              quantity,
              title: props.item.title,
              is_student: props?.item?.is_student,
              cat_id: props?.item?.cat_id,
            },
          });
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });
        });
    } else {
      localStorage.setItem("statevalue", path?.replace("/", "", 1));
      navigate("/login", { state: path?.replace("/", "", 1) });
    }
  };

  const addToCart = (variantDataInContext, itemQuantity) => {
    if (isAuth) {
      let dataforapi = {
        product_id: props?.item?.id,
        product_variant_id: variantDataInContext?.variant_id,
        quantity: itemQuantity,
      };

      let config = {
        method: "post",
        url: `${environmentVar?.apiUrl}/api/cart/add_to_cart`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
        data: dataforapi,
      };

      axios
        .request(config)
        .then((response) => {
          setUpdateStateCart(!updateStateCart);
          toast.success("Added to cart", {
            autoClose: 2000,
          });
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });
        });
    } else {
      localStorage.setItem("statevalue", path?.replace("/", "", 1));

      navigate("/login", { state: path?.replace("/", "", 1) });
    }
  };

  return (
    <>
      <ProductMain width={props.width}>
        <div
          className="product-image-fix-box"
          onClick={() => {
            navigate(`/detailpage/${props?.item?.id}`);
            setHomeUpdate(!homeUpdate);
          }}
        >
          <img
            className=""
            src={`${environmentVar?.cdnUrl}/uploads/${
              props?.item?.variants?.[0]?.thumbnail_url?.replace(/"/g, "") ||
              props?.item?.thumbnail_img?.replace(/"/g, "")
            }`}
          />
        </div>

        {props?.item?.condition === "new" && (
          <NewArrivals>New Arrival</NewArrivals>
        )}
        <div className="product-details-main">
          <div className="product-left">
            <div className="product-name">
              {props?.item?.variants?.[0]?.variant_name}
            </div>
            <div className="product-price">
              {symbol || "₹"}{" "}
              {Number(totalPrice - (totalDiscount * totalPrice) / 100)?.toFixed(
                2
              )}
              {totalDiscount != 0 && (
                <span>
                  {symbol || "₹"}{" "}
                  {Number(
                    props?.item?.variants?.[0]?.variant_price_details?.[0]
                      ?.price
                  )?.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <div className="product-right">
            <div className="heart-icon">
              <FontAwesomeIcon
                onClick={() => {
                  wishlistedButton();
                }}
                icon={props?.item?.isWishlisted ? faHeart : faheart}
                size="2x"
                className="font-icon"
                style={{
                  color: props?.item?.isWishlisted ? "#ff4343" : "#032140",
                }}
              />
            </div>
            <ColorswithText>
              <ul>
                {props?.item?.colorData?.map((colorItem, colorIndex) => {
                  return (
                    <li
                      key={colorIndex}
                      style={{ backgroundColor: colorItem?.value }}
                    ></li>
                  );
                })}
              </ul>
            </ColorswithText>
          </div>
        </div>
        <div className="product-buttons">
          <button
            onClick={() => addToCart(props?.item?.variants?.[0], 1)}
            className="product-light-white-button w-48"
          >
            Add to Cart
          </button>
          <button
            className="product-button w-48"
            onClick={() => {
              BuyNow(props?.item?.variants?.[0], 1);
            }}
          >
            Buy Now
          </button>
        </div>
      </ProductMain>
    </>
  );
};

export default Product;
