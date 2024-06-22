import React, { useContext, useEffect, useState } from "react";
import BillDetailsInfo from "../CartDetails/BillDetailsInfo";
import { Col } from "react-bootstrap";
import "./OrderSummary.scss";
import OrderSummaryItem from "./OrderSummaryItem";
import PaymentOptions from "./PaymentOptions";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FilterContext } from "../../context/FilterContext";
import Loader from "../Common/Loader/Loader";
import { load } from "@cashfreepayments/cashfree-js";
import {
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import StudentOffer from "./StudentOffer";

const OrderSummary = ({
  selectedAddress,
  zipcode,
  availabilityError,
  setAvailabilityError,
  selectMobile,
}) => {
  const location = useLocation();
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
    updateStateCart,
    setUpdateStateCart,
    couponId,
    setCouponId,
  } = useContext(FilterContext);

  const createPaymentIntent = (orderData, sub_total, orderId) => {
    let dataAmount =
      orderData?.is_student_info_id && payOption == 2
        ? Number(orderData?.delivery_charges) > Number(sub_total)
          ? Math.round(
              (Number(orderData?.delivery_charges) - Number(sub_total)) * 100
            ).toString()
          : Math.round(
              (Number(sub_total) + Number(orderData?.delivery_charges)) * 100
            ).toString()
        : Math.round(
            (Number(sub_total) + Number(orderData?.delivery_charges)) * 100
          ).toString();

    let data = {
      amount: dataAmount,
      currency: "inr",
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/order/create_payment_intent`,
      withCredentials: true,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const clientSecret = response.data.data.client_secret;
        let subtotal =
          orderData?.is_student_info_id && payOption == 2
            ? Number(orderData?.delivery_charges) > Number(sub_total)
              ? (
                  Number(orderData?.delivery_charges) - Number(sub_total)
                )?.toFixed(2)
              : (
                  Number(sub_total) + Number(orderData?.delivery_charges)
                )?.toFixed(2)
            : (
                Number(sub_total) + Number(orderData?.delivery_charges)
              )?.toFixed(2);
        setIsSubmit(false);
        setUpdateStateCart(!updateStateCart);
        setSelectedCoupon(null);
        navigate("/payment", {
          state: {
            clientSecret: clientSecret,
            sub_total: subtotal,
            orderId: orderId,
          },
        });
      })
      .catch((error) => {
        setIsSubmit(false);
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
  };

  const createOrderCashfree = (orderData, sub_total, orderId, mobileNumber) => {
    try {
      let dataAmount =
        orderData?.is_student_info_id && payOption == 2
          ? Number(orderData?.delivery_charges) > Number(sub_total)
            ? Math.round(
                Number(orderData?.delivery_charges) - Number(sub_total)
              ).toString()
            : Math.round(
                Number(sub_total) + Number(orderData?.delivery_charges)
              ).toString()
          : Math.round(
              Number(sub_total) + Number(orderData?.delivery_charges)
            ).toString();

      let data = {
        amount: dataAmount,
        currency: "INR",
        orderId: `order-${orderId}`,
        phone: mobileNumber,
        payment_mode: "cashfree",
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${environmentVar?.apiUrl}/api/order/cashfree_create_order`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          const doPayment = async () => {
            let checkoutOptions = {
              paymentSessionId: response?.data?.data?.payment_session_id,
              redirectTarget: "_self",
            };
            cashfree.checkout(checkoutOptions);
          };
          doPayment();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const createPaymentUsingPaymentNetworkGateaway = (
    orderData,
    sub_total,
    orderId
  ) => {
    let data = {
      amount: Math.round(
        (Number(sub_total) + Number(orderData?.delivery_charges)) * 100
      ),
      currencyCode: "AED",
      action: "PURCHASE",
      orderId: orderId?.toString(),
      payment_mode: "networkpaymentgateway",
    };

    let config = {
      method: "post",
      url: `${environmentVar?.apiUrl}/api/order/createpaymentusingnetwork`,
      withCredentials: true,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // const clientSecret = response.data.data.client_secret;
        setIsSubmit(false);
        // navigate(`/payment`, {
        //   state: {
        //     clientSecret: clientSecret,
        //     sub_total: (
        //       Number(sub_total) + Number(orderData?.delivery_charges)
        //     )?.toFixed(2),
        //     orderId: orderId,
        //   },
        // });
        setSelectedCoupon(null);
        setUpdateStateCart(!updateStateCart);
        window.location.href = response?.data?.data?._links?.payment?.href;
      })
      .catch((error) => {
        setIsSubmit(false);
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
  };

  const [show, setShow] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [payOption, setPayOption] = useState("1");
  const [payMethod, setPayMethod] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedCoupon1, setSelectedCoupon1] = useState(null);
  const [couponsData, setCouponsData] = useState(null);
  const [couponPrice, setCouponPrice] = useState(0);
  const [checkedTermConditions, setCheckedTermConditions] = useState(false);
  const [onlinePaymentData, setOnlinePaymentData] = useState();
  const [buyGetDiscount, setBuyGetDiscount] = useState([]);
  const [buyGetGlobal, setBuyGetGlobal] = useState([]);
  const [buyGetCategory, setBuyGetCategory] = useState([]);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState();
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [promoCodeError, setPromoCodeError] = useState("");
  const [promoCodeMessage, setPromoCodeMessage] = useState("");
  const [sortedArray, setSortedArray] = useState([]);
  const [individualArray, setIndividualArray] = useState([]);
  const [deliveryData, setDeliveryData] = useState();
  const [deliveryCharges, setDeliveryCharges] = useState();
  const [goldMemberShip, setGoldMembershipPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [sameCategoryProduct, setSameCategoryProduct] = useState();
  const [cashfree, setCashfree] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  // const [couponId, setCouponId] = useState();
  const navigate = useNavigate();
  let initializeSDK = async function () {
    let cashfree1 = await load({
      mode: "sandbox",
    });
    setCashfree(cashfree1);
  };

  useEffect(() => {
    initializeSDK();
  }, []);
  const countryCode = country_code || "IN";
  const [mainPrice, setMainPrice] = useState(0);
  const [overAllPrice, setoverAllPrice] = useState("");

  const handleShow = () => setShow(true);
  const handleShowCoupon = () => setShowCoupon(true);
  const handleClose = () => setShow(false);
  const handleCloseCoupon = () => setShowCoupon(false);
  const getPaymentOptions = () => {
    let config = {
      url: `${environmentVar?.apiUrl}/api/payment/get_payment_options/${country_code}`,
      method: "get",
      withCredentials: true,
    };
    axios
      .request(config)
      .then((response) => {
        setPaymentOptions(response?.data?.data[0]);
        setPayMethod(response?.data?.data[0]?.payment_options[0]?.option);
      })
      .catch((error) => console.log(error));
  };

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

  const sumUpofAllProductsQuantity = () => {
    let total = 0;
    location?.state?.forEach((item) => {
      total += Number(item.quantity);
    });
    return total;
  };
  useEffect(() => {
    if (buyGetDiscount?.type == "buy_get" && !location?.state?.buynow) {
      setTotalQuantity(sumUpofAllProductsQuantity());
    }
    getPaymentOptions();
    getCouponsDataBuyGet();
  }, []);
  useEffect(() => {
    if (location?.state?.length) {
      const hasStudentObject = location?.state.some(
        (item) => item.is_student === 1
      );
      setisForStudent(hasStudentObject);
      setStudentChecked(false);
    } else if (location?.state?.is_student === 1) {
      setisForStudent(true);
      setStudentChecked(false);
    } else {
      setisForStudent(false);
      setStudentChecked(false);
    }
  }, []);
  const checkAvailability = async () => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/user/zip_code/is_product_available?country_code=${countryCode}&zipcode=${zipcode}`,
    };

    try {
      const response = await axios.request(config);
      return response?.data?.success;
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message, {
        autoClose: 2000,
      });
    }
  };
  const ProceedToPayment = async () => {
    if (selectedAddress == undefined) {
      toast.error("No Address Saved", {
        autoClose: 2000,
      });
      setAvailabilityError("No Address Saved");
    } else {
      const checkAvailable = true;
      // const checkAvailable = await checkAvailability();

      if (checkAvailable == false) {
        toast.error("Product not available on selected location", {
          autoClose: 2000,
        });
        setAvailabilityError("Product Not Available on Selected Location");
        return;
      }
      if (!checkedTermConditions) {
        toast.error("Please accept terms and conditions", {
          autoClose: 2000,
        });
        return;
      }
      Swal.fire({
        title: "Order Confirmation",
        text: "You are about to place order",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Proceed",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsSubmit(true);
          if (location?.state?.buynow) {
            let calculatedPrice = 0;
            const discount = location?.state?.variant_price_details[0].discount;
            const price = location?.state?.variant_price_details[0].price;

            const discountedPrice = price - (price * discount) / 100;
            const totalPriceForProduct =
              discountedPrice * location?.state.quantity;

            calculatedPrice += totalPriceForProduct;

            let overAllAmount =
              studentChecked && imData && studentDisPrice > 0
                ? payOption == 2
                  ? (
                      overAllPrice -
                      (overAllPrice * onlinePaymentData?.discount) / 100
                    )?.toFixed(2)
                  : overAllPrice?.toFixed(2)
                : payOption == 2
                ? (
                    overAllPrice -
                    (overAllPrice * onlinePaymentData?.discount) / 100
                  )?.toFixed(2)
                : overAllPrice?.toFixed(2);

            let netDelivery_charge =
              studentChecked && imData && studentDisPrice > 0
                ? payOption == 2
                  ? Number(studentPrice.delivery_charges)
                  : studentPrice.delivery_charges ?? deliveryData
                : deliveryData;

            const sub_total =
              studentChecked && imData
                ? payOption == 2
                  ? (
                      ((Number(overAllAmount) + Number(netDelivery_charge)) *
                        onlinePaymentData?.discount) /
                      100
                    )?.toFixed(2)
                  : "0"
                : (Number(overAllAmount) - Number(deliveryData))?.toFixed(2);

            let data = {
              address_id: selectedAddress?.toString(),
              variant_quantity: [
                {
                  variant_id: location?.state?.variant_id?.toString(),
                  quantity: location?.state?.quantity,
                  variant_name: location?.state?.title,
                  thumbnail_url: location?.state?.thumbnail_url,
                  product_id: location?.state?.product_id,
                  is_student: location?.state?.is_student,
                  product_price: discountedPrice,
                },
              ],

              is_student_info_id: studentChecked && imData ? imData?.id : 0,
              sub_total: sub_total,
              delivery_charges: Number(netDelivery_charge)?.toFixed(2),
              payment_method: payMethod,
              country_code: countryCode,
            };

            if (
              !(
                imData &&
                studentChecked &&
                studentPrice?.discount !== undefined
              )
            ) {
              if (selectedCoupon == null) {
                data.coupon_id = couponId?.toString();
              } else {
                data.coupon_id = selectedCoupon?.id?.toString();
              }
            }
            let config = {
              method: "post",
              url: `${environmentVar?.apiUrl}/api/order/create_order`,
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
              data: data,
            };

            axios
              .request(config)
              .then((response) => {
                if (payOption == "1") {
                  setIsSubmit(false);
                  toast.success(response?.data?.message, {
                    autoClose: 2000,
                  });
                  setSelectedCoupon(null);
                  setUpdateStateCart(!updateStateCart);
                  navigate("/orderhistory");
                } else {
                  let main_total =
                    studentChecked && imData
                      ? payOption == 2
                        ? (
                            ((Number(overAllAmount) +
                              Number(netDelivery_charge)) *
                              onlinePaymentData?.discount) /
                            100
                          )?.toFixed(2)
                        : "0"
                      : (Number(overAllAmount) - Number(deliveryData))?.toFixed(
                          2
                        );
                  if (country_code == "AE") {
                    createPaymentUsingPaymentNetworkGateaway(
                      data,
                      main_total,
                      response.data.order_id
                    );
                  } else {
                    // alert(111)
                    // createPaymentIntent(
                    //   data,
                    //   main_total,
                    //   response.data.order_id
                    // );
                    createOrderCashfree(
                      data,
                      main_total,
                      response.data.order_id,
                      selectMobile?.split("-")[1]
                    );
                  }
                }
              })
              .catch((error) => {
                setIsSubmit(false);
                toast.error(error?.response?.data?.message || error?.message, {
                  autoClose: 2000,
                });
              });
          } else {
            const variantQuantityArray = location?.state.map((product) => {
              const discount =
                product?.variants?.[0]?.variant_price_details[0].discount;
              const price =
                product?.variants?.[0]?.variant_price_details[0].price;

              const discountedPrice = price - (price * discount) / 100;

              return {
                variant_id: product.product_variant_id?.toString(),
                quantity: product.quantity,
                variant_name: product?.variants?.[0]?.variant_name,
                thumbnail_url: product?.variants?.[0]?.thumbnail_url,
                product_id: product?.product_id,
                is_student: product?.is_student,
                product_price: discountedPrice,
              };
            });
            let calculatedPrice = 0;

            location?.state?.forEach((item) => {
              const variant = item?.variants[0];

              if (variant) {
                const discount = variant.variant_price_details[0].discount;
                const price = variant.variant_price_details[0].price;

                const discountedPrice = price - (price * discount) / 100;
                const totalPriceForProduct = discountedPrice * item.quantity;

                calculatedPrice += totalPriceForProduct;
                return calculatedPrice;
              }
            });
            const sub_total = (
              calculatedPrice -
              couponPrice -
              goldMemberShip
            )?.toFixed(2);

            let netDelivery_charge =
              studentChecked && imData && studentDisPrice > 0
                ? payOption == 2
                  ? studentPrice.delivery_charges
                  : studentPrice.delivery_charges ?? deliveryData
                : deliveryData;
            let overAllAmount =
              studentChecked && imData && studentDisPrice > 0
                ? payOption == 2
                  ? (
                      Number(overAllPrice) +
                      Number(netDelivery_charge) -
                      ((Number(overAllPrice) + Number(netDelivery_charge)) *
                        onlinePaymentData?.discount) /
                        100
                    )?.toFixed(2)
                  : overAllPrice?.toFixed(2)
                : payOption == 2
                ? (
                    overAllPrice -
                    (overAllPrice * onlinePaymentData?.discount) / 100
                  )?.toFixed(2)
                : overAllPrice?.toFixed(2);

            let data = {
              address_id: selectedAddress?.toString(),
              is_student_info_id: studentChecked && imData ? imData?.id : 0,
              variant_quantity: variantQuantityArray,
              sub_total:
                studentChecked && imData
                  ? payOption == 2
                    ? Number(netDelivery_charge) > Number(overAllAmount)
                      ? (
                          Number(netDelivery_charge) - Number(overAllAmount)
                        )?.toString()
                      : (
                          Number(overAllAmount) - Number(netDelivery_charge)
                        )?.toString()
                    : Number(overAllAmount)?.toString()
                  : (Number(overAllAmount) - Number(deliveryData))?.toString(),
              delivery_charges: Number(netDelivery_charge)?.toFixed(2),
              payment_method: payMethod,
              country_code: countryCode,
            };

            if (
              !(
                imData &&
                studentChecked &&
                studentPrice?.discount !== undefined
              )
            ) {
              if (selectedCoupon == null) {
                data.coupon_id = couponId?.toString();
              } else {
                data.coupon_id = selectedCoupon?.id?.toString();
              }
            }

            let config = {
              method: "post",
              url: `${environmentVar?.apiUrl}/api/order/create_order`,
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
              data: data,
            };
            axios
              .request(config)
              .then((response) => {
                if (payOption == "1") {
                  setIsSubmit(false);

                  toast.success(response?.data?.message, {
                    autoClose: 2000,
                  });
                  setUpdateStateCart(!updateStateCart);
                  navigate("/orderhistory");
                } else {
                  if (country_code == "AE") {
                    createPaymentUsingPaymentNetworkGateaway(
                      data,
                      studentChecked && imData
                        ? payOption == 2
                          ? Number(netDelivery_charge) > Number(overAllAmount)
                            ? Number(netDelivery_charge) - Number(overAllAmount)
                            : Number(overAllAmount) - Number(netDelivery_charge)
                          : Number(overAllAmount)
                        : (
                            Number(overAllAmount) - Number(deliveryData)
                          )?.toFixed(2),
                      response.data.order_id
                    );
                  } else {
                    // createPaymentIntent(
                    //   data,
                    //   studentChecked && imData ? payOption == 2 ? Number(netDelivery_charge) > Number(overAllAmount) ? (Number(netDelivery_charge) - Number(overAllAmount)) :(Number(overAllAmount) - Number(netDelivery_charge)) : Number(overAllAmount) :  (Number(overAllAmount) - Number(deliveryData))?.toFixed(2),
                    //   response.data.order_id
                    // );
                    createOrderCashfree(
                      data,
                      studentChecked && imData
                        ? payOption == 2
                          ? Number(netDelivery_charge) > Number(overAllAmount)
                            ? Number(netDelivery_charge) - Number(overAllAmount)
                            : Number(overAllAmount) - Number(netDelivery_charge)
                          : Number(overAllAmount)
                        : (
                            Number(overAllAmount) - Number(deliveryData)
                          )?.toFixed(2),
                      response.data.order_id,
                      selectMobile?.split("-")[1]
                    );
                  }
                }
              })
              .catch((error) => {
                setIsSubmit(false);
                toast.error(error?.response?.data?.message || error?.message, {
                  autoClose: 2000,
                });
              });
          }
        }
      });
    }
  };

  const functiontogetBuyGetData = (data) => {
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
      Number(mainPrice) -
        Number(lowestAmountArr?.reduce((acc, val) => acc + parseFloat(val), 0))
    );
  };
  const calculateOverallPrice = () => {
    if (location?.state?.buynow) {
      const discount = location?.state?.variant_price_details[0].discount;
      const price = location?.state?.variant_price_details[0].price;

      const discountedPrice = price - (price * discount) / 100;
      const totalPriceForProduct = discountedPrice * location?.state?.quantity;

      let findCatExist = buyGetCategory?.find(
        (item) => item?.category_id == location?.state?.cat_id
      );
      setMainPrice(totalPriceForProduct);
      // findCatExist = {};
      if (selectedCoupon?.type === "fixed") {
        setoverAllPrice(
          Number(totalPriceForProduct) -
            Number(selectedCoupon?.value) +
            Number(deliveryData)
        );
      } else if (selectedCoupon?.type === "percent" && !studentChecked) {
        setoverAllPrice(
          Number(totalPriceForProduct) -
            (Number(totalPriceForProduct) * Number(selectedCoupon?.value)) /
              100 +
            Number(deliveryData)
        );
      } else if (
        imData &&
        studentChecked &&
        studentPrice?.discount != undefined
      ) {
        const sDiscount =
          Number(totalPriceForProduct) -
          (Number(totalPriceForProduct) * Number(studentPrice.discount ?? 1)) /
            100;
        imData.discount_amount =
          (Number(totalPriceForProduct) * Number(studentPrice.discount ?? 1)) /
          100;

        setStudentDisPrice(
          (Number(totalPriceForProduct) * Number(studentPrice.discount ?? 1)) /
            100
        );
        setoverAllPrice(sDiscount);
      } else {
        if (findCatExist && findCatExist?.id) {
          setSameCategoryProduct(findCatExist);

          if (
            Number(findCatExist?.get_product) +
              Number(findCatExist?.buy_product) >
            location?.state?.quantity
          ) {
            let previousData = null;
            let amountData = [];
            for (let i of buyGetCategory) {
              const totalProducts =
                Number(i?.buy_product) + Number(i?.get_product);
              amountData.push(totalProducts);
              const quantity = location?.state?.quantity;
              if (quantity > totalProducts) {
                setCouponId(i?.id);

                previousData = {
                  priceAfterDiscount:
                    Number(i?.get_product) * Number(discountedPrice),
                  overAllPrice:
                    Number(totalPriceForProduct) -
                    Number(i?.get_product) * Number(discountedPrice),
                };
                continue;
              }

              if (quantity === totalProducts) {
                setPriceAfterDiscount(
                  Number(i?.get_product) * Number(discountedPrice)
                );
                setCouponId(i?.id);

                setoverAllPrice(
                  Number(totalPriceForProduct) -
                    Number(i?.get_product) * Number(discountedPrice) +
                    Number(deliveryData)
                );
                break;
              }

              if (quantity < totalProducts) {
                if (previousData) {
                  setPriceAfterDiscount(previousData.priceAfterDiscount);
                  setoverAllPrice(previousData.overAllPrice);
                } else {
                  setPriceAfterDiscount(0);
                  setoverAllPrice(
                    Number(totalPriceForProduct) + Number(deliveryData)
                  );
                }
                break; // Exit the loop since the condition is met
              }
            }
            let highestValue = false;
            for (let le of amountData) {
              if (location?.state?.quantity > le) {
                highestValue = true;
              } else {
                highestValue = false;
              }
            }
            if (highestValue) {
              let i = buyGetGlobal[buyGetGlobal?.length - 1];
              setPriceAfterDiscount(
                Number(i?.get_product) * Number(discountedPrice)
              );
              setoverAllPrice(
                Number(totalPriceForProduct) -
                  Number(i?.get_product) * Number(discountedPrice) +
                  Number(deliveryData)
              );
            }
          } else {
            // setPriceAfterDiscount(0);

            setPriceAfterDiscount(
              Number(findCatExist?.get_product) * Number(discountedPrice)
            );
            setCouponId(findCatExist?.id);
            setoverAllPrice(
              Number(totalPriceForProduct) -
                Number(findCatExist?.get_product) * Number(discountedPrice) +
                Number(deliveryData)
            );
          }
        } else if (buyGetGlobal && buyGetGlobal?.length > 0) {
          let previousData = null;
          let amountData = [];
          for (let i of buyGetGlobal) {
            const totalProducts =
              Number(i?.buy_product) + Number(i?.get_product);
            amountData.push(totalProducts);
            const quantity = location?.state?.quantity;

            if (quantity > totalProducts) {
              setCouponId(i?.id);

              previousData = {
                priceAfterDiscount:
                  Number(i?.get_product) * Number(discountedPrice),
                overAllPrice:
                  Number(totalPriceForProduct) -
                  Number(i?.get_product) * Number(discountedPrice),
              };
              continue;
            }

            if (quantity === totalProducts) {
              setPriceAfterDiscount(
                Number(i?.get_product) * Number(discountedPrice)
              );
              setCouponId(i?.id);

              setoverAllPrice(
                Number(totalPriceForProduct) -
                  Number(i?.get_product) * Number(discountedPrice) +
                  Number(deliveryData)
              );
              break;
            }

            if (quantity < totalProducts) {
              if (previousData) {
                setPriceAfterDiscount(previousData.priceAfterDiscount);
                setoverAllPrice(previousData.overAllPrice);
              } else {
                setPriceAfterDiscount(0);
                setoverAllPrice(
                  Number(totalPriceForProduct) + Number(deliveryData)
                );
              }
              break; // Exit the loop since the condition is met
            }
          }
          let highestValue = false;
          for (let le of amountData) {
            if (location?.state?.quantity > le) {
              highestValue = true;
            } else {
              highestValue = false;
            }
          }
          if (highestValue) {
            let i = buyGetGlobal[buyGetGlobal?.length - 1];
            setPriceAfterDiscount(
              Number(i?.get_product) * Number(discountedPrice)
            );
            setoverAllPrice(
              Number(totalPriceForProduct) -
                Number(i?.get_product) * Number(discountedPrice) +
                Number(deliveryData)
            );
          }
        } else {
          setPriceAfterDiscount(0);
          setoverAllPrice(Number(totalPriceForProduct) + Number(deliveryData));
        }
      }
    } else {
      if (selectedCoupon?.type === "fixed") {
        let calculatedPrice = 0;

        const duplicatedVariants = location?.state?.flatMap(
          ({ quantity, ...rest }) =>
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
        const duplicatedVariants = location?.state?.flatMap(
          ({ quantity, ...rest }) =>
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
        const duplicatedVariants = location?.state?.flatMap(
          ({ quantity, ...rest }) =>
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
        let calculatedPrice = 0;
        let prices = [];
        let studenPrice = [];
        // setBuyGetCategory([]);
        // setBuyGetGlobal([]);
        const duplicatedVariants = location?.state?.flatMap(
          ({ quantity, ...rest }) =>
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
                    const totalPriceForProduct =
                      discountedPrice * item.quantity;
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

              // const findSameCatProduct = duplicatedVariants?.find(
              //   (item) => item?.cat_id == el?.category_id
              // );

              // setSameCategoryProduct(findSameCatProduct);
            }
            if (tempGlobalobj && tempGlobalobj?.id) {
              duplicatedVariants?.forEach((item) => {
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

      // let calculatedPrice = 0;
      // let prices = [];
      // let studenPrice = [];

      // const duplicatedVariants = location?.state?.flatMap(
      //   ({ quantity, ...rest }) =>
      //     Array.from({ length: quantity }, () => ({ quantity: 1, ...rest }))
      // );
      // let notBelongSameCat=true
      // for (let elem of buyGetCategory) {
      //   let sameCategoryProduct = duplicatedVariants?.every(
      //     (el) => el?.cat_id == elem?.category_id
      //   );
      //   if(!sameCategoryProduct){
      //     notBelongSameCat=false
      //   }
      // }
      // if(notBelongSameCat){

      // }else{

      // }

      return;
    }
  };
  const getDeliveryCharges = () => {
    let zipcodeNew = "201310";
    if (zipcode != null && zipcode != undefined && zipcode != "") {
      zipcodeNew = zipcode;
    }
    if (location?.state) {
      let totalQuantityDelivery = 1;
      if (Array.isArray(location?.state)) {
        totalQuantityDelivery = sumUpofAllProductsQuantity();
      }
      let data = {
        fromPincode: "201301",
        toPincode: zipcodeNew,
        shippingLength: 0,
        shippingWidth: 0,
        shippingHeight: 0,
        shippingWeight: 0.3,
        orderType: "forward",
        paymentMethod: payOption == 1 ? "cod" : "prepaid",
        productMRP: mainPrice,
        quantity: totalQuantityDelivery,
      };

      let config = {
        method: "post",
        url: `${environmentVar?.apiUrl}/api/shipping/delivery/rate`,
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setDeliveryCharges(response.data.data);
          setDeliveryData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const getDeliveryData = () => {
  //   let config = {
  //     method: "get",
  //     url: `${
  //       environmentVar?.apiUrl
  //     }/api/user/delivery/get_delivery_data?country_code=${
  //       country_code || "IN"
  //     }`,
  //     withCredentials: true,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setDeliveryData(response?.data?.data);
  //     })
  //     .catch((error) => {
  //       // setDeliveryData();
  //     });
  // };

  useEffect(() => {
    setCouponId();
  }, []);
  useEffect(() => {
    // getDeliveryData();
    getDeliveryCharges();
  }, [location?.state, zipcode, totalQuantity, payOption, mainPrice]);
  useEffect(() => {
    return () => {
      setSelectedCoupon(null);
      setoverAllPrice(0);
    };
  }, []);
  const handleSelectCoupon = () => {
    setSelectedCoupon(selectedCoupon1);
    setCouponId(null);
    handleCloseCoupon();
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
  const getDiscountText = (val) => {
    if (val.type == "percent") {
      return `EXTRA ${val.value} % Discount`;
    } else if (val.type == "fixed") {
      return `FLAT ${symbol || "₹"} ${val.value} Discount`;
    }
  };
  useEffect(() => {
    calculateOverallPrice();
    return () => {
      setCouponId(null);
    };
  }, [
    location?.state,
    studentChecked,
    imData,
    studentDisPrice,
    studentPrice,
    selectedCoupon,
    buyGetDiscount,
    onlinePaymentData,
    deliveryData,
  ]);

  const getCouponsData = () => {
    let config = {
      url: `${environmentVar?.apiUrl}/api/user/coupons/get_available_coupons?category=0&product=0&variant=0&price=${overAllPrice}&country=${countryCode}`,
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
  }, [location?.state, showCoupon]);
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
    setSelectedCoupon(null);
    setCouponId(couponId);
    setSelectedCoupon1(null);
    setPromoCodeError("");
    setPromoCodeMessage("");
    setPromoCode("");
    setoverAllPrice(
      Number(mainPrice) + Number(deliveryData) - Number(priceAfterDiscount)
    );
    handleClose();
  };

  const getOnlinePaymentDiscountData = () => {
    let config = {
      method: "get",
      url: `${
        environmentVar?.apiUrl
      }/api/user/online_payment_discount/get?country_code=${
        country_code || "IN"
      }`,
    };

    axios
      .request(config)
      .then((response) => {
        setOnlinePaymentData(response?.data?.data);
      })
      .catch((error) => {
        setOnlinePaymentData();
      });
  };
  useEffect(() => {
    getOnlinePaymentDiscountData();
  }, [country_code]);

  return (
    <Col md={5}>
      <h2 className="cart-heading">Order Summary</h2>
      {/* {location?.state?.map?.((item, index) => {
        return <OrderSummaryItem data={item} index={index} />;
      })} */}
      <div className="ordersummaryitemsheight">
        {location?.state?.buynow ? (
          <OrderSummaryItem data={location?.state} index={1} />
        ) : (
          location?.state?.map?.((item, index) => {
            return <OrderSummaryItem data={item} index={index} />;
          })
        )}
      </div>
      {/* <OrderSummaryItem data={state} /> */}
      {/* <div className="gst-box">
        <input type="checkbox" onClick={handleShow} /> Use GST Invoice
      </div> */}
      <BillDetailsInfo
        data={location?.state}
        couponPrice={selectedCoupon}
        goldMemberShip={goldMemberShip}
        overAllPrice={overAllPrice}
        mainPrice={mainPrice}
        setMainPrice={setMainPrice}
        setoverAllPrice={setoverAllPrice}
        payOption={payOption}
        onlinePaymentData={onlinePaymentData}
        priceAfterDiscount={priceAfterDiscount}
        buyGetDiscount={buyGetDiscount}
        deliveryData={deliveryData}
        checkedTermConditions={checkedTermConditions}
        individualArray={individualArray}
        sameCategoryProduct={sameCategoryProduct}
        zipcode={zipcode}
      />

      <div className="apply-coupens-main">
        <div className="apply-coupens-main-left">
          <h2>Apply Coupon</h2>
          <h3>Check available offers</h3>
        </div>
        <Button
          className="apply-coupens-main-right"
          onClick={handleShowCoupon}
          disabled={studentChecked}
        >
          <FontAwesomeIcon
            icon={faArrowRightLong}
            size="2x"
            className="apply-arrow-icon"
          />
        </Button>
        <Modal
          show={showCoupon}
          onHide={handleCloseCoupon}
          className="coupon-modal-main"
        >
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
                className="button"
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
                      {/* <h4>Use Coupon SINGLE</h4> */}
                      {/* <h5>Terms & Conditions</h5> */}
                    </div>
                    <div className="apply-coupon-button">
                      <h2
                        onClick={() => {
                          setSelectedCoupon1(val);
                          setPromoCode(val?.code);
                        }}
                      >
                        {val?.id == selectedCoupon1?.id ? "Selected" : "Select"}
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

      <StudentOffer data={location?.state} />

      <h2 className="cart-heading payoption mt-30">Payment options</h2>
      <h3 className="debit-credit">
        Get {onlinePaymentData?.discount}% discount by paying Debit/Credit Card
      </h3>
      <PaymentOptions
        checkedTermConditions={checkedTermConditions}
        setCheckedTermConditions={setCheckedTermConditions}
        paymentOptions={paymentOptions}
        setPaymentOptions={setPaymentOptions}
        payOption={payOption}
        setPayOption={setPayOption}
        payMethod={payMethod}
        setPayMethod={setPayMethod}
      />
      {availabilityError && (
        <div style={{ paddingBottom: "8px", fontSize: "14px", color: "red" }}>
          {availabilityError}
        </div>
      )}
      <div className="proceed-button" onClick={() => ProceedToPayment()}>
        {isSubmit ? <Loader size={25} /> : "Proceed to checkout"}
      </div>

      <Modal show={show} onHide={handleClose} className="gst-modal-main">
        <Modal.Header closeButton>
          <h2>Your GST Information</h2>
        </Modal.Header>
        <Modal.Body className="modal-inputs">
          <input type="text" placeholder="GSTIN" />
          <input type="text" placeholder="Business Name" />
          <p>
            {" "}
            <FontAwesomeIcon
              icon={faInfoCircle}
              size="2x"
              className="info-icon"
            />{" "}
            Incorrect GSTIN details will lead to order cancellation
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button " onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Col>
  );
};

export default OrderSummary;
