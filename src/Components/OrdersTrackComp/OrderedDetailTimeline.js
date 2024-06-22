import React, { useContext } from "react";
import orderProductImg from "../../Images/orderProductImg.webp";
import OrderedTimeline from "./OrderedTimeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faCancel,
  faClose,
  faCross,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { environmentVar } from "../../config/environmentVar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import { CartDetailContext } from "../../context/CartDetailContext";
import { Loader5 } from "../Common/Loader/Loader";

const OrderedDetailTimeline = ({ responseData }) => {
  const navigate = useNavigate();

  const { scroll, setScroll } = useContext(CartDetailContext);
  const cancelOrder = () => {
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
        let data = {
          order_id: responseData?.order_id,
        };

        let config = {
          method: "put",
          url: `${environmentVar?.apiUrl}/api/order/cancel_order`,
          withCredentials: true,
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            // setUpdateState(!updateState);
            toast.success("Order cancelled Successfully", {
              autoClose: 2000,
            });
            navigate("/orderhistory");
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
          });
      }
    });
  };
  return (
    <>
      {
        !responseData ? <Loader5/> :(
          <div className="ordereddeailtimeline-main">
            <div className="ordered-product-details-main">
              <div className="ordered-product-details-img">
                <img
                  src={`${environmentVar?.cdnUrl}/uploads/${responseData?.variant_quantity[0]?.thumbnail_url}`}
                />
              </div>
              <div className="ordered-product-details">
                <h2>{responseData?.variant_quantity[0]?.variant_name}</h2>
                {/* <h3>Color: Black</h3> */}
                <h4>
                  {responseData?.country_code == "IN"
                    ? "₹"
                    : responseData?.country_code == "AE"
                    ? "د.إ"
                    : responseData?.country_code == "US"
                    ? "$"
                    : "₹"}{" "}
                  {
                    responseData?.is_student_info_id ? 
                    responseData?.card_data == null ?
                    (Number(responseData?.sub_total) +
                      Number(responseData?.delivery_charges)
                    )?.toFixed(2):
                    responseData?.variant_quantity?.length > 1 ?
                    (Number(responseData?.sub_total) + Number(responseData?.delivery_charges))?.toFixed(2):
                    (Number(responseData?.delivery_charges) -
                    Number(responseData?.sub_total)
                    )?.toFixed(2) 
                    :(Number(responseData?.sub_total) +
                      Number(responseData?.delivery_charges)
                    )?.toFixed(2)
                    // responseData?.card_data == null ?
                    // (Number(responseData?.sub_total) +
                    //   Number(responseData?.delivery_charges)
                    // )?.toFixed(2):0
                  
                  }
                  {" "}
                  <span>{responseData?.coupon_id ? "1 Offer Applied" : <></>}</span>
                </h4>
                {responseData?.status == "cancelled" && <span style={{ color: "red",fontWeight:600 }}>Order Cancelled</span>}

                {/* <h5>Return policy ended on Nov 19</h5> */}
              </div>
            </div>
            {responseData?.status != "cancelled" && <OrderedTimeline responseData={responseData} />}
            <div className="rate-help-review">
              {responseData?.status === "delivered" ? (
                <div
                  className="rate-help-review-review"
                  onClick={() => {
                    navigate(
                      `/detailpage/${responseData?.variant_quantity?.[0]?.product_id}`
                    );
                    setScroll(1);
                  }}
                >
                  <FontAwesomeIcon icon={faStar} size="2x" className="info-icon" />
                  Rate & Review
                </div>
              ) : (
                <></>
              )}

              <div
                className="rate-help-review-review"
                onClick={() => navigate("/contact")}
              >
                <FontAwesomeIcon icon={faInfo} size="2x" className="info-icon" />
                Need Help?
              </div>
              {responseData?.status === "new" ? (
                <div
                  className="rate-help-review-review"
                  onClick={() => cancelOrder()}
                >
                  <FontAwesomeIcon icon={faClose} size="2x" className="info-icon" />
                  Cancel
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )
      }
      
    </>
  );
};

export default OrderedDetailTimeline;
