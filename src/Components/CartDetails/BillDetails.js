import React, { useContext, useEffect, useState } from "react";
import {
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import BillDetailsInfo from "./BillDetailsInfo";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { FilterContext } from "../../context/FilterContext";
import StudentOffer from "../CheckoutSummary/StudentOffer";

const BillDetails = ({ data, status }) => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [mainPrice, setMainPrice] = useState(0);
  const [overAllPrice, setoverAllPrice] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [couponPrice, setCouponPrice] = useState(0);
  const [selectedCoupon1, setSelectedCoupon1] = useState(null);
  const [goldMemberShip, setGoldMembershipPrice] = useState(0);
  const [buyGetDiscount, setBuyGetDiscount] = useState([]);
  const [buyGetGlobal, setBuyGetGlobal] = useState([]);
  const [buyGetCategory, setBuyGetCategory] = useState([]);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState();
  const [sortedArray, setSortedArray] = useState([]);
  const [individualArray, setIndividualArray] = useState([]);
  const [couponId1, setCouponId1] = useState();
  const [deliveryData, setDeliveryData] = useState();
  const [sameCategoryProduct, setSameCategoryProduct] = useState();
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeError, setPromoCodeError] = useState("");
  const [promoCodeMessage, setPromoCodeMessage] = useState("");

  const {
    country_code,
    symbol,
    selectedCoupon,
    setSelectedCoupon,
    shapeIds,
    studentChecked,
    imData,
    studentPrice,
    setStudentDisPrice,
    studentDisPrice,
    setStudentChecked,
    setisForStudent,
    isForStudent,
    couponId,
    setCouponId,
  } = useContext(FilterContext);
  const countryCode = country_code || "IN";
  const [couponsData, setCouponsData] = useState(null);
  const getDiscountText = (val) => {
    if (val.type == "percent") {
      return `EXTRA ${val.value} % Discount`;
    } else if (val.type == "fixed") {
      return `FLAT ${symbol || "₹"} ${val.value} Discount`;
    }
  };
  const handleSelectCoupon = () => {
    setSelectedCoupon(selectedCoupon1);
    setCouponId1(couponId);
    setCouponId(null);
    handleClose();
    if (selectedCoupon1?.type === "fixed") {
      setoverAllPrice(
        Number(mainPrice) -
          Number(selectedCoupon1?.value) +
          Number(deliveryData)
      );
    } else {
      setoverAllPrice(
        Number(mainPrice) -
          (Number(mainPrice) * Number(selectedCoupon1?.value)) / 100 +
          Number(deliveryData)
      );
    }
  };
  const handleChangePromoCode = (e) => {
    const code = e.target.value;
    setPromoCode(code);
    let config1 = {
      url: `${environmentVar?.apiUrl}/api/user/coupons/check_promo?category=0&product=0&variant=0&price=${overAllPrice}&country=${countryCode}&promoCode=${code}`,
      method: "get",
      withCredentials: true,
    };
    axios
      .request(config1)
      .then((response) => {
        if (response?.data) {
          if (
            Array.isArray(response?.data?.data) &&
            response?.data?.data?.length > 0
          ) {
            // console.log(response?.data?.data);
            setSelectedCoupon1(response?.data?.data[0]);
            setPromoCodeError("");
            setPromoCodeMessage("Valid Promo Code");
          } else {
            setSelectedCoupon1(null);
            if (code.length > 2) {
              setPromoCodeError("Invalid Promo Code");
              setPromoCodeMessage("");
            } else {
              setPromoCodeError("");
              setPromoCodeMessage("");
            }
          }
        }
      })
      .catch((error) => console.log(error));
  };
  const handleRemoveCoupon = () => {
    setCouponId(couponId1);
    setSelectedCoupon(null);
    setSelectedCoupon1(null);
    setPromoCodeError("");
    setPromoCodeMessage("");
    setPromoCode("");
    setoverAllPrice(
      Number(mainPrice) + Number(deliveryData) - Number(priceAfterDiscount)
    );
    handleClose();
  };
  const getCouponsData = () => {
    let config = {
      url: `${
        environmentVar?.apiUrl
      }/api/user/coupons/get_available_coupons?category=0&product=0&variant=0&price=${Number(
        overAllPrice
      )?.toFixed(2)}&country=${countryCode}`,
      method: "get",
      withCredentials: true,
    };
    axios
      .request(config)
      .then((response) => setCouponsData(response?.data?.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (overAllPrice > 0) {
      getCouponsData();
    }
  }, [data, show]);

  const getCouponsDataBuyGet = () => {
    let config = {
      method: "get",
      url: `${
        environmentVar?.apiUrl
      }/api/user/coupons/get_buy_coupons_only?country=${country_code || "IN"}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setBuyGetDiscount(response?.data?.data);

        let resDataGlobal = response?.data?.data?.filter(
          (item) => item?.type == "buy_get" && item?.category_id == null
        );
        let resDataCategory = response?.data?.data?.filter(
          (item) => item?.type == "buy_get" && item?.category_id != null
        );

        setBuyGetGlobal(resDataGlobal);
        setBuyGetCategory(resDataCategory);
      })
      .catch((error) => {
        setBuyGetDiscount([]);
        setBuyGetGlobal([]);
        setBuyGetCategory([]);
      });
  };

  const navigate = useNavigate(null);

  const functiontogetBuyGetData = (calculatedPrice) => {
    let hihestAmountArr = sortedArray?.slice(
      -Number(buyGetDiscount?.buy_product)
    );
    let lowestAmountArr = sortedArray?.slice(
      0,
      Number(buyGetDiscount?.get_product)
    );

    setPriceAfterDiscount(
      lowestAmountArr?.reduce((acc, val) => acc + parseFloat(val), 0)
    );

    setoverAllPrice(
      Number(calculatedPrice) -
        Number(lowestAmountArr?.reduce((acc, val) => acc + parseFloat(val), 0))
    );
  };
  const calculateOverallPrice = () => {
    if (selectedCoupon?.type === "fixed") {
      let calculatedPrice = 0;

      const duplicatedVariants = data?.flatMap(({ quantity, ...rest }) =>
        Array.from({ length: quantity }, () => ({ quantity: 1, ...rest }))
      );
      // setIndividualArray(duplicatedVariants);
      duplicatedVariants?.forEach((item) => {
        const variant = item?.variants[0];

        if (variant) {
          const discount = variant.variant_price_details[0].discount;
          const price = variant.variant_price_details[0].price;

          const discountedPrice = price - (price * discount) / 100;
          let totalPriceForProduct = discountedPrice * item.quantity;

          calculatedPrice += totalPriceForProduct;
        }
      });
      setMainPrice(calculatedPrice);
      setoverAllPrice(
        Number(calculatedPrice) -
          Number(selectedCoupon?.value) +
          Number(deliveryData)
      );
    } else if (selectedCoupon?.type === "percent" && !studentChecked) {
      let calculatedPrice = 0;
      const duplicatedVariants = data?.flatMap(({ quantity, ...rest }) =>
        Array.from({ length: quantity }, () => ({ quantity: 1, ...rest }))
      );
      // setIndividualArray(duplicatedVariants);
      duplicatedVariants?.forEach((item) => {
        const variant = item?.variants[0];

        if (variant) {
          const discount = variant.variant_price_details[0].discount;
          const price = variant.variant_price_details[0].price;

          const discountedPrice = price - (price * discount) / 100;
          let totalPriceForProduct = discountedPrice * item.quantity;

          calculatedPrice += totalPriceForProduct;
        }
      });
      setMainPrice(calculatedPrice);
      setoverAllPrice(
        Number(calculatedPrice) -
          (Number(calculatedPrice) * Number(selectedCoupon?.value)) / 100 +
          Number(deliveryData)
      );
    } else if (imData && studentChecked) {
      let calculatedPrice = 0;
      let studenPrice = [];
      const duplicatedVariants = data?.flatMap(({ quantity, ...rest }) =>
        Array.from({ length: quantity }, () => ({ quantity: 1, ...rest }))
      );
      // setIndividualArray(duplicatedVariants);
      duplicatedVariants?.forEach((item) => {
        const variant = item?.variants[0];

        if (variant) {
          const discount = variant?.variant_price_details?.[0]?.discount;
          const price = variant?.variant_price_details?.[0]?.price;

          const discountedPrice = price - (price * discount) / 100;
          const totalPriceForProduct = discountedPrice * item.quantity;

          // prices?.push(Number(totalPriceForProduct)?.toFixed(2));

          // if(item?.is_student==1){
          //   studenPrice?.push(totalPriceForProduct)
          // }
          if (item?.is_student) {
            studenPrice?.push(Number(totalPriceForProduct)?.toFixed(2));
          }

          if (
            item.is_student === 1 &&
            imData &&
            studentChecked &&
            studentPrice?.discount != undefined
          ) {
            let sum = studenPrice.reduce(
              (accumulator, currentValue) =>
                accumulator + parseFloat(currentValue),
              0
            );
            imData.discount_amount =
              (Number(sum) * studentPrice?.discount) / 100;
            setStudentDisPrice((Number(sum) * studentPrice?.discount) / 100);
          }
          calculatedPrice += totalPriceForProduct;
        }
      });
      // setSortedArray(prices?.sort());
      setMainPrice(calculatedPrice);
      setoverAllPrice(Number(calculatedPrice) - Number(studentDisPrice));
    } else {
      const duplicatedVariants = data?.flatMap(({ quantity, ...rest }) =>
        Array.from({ length: quantity }, () => ({ quantity: 1, ...rest }))
      );
      setIndividualArray(duplicatedVariants);
      let sameCatIdProductObj = {};
      //1+1 ,,,1+1,,4,
      for (let le of duplicatedVariants) {
        if (sameCatIdProductObj[le.cat_id]) {
          sameCatIdProductObj[le.cat_id].push(le);
        } else {
          sameCatIdProductObj[le.cat_id] = [le];
        }
      }
      let tempPrices = [];
      let tempTotalPrice = [];
      let insideLoop = false;
      let showDiscoutPrice = 0;
      let tempOverAllAmountShow = 0;
      for (let le in sameCatIdProductObj) {
        sameCatIdProductObj[le]?.forEach((item) => {
          const variant = item?.variants[0];
          if (variant) {
            const discount = variant?.variant_price_details?.[0]?.discount;
            const price = variant?.variant_price_details?.[0]?.price;

            const discountedPrice = price - (price * discount) / 100;
            const totalPriceForProduct = discountedPrice * item.quantity;
            tempTotalPrice.push(totalPriceForProduct);
          }
        });

        if (buyGetCategory && buyGetCategory.length) {
          for (let el of buyGetCategory) {
            let totalProduct =
              Number(el?.buy_product) + Number(el?.get_product);
            if (
              le == el?.category_id &&
              totalProduct <= sameCatIdProductObj[le]?.length
            ) {
              insideLoop = true;

              sameCatIdProductObj[le]?.forEach((item) => {
                const variant = item?.variants[0];
                if (variant) {
                  const discount =
                    variant?.variant_price_details?.[0]?.discount;
                  const price = variant?.variant_price_details?.[0]?.price;

                  const discountedPrice = price - (price * discount) / 100;
                  const totalPriceForProduct = discountedPrice * item.quantity;
                  tempPrices?.push(Number(totalPriceForProduct)?.toFixed(2));

                  // if (item?.is_student) {
                  //   studenPrice?.push(Number(totalPriceForProduct)?.toFixed(2));
                  // }

                  // if (
                  //   item.is_student === 1 &&
                  //   imData &&
                  //   studentChecked &&
                  //   studentPrice?.discount != undefined
                  // ) {
                  //   let sum = studenPrice.reduce(
                  //     (accumulator, currentValue) =>
                  //       accumulator + parseFloat(currentValue),
                  //     0
                  //   );
                  //   imData.discount_amount = (Number(sum) * studentPrice?.discount) / 100;
                  //   setStudentDisPrice((Number(sum) * studentPrice?.discount) / 100);
                  // }
                  // calculatedPrice += totalPriceForProduct;
                }
              });
              tempPrices = tempPrices.sort((x, y) => x - y);
              let sliceArr = tempPrices.slice(0, el?.get_product);
              showDiscoutPrice = sliceArr?.reduce(
                (acc, val) => acc + parseFloat(val),
                0
              );
              let remainingItems = tempPrices.slice(sliceArr.length);
              tempOverAllAmountShow = remainingItems?.reduce(
                (acc, b) => acc + parseFloat(b),
                0
              );

              setPriceAfterDiscount(showDiscoutPrice);
              setCouponId(el?.id);
              setoverAllPrice(
                Number(tempOverAllAmountShow) + Number(deliveryData)
              );
            }

            const findSameCatProduct = duplicatedVariants?.find(
              (item) => item?.cat_id == el?.category_id
            );

            setSameCategoryProduct(findSameCatProduct);
          }
        }
      }

      let insideGlobalLoop = false;
      for (let le in sameCatIdProductObj) {
        let check = buyGetCategory.find((elem) => elem?.category_id == le);
        if (!check) {
          insideLoop = false;

          break;
        } else if (
          le == check?.category_id &&
          sameCatIdProductObj[le]?.length <
            Number(check?.get_product) + Number(check?.buy_product)
        ) {
          insideLoop = false;
          break;
        }
      }
      if (insideLoop == false) {
        let tempGlobalobj = {};
        tempPrices = [];
        if (buyGetGlobal && buyGetGlobal?.length) {
          for (let el of buyGetGlobal) {
            if (
              Number(el?.buy_product) + Number(el?.get_product) <=
              duplicatedVariants?.length
            ) {
              tempGlobalobj = el;
              insideGlobalLoop = true;
            }
            // const findSameCatProduct = duplicatedVariants?.find(item=>item?.cat_id == el?.category_id)

            // setSameCategoryProduct(findSameCatProduct)
          }
          if (tempGlobalobj && tempGlobalobj?.id) {
            duplicatedVariants?.forEach((item) => {
              const variant = item?.variants[0];
              if (variant) {
                const discount = variant?.variant_price_details?.[0]?.discount;
                const price = variant?.variant_price_details?.[0]?.price;

                const discountedPrice = price - (price * discount) / 100;
                const totalPriceForProduct = discountedPrice * item.quantity;
                tempPrices?.push(Number(totalPriceForProduct)?.toFixed(2));
                // if (item?.is_student) {
                //   studenPrice?.push(Number(totalPriceForProduct)?.toFixed(2));
                // }

                // if (
                //   item.is_student === 1 &&
                //   imData &&
                //   studentChecked &&
                //   studentPrice?.discount != undefined
                // ) {
                //   let sum = studenPrice.reduce(
                //     (accumulator, currentValue) =>
                //       accumulator + parseFloat(currentValue),
                //     0
                //   );
                //   imData.discount_amount = (Number(sum) * studentPrice?.discount) / 100;
                //   setStudentDisPrice((Number(sum) * studentPrice?.discount) / 100);
                // }
                // calculatedPrice += totalPriceForProduct;
              }
            });
            tempPrices = tempPrices.sort((x, y) => x - y);

            let sliceArr = tempPrices.slice(0, tempGlobalobj?.get_product);
            // let showDiscoutPrice = 0;
            showDiscoutPrice = sliceArr?.reduce(
              (acc, val) => acc + parseFloat(val),
              0
            );
            let remainingItems = tempPrices.slice(sliceArr.length);
            tempOverAllAmountShow = remainingItems?.reduce(
              (acc, b) => acc + parseFloat(b),
              0
            );

            setoverAllPrice(
              Number(tempOverAllAmountShow) + Number(deliveryData)
            );
            setCouponId(tempGlobalobj?.id);
            setPriceAfterDiscount(showDiscoutPrice);
          }
        }
      }

      let tempTotalShow = tempTotalPrice?.reduce(
        (acc, bcc) => acc + parseFloat(bcc),
        0
      );
      if (insideLoop == false && insideGlobalLoop == false) {
        setPriceAfterDiscount(0);
        setoverAllPrice(Number(tempTotalShow) + Number(deliveryData));
      }
      setMainPrice(tempTotalShow.toFixed(2));
    }
  };

  useEffect(() => {
    calculateOverallPrice();
    return () => {
      setCouponId(null);
    };
  }, [
    data,
    studentChecked,
    imData,
    studentDisPrice,
    studentPrice,
    buyGetDiscount,
    status,
    deliveryData,
  ]);

  // const getDeliveryData = ()=>{

  //   let config = {
  //     method: 'get',
  //     url: `${environmentVar?.apiUrl}/api/user/delivery/get_delivery_data?country_code=${country_code || "IN"}`,
  //     withCredentials: true,
  //   };

  //   axios.request(config)
  //   .then((response) => {
  //     setDeliveryData(response?.data?.data)
  //   })
  //   .catch((error) => {
  //     setDeliveryData()
  //   });
  // }
  useEffect(() => {
    if (data?.length) {
      const hasStudentObject = data.some((item) => item.is_student === 1);
      setisForStudent(hasStudentObject);
      setStudentChecked(hasStudentObject);
    } else {
      setisForStudent(false);
      setStudentChecked(false);
    }
  }, []);
  useEffect(() => {
    getCouponsDataBuyGet();
    setDeliveryData(0);
    // getDeliveryData();
  }, []);

  return (
    <>
      <Col lg={4}>
        <h1 className="cart-heading">Bill Details</h1>
        <BillDetailsInfo
          data={data}
          couponPrice={selectedCoupon}
          goldMemberShip={goldMemberShip}
          overAllPrice={overAllPrice}
          mainPrice={mainPrice}
          setMainPrice={setMainPrice}
          setoverAllPrice={setoverAllPrice}
          priceAfterDiscount={priceAfterDiscount}
          buyGetDiscount={buyGetDiscount}
          deliveryData={deliveryData}
          individualArray={individualArray}
          sameCategoryProduct={sameCategoryProduct}
        />

        {/* {
          imData && studentChecked ? <></>:
          selectedCoupon !=null ? <></>: 
          buyGetDiscount?.map((item,key)=>{
           
            if(individualArray?.length > Number(item?.buy_product)+ Number(item?.get_product)){
              if(item?.id!=couponId){
                return(
                  <div></div>
                )
               }else{
                return (
                  <div className="offer-applied">Buy {item?.buy_product} Get {item?.get_product} offer Applied! </div>
                )
               }
            }else{
              if(item?.id!=couponId){
                if(sameCategoryProduct && individualArray?.length < Number(item?.buy_product)+ Number(item?.get_product)){              
                    return(
                      <div className="offer-applied">Buy {item?.buy_product} items and get {item?.get_product} more for !</div> 
                    )                  
                }else{
                  if((individualArray?.length > Number(item?.buy_product)+ Number(item?.get_product))){
                    return(
                      <div className="offer-applied">Buy {item?.buy_product} items and get {item?.get_product} more for free!</div> 
                    )
                  } 

                  if(item?.category_id == null){
                    return(
                      <div className="offer-applied">Buy {item?.buy_product} items and get {item?.get_product} more for free!</div> 
                    )
                  }
                }
                
               }else{

                return (
                  <div className="offer-applied">Buy {item?.buy_product} Get {item?.get_product} offer Applied! </div>
                )
               }
            }
           
           
          })
        } */}
        {/* {imData && studentChecked ? (
          <></>
        ) : buyGetDiscount && buyGetDiscount?.id ? (
          data?.buynow ? (
            data?.quantity <
            Number(buyGetDiscount?.get_product) +
              Number(buyGetDiscount?.buy_product) ? (
              <>
                Add{" "}
                {Number(buyGetDiscount?.get_product) +
                  Number(buyGetDiscount?.buy_product) -
                  data?.quantity}{" "}
                more quantity to get offer
              </>
            ) : data?.quantity ==
                Number(buyGetDiscount?.get_product) +
                  Number(buyGetDiscount?.buy_product) ||
              data?.quantity >
                Number(buyGetDiscount?.get_product) +
                  Number(buyGetDiscount?.buy_product) ? (
              <></>
            ) : (
              <div>
                Add {buyGetDiscount?.get_product} more quantity to get offer
              </div>
            )
          ) : imData &&
            studentChecked &&
            studentPrice?.discount != undefined ? (
            <></>
          ) : individualArray?.length <
            Number(buyGetDiscount?.get_product) +
              Number(buyGetDiscount?.buy_product) ? (
            <>
              Add{" "}
              {Number(buyGetDiscount?.get_product) +
                Number(buyGetDiscount?.buy_product) -
                individualArray?.length}{" "}
              more products to get offer
            </>
          ) : individualArray?.length ==
              Number(buyGetDiscount?.get_product) +
                Number(buyGetDiscount?.buy_product) ||
            individualArray?.length >
              Number(buyGetDiscount?.get_product) +
                Number(buyGetDiscount?.buy_product) ? (
            <></>
          ) : (
            <div>
              Add {buyGetDiscount?.get_product} more products to get offer
            </div>
          )
        ) : (
          <></>
        )} */}

        <div className="apply-coupens-main">
          <div className="apply-coupens-main-left">
            <h2>Apply Coupon</h2>
            <h3>Check available offers</h3>
          </div>
          <Button
            className="apply-coupens-main-right"
            onClick={handleShow}
            disabled={studentChecked}
          >
            <FontAwesomeIcon
              icon={faArrowRightLong}
              size="2x"
              className="apply-arrow-icon"
            />
          </Button>

          <Modal show={show} onHide={handleClose} className="coupon-modal-main">
            <div className="modal-inputs-coupon">
              <h2>Coupons for you</h2>
              <div style={{ position: "relative" }} className="entercode">
                <div className="modal-inputs-remove">
                  <input
                    value={promoCode}
                    type="text"
                    placeholder="ENTER COUPON CODE "
                    onChange={handleChangePromoCode}
                  />
                  {selectedCoupon1 == null ? (
                    <></>
                  ) : (
                    <div className="remove-text" onClick={handleRemoveCoupon}>
                      remove
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSelectCoupon}
                  className="coupon-apply-button"
                  disabled={selectedCoupon1?.code ? false : true}
                >
                  Apply
                </button>
                <div
                  style={{
                    color: "red",
                    fontSize: "14px",
                    top: "60px",
                    left: "2px",
                    position: "absolute",
                  }}
                >
                  {promoCodeError}
                </div>
                <div
                  style={{
                    color: "green",
                    fontSize: "14px",
                    top: "60px",
                    left: "2px",
                    position: "absolute",
                  }}
                >
                  {promoCodeMessage}
                </div>
              </div>
              <h3>Best Offers for you</h3>
              {couponsData && couponsData.length > 0 ? (
                <>
                  {couponsData.map((val, index) => (
                    <div className="apply-coupon-box" key={index}>
                      <div className="apply-coupon-box-left">
                        <h2 style={{ textTransform: "uppercase" }}>
                          {val?.name}
                        </h2>
                        <h3>{`${getDiscountText(val)}`}</h3>
                      </div>
                      <div className="apply-coupon-button">
                        <h2
                          onClick={() => {
                            setSelectedCoupon1(val);
                            setPromoCode(val?.code);
                          }}
                        >
                          {val?.id == selectedCoupon1?.id
                            ? "Selected"
                            : "Select"}
                        </h2>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>No Coupons Available for selected Country</>
              )}
            </div>
          </Modal>
        </div>
        <StudentOffer data={data} />
        <div
          className="proceed-button"
          onClick={() => navigate("/checkout", { state: data })}
        >
          Proceed to checkout
        </div>
      </Col>
    </>
  );
};

export default BillDetails;
