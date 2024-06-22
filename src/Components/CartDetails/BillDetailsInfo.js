import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../context/FilterContext";
import { Loader1, Loader2, Loader3, Loader4 } from "../Common/Loader/Loader";
import { environmentVar } from "../../config/environmentVar";
import axios from "axios";

const BillDetailsInfo = ({
  data,
  goldMemberShip,
  couponPrice,
  overAllPrice,
  mainPrice,
  payOption,
  onlinePaymentData,
  priceAfterDiscount,
  buyGetDiscount,
  deliveryData,
  checkedTermConditions,
  individualArray,
  sameCategoryProduct,
  zipcode,
}) => {
  const {
    symbol,
    studentChecked,
    imData,
    studentPrice,
    studentDisPrice,
    selectedCoupon,
    couponId,
  } = useContext(FilterContext);

  const [finalPrice, setFinalPrice] = useState("");
  // const [deliveryCharges, setDeliveryCharges] = useState(0);

  useEffect(() => {
    const calculatePrice = () => {
      let price = 0;

      if (studentChecked && imData && studentDisPrice > 0) {
        if (payOption == 2) {
          price = (
            Number(overAllPrice) +
            Number(studentPrice.delivery_charges ?? 0) -
            ((Number(overAllPrice) +
              Number(studentPrice.delivery_charges ?? 0)) *
              onlinePaymentData?.discount) /
              100
          ).toFixed(2);
        } else {
          price = (
            Number(overAllPrice) + Number(studentPrice.delivery_charges ?? 0)
          ).toFixed(2);
        }
      } else {
        if (payOption == 2) {
          price = (
            Number(overAllPrice) -
            (Number(overAllPrice) * onlinePaymentData?.discount) / 100
          ).toFixed(2);
        } else {
          price = Number(overAllPrice).toFixed(2);
        }
      }

      setFinalPrice(price);
    };

    calculatePrice();
  }, [
    studentChecked,
    imData,
    studentDisPrice,
    payOption,
    overAllPrice,
    studentPrice,
    onlinePaymentData,
    checkedTermConditions,
    deliveryData,
  ]);

  // useEffect(()=>{
  //   let isGlobalACtivate=false
  //    let g= individualArray?.map((el)=>el?.cat_id)

  //   // let ga= buyGetDiscount.filter((el)=>el?.category_id!=null)
  //   // g.forEach(element => {
  //   //   let find=ga.find((el)=>el?.category_id!=element)
  //   //   if(!find){
  //   //     isGlobalACtivate=true
  //   //   }
  //   //  })

  // },[individualArray])

  return (
    <>
      {isNaN(finalPrice) ? (
        <div className="loader-div">
          <Loader4 size={30}></Loader4>
        </div>
      ) : (
        <div className="bill-details-box">
          <div className="total-price">
            <h2>Total Price</h2>
            <h2>
              {symbol || "₹"}
              {Number(mainPrice)?.toFixed(2)}
            </h2>
          </div>

          {studentChecked &&
          imData &&
          studentPrice?.discount > 0 &&
          studentDisPrice > 0 ? (
            <>
              <div className="apply-coupen" key={studentPrice?.discount}>
                <h2>
                  Student Discount <small>({studentPrice?.discount}%)</small>
                </h2>
                <h3>
                  -{symbol || "₹"}
                  {Number(studentDisPrice).toFixed(2)}
                </h3>
              </div>
              <div className="apply-coupen">
                <h2>Delivery Charges</h2>
                <h3>
                  {symbol || "₹"}
                  {/* {(
              (Number(mainPrice) * Number(couponPrice?.value)) / 100 || 0
            )?.toFixed(2)} */}
                  {Number(studentPrice.delivery_charges ?? 0)?.toFixed(2)}
                </h3>
              </div>
            </>
          ) : selectedCoupon == null && priceAfterDiscount != 0 ? (
            <div className="apply-coupen">
              <h2>Special Discount</h2>
              <h3>
                -{symbol || "₹"}
                {Number(priceAfterDiscount)?.toFixed(2)}
              </h3>
            </div>
          ) : (
            selectedCoupon != null && (
              <div className="apply-coupen">
                <h2>Coupon Discount</h2>
                <h3>
                  -{symbol || "₹"}
                  {/* {(
              (Number(mainPrice) * Number(couponPrice?.value)) / 100 || 0
            )?.toFixed(2)} */}
                  {couponPrice?.type === "fixed"
                    ? Number(couponPrice?.value)?.toFixed(2)
                    : (
                        (Number(mainPrice) * Number(couponPrice?.value)) /
                          100 || 0
                      )?.toFixed(2)}
                </h3>
              </div>
            )
          )}

          {!studentChecked && deliveryData !==0 && (
            <div className="apply-coupen">
              <h2>Delivery Charges</h2>
              <h3>
                {symbol || "₹"}
                {Number(deliveryData)?.toFixed(2)}
              </h3>
            </div>
          )}

          {/* {studentChecked &&
        imData &&
        studentPrice?.discount > 0 &&
        studentDisPrice > 0 ? (
          <></>
        ) : selectedCoupon == null ? (
          <div className="total-price">
            <h2>Price after Discount</h2>
            <h2>
              {symbol || "₹"}
              {(Number(mainPrice) - Number(priceAfterDiscount))?.toFixed(2)}
            </h2>
          </div>
        ) : (
          <></>
        )} */}

          <div>
            <div className="payable">
              <h2>Total payable</h2>
              <h2>
                {symbol || "₹"}
                {!isNaN(finalPrice) && finalPrice}
              </h2>
            </div>
            <div className="saved-txt-wrapper">
              {
                studentChecked &&
                imData &&
                studentPrice?.discount > 0 &&
                studentDisPrice > 0 ? (
                  studentDisPrice > 0 && (
                    <h5>
                      You Have saved {symbol || "₹"}{" "}
                      {payOption == 2
                        ? (
                            (Number(
                              studentPrice.delivery_charges +
                                Number(overAllPrice)
                            ) *
                              onlinePaymentData?.discount) /
                              100 +
                            Number(studentDisPrice)
                          )?.toFixed(2)
                        : Number(studentDisPrice).toFixed(2)}
                    </h5>
                  )
                ) : selectedCoupon == null ? (
                  priceAfterDiscount > 0 ? (
                    <h5>
                      You Have saved {symbol || "₹"}{" "}
                      {payOption == 2
                        ? (
                            (Number(overAllPrice) *
                              onlinePaymentData?.discount) /
                              100 +
                            Number(priceAfterDiscount)
                          )?.toFixed(2)
                        : Number(priceAfterDiscount)?.toFixed(2)}
                    </h5>
                  ) : (
                    payOption == 2 && (
                      <h5>
                        You Have saved {symbol || "₹"}{" "}
                        {(
                          (Number(overAllPrice) * onlinePaymentData?.discount) /
                          100
                        )?.toFixed(2)}
                      </h5>
                    )
                  )
                ) : couponPrice?.type === "fixed" ? (
                  <h5>
                    You Have saved {symbol || "₹"}{" "}
                    {payOption == 2
                      ? (
                          (Number(overAllPrice) * onlinePaymentData?.discount) /
                            100 +
                          Number(couponPrice?.value)
                        )?.toFixed(2)
                      : Number(couponPrice?.value)?.toFixed(2)}
                  </h5>
                ) : (
                  couponPrice?.type === "percent" && (
                    <h5>
                      You Have saved {symbol || "₹"}{" "}
                      {payOption == 2
                        ? (
                            (Number(overAllPrice) *
                              onlinePaymentData?.discount) /
                              100 +
                              (Number(mainPrice) * Number(couponPrice?.value)) /
                                100 || 0
                          )?.toFixed(2)
                        : (
                            (Number(mainPrice) * Number(couponPrice?.value)) /
                              100 || 0
                          )?.toFixed(2)}
                    </h5>
                  )
                )
                // : payOption == 2 ? <h5>You Have saved {symbol || "₹"} {((Number(overAllPrice) * onlinePaymentData?.discount) / 100)}</h5>
                // {
                // :
                //   :"iiiiiiiiii"}</h5>
              }
            </div>
          </div>
          {imData && studentChecked ? (
            <></>
          ) : selectedCoupon != null ? (
            <></>
          ) : data?.buynow ? (
            <>
              {buyGetDiscount?.map((item, key) => {
                if (
                  data?.quantity >
                  Number(item?.buy_product) + Number(item?.get_product)
                ) {
                  if (item?.id != couponId) {
                    return <div></div>;
                  } else {
                    return (
                      <div className="offer-applied">
                        Buy {item?.buy_product} Get {item?.get_product} offer
                        Applied!
                      </div>
                    );
                  }
                } else {
                  if (item?.id != couponId) {
                    if (sameCategoryProduct) {

                      return (
                        <div className="offer-more">
                          Buy {item?.buy_product} items and get{" "}
                          {item?.get_product} more for free!
                        </div>
                      );
                    } else {
                     

                      if (
                        data?.quantity >
                        Number(item?.buy_product) + Number(item?.get_product)
                      ) {
                        return (
                          <div className="offer-more">
                            Buy {item?.buy_product} items and get{" "}
                            {item?.get_product} more for free!
                          </div>
                        );
                      }

                      if (item?.category_id == null) {
                        return (
                          <div className="offer-more">
                            Buy {item?.buy_product} items and get{" "}
                            {item?.get_product} more for free!
                          </div>
                        );
                      }
                    }
                  } else {
                    return (
                      <div className="offer-applied">
                        Buy {item?.buy_product} Get {item?.get_product} offer
                        Applied!
                      </div>
                    );
                  }
                }
              })}
            </>
          ) : (
            buyGetDiscount?.map((item, key) => {
              if (
                individualArray?.length >
                Number(item?.buy_product) + Number(item?.get_product)
              ) {
                if (item?.id != couponId) {
                  return <div> </div>;
                } else {
                  return (
                    <div className="offer-applied">
                      Buy {item?.buy_product} Get {item?.get_product} offer
                      Applied!
                    </div>
                  );
                }
              } else {
                if (item?.id != couponId) {
                  if (sameCategoryProduct) {

                    return (
                      <div className="offer-more">
                        Buy {item?.buy_product} items and get{" "}
                        {item?.get_product} more for free!{" "}
                      </div>
                    );
                  } else {

                    if (
                      individualArray?.length >
                      Number(item?.buy_product) + Number(item?.get_product)
                    ) {
                      return (
                        <div className="offer-more">
                          Buy {item?.buy_product} items and get{" "}
                          {item?.get_product} more for free!
                        </div>
                      );
                    }

                    if (item?.category_id == null) {
                      return (
                        <div className="offer-more">
                          Buy {item?.buy_product} items and get{" "}
                          {item?.get_product} more for free!
                        </div>
                        // <div></div>
                      );
                    }
                  }
                } else {
                  return (
                    <div className="offer-applied">
                      Buy {item?.buy_product} Get {item?.get_product} offer
                      Applied!
                    </div>
                  );
                }
              }
            })
          )}
        </div>
      )}
    </>
  );
};

export default BillDetailsInfo;
