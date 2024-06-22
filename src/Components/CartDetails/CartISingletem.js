import React, { useContext, useEffect, useState } from "react";
import cartItemImg from "../../Images/cart-item-img.webp";
import "./CartSingleItem.scss";
import { FilterContext } from "../../context/FilterContext";
import { CartDetailContext } from "../../context/CartDetailContext";

const CartISingletem = ({ data, index, setIncreament, setDecreament }) => {
  const {
    itemQuantity,
    setItemQuantity,
    totalPriceForCart,
    setTotalPriceForCart,
  } = useContext(CartDetailContext);
  const { cartItems, setCartItems, updateQuantity } =
    useContext(CartDetailContext);
  // const { symbol } = useContext(FilterContext);
  // let totalDiscount = Number(
  //   data?.variants?.[0]?.variant_price_details?.[0]?.discount
  // );
  // let totalTax = Number(data?.variants?.[0]?.variant_price_details?.[0]?.tax);
  // let totalPrice = Number(
  //   data?.variants?.[0]?.variant_price_details?.[0]?.price
  // );

  const incrementQuantity = (data) => {
    setIncreament(data?.quantity);
    // if (
    //   itemQuantity <
    //   Number(data?.variants?.[0]?.variant_price_details?.[0]?.stock)
    // ) {
    //   setItemQuantity(itemQuantity + 1);
    // } else {
    //   alert(
    //     `Quantity cannot exceed ${data?.variants?.[0]?.variant_price_details?.[0]?.stock}`
    //   );
    // }
    // const currentQuantity = cartItems[index].itemQuantity;
    // // Check the stock and update the quantity
    // if (currentQuantity < cartItems[index].maxStock) {
    //   updateQuantity(index, currentQuantity + 1);
    // } else {
    //   // alert(`Quantity cannot exceed ${cartItems[index].maxStock}`);
    // }
  };

  const decrementQuantity = (data) => {
    setDecreament(data?.quantity);
    // if (itemQuantity > 1) {
    //   setItemQuantity(itemQuantity - 1);
    // } else {
    //   alert("Quantity cannot be less than 1");
    // }
    // const currentQuantity = cartItems[index].itemQuantity;
    // // Check if the quantity is greater than 1 and update
    // if (currentQuantity > 1) {
    //   updateQuantity(index, currentQuantity - 1);
    // } else {
    //   // alert("Quantity cannot be less than 1");
    // }
  };
  // useEffect(() => {
  //   setTotalPriceForCart(
  //     itemQuantity *
  //       (
  //         totalPrice -
  //         (totalDiscount * totalPrice) / 100 +
  //         (totalTax * totalPrice) / 100
  //       )?.toFixed(2)
  //   );
  // }, [itemQuantity, symbol]);
  // useEffect(() => {
  //   setCartItems(data?.variants?.[0]);
  // }, [data]);

  return (
    <>
      <div className="cart-item-main" key={index}>
        <img src={cartItemImg} />
        {index}
        <div className="cart-item-details">
          <p>{data?.product_title}</p>
          <p>{data?.variants?.[0]?.variant_name}</p>
          <div className="cart-item-price">
            <div className="detailpage-quantity-numbers">
              <ul>
                <li
                  onClick={() => decrementQuantity(data)}
                  style={{ opacity: itemQuantity <= 1 ? 0.5 : 1 }}
                >
                  {" "}
                  -{" "}
                </li>
                <li> {data?.quantity} </li>
                <li
                  onClick={incrementQuantity(data)}
                  style={{
                    opacity:
                      itemQuantity >=
                      Number(
                        data?.variants?.[0]?.variant_price_details?.[0]?.stock
                      )
                        ? 0.5
                        : 1,
                  }}
                >
                  {" "}
                  +{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="cart-item-price">
            <h2>Final Price</h2>
            <h3>
              {/* {symbol || "₹"}  */}
              {totalPriceForCart?.toFixed(2)}
            </h3>
          </div>
          <div className="cart-item-remove">Remove</div>
        </div>
      </div>
    </>
  );
};

export default CartISingletem;
