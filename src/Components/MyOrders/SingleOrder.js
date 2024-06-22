import React, { useEffect, useState } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MyOrders.scss";
import orderProductImg from "../../Images/order-product.webp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2";
import { load } from "@cashfreepayments/cashfree-js";

const SingleOrder = ({ item, index, updateState, setUpdateState }) => {
  const navigate = useNavigate(null);
  const [addressData, setAddressData] = useState(null);

  const [cashfree, setCashfree] = useState(null);
  let initializeSDK = async function () {
    let cashfree1 = await load({
      mode: "sandbox",
    });
    setCashfree(cashfree1);
  };
  const formatDate = (inputDate) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Parse the input date string
    const date = new Date(inputDate);

    // Extract the day, month, and year
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(2);

    // Determine the suffix for the day
    let suffix;
    if (day >= 11 && day <= 13) {
      suffix = "th";
    } else {
      switch (day % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          suffix = "th";
          break;
      }
    }

    // Format the date string
    const formattedDate = `${date
      .toDateString()
      .slice(0, 3)}, ${day}${suffix} ${month} ${year}`;

    return formattedDate;
  };
  const downloadInvoice = async (item) => {
    // try {
    //   const response = await axios.get(
    //     `${environmentVar?.apiUrl}/api/order/download_invoice`,
    //     {
    //       responseType: "blob",
    //       withCredentials: true,
    //     }
    //   );

    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const link = document.createElement("a");
    //   link.href = url;
    //   link.setAttribute("download", "invoice.json");
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // } catch (err) {
    // }
    axios({
      url: `${environmentVar?.apiUrl}/api/order/download_invoice?order_id=${item?.order_id}`,
      method: "get",
      withCredentials: true,
      responseType: "text/html",
    })
      .then((response) => {
        // Create a download link for the generated PDF

        response = JSON.parse(response.data);
        const tempElement = document.createElement("div");
        tempElement.innerHTML = response.data;
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        iframe.contentDocument.open();
        iframe.contentDocument.write(response.data);
        iframe.contentDocument.close();

        // Use html2pdf to convert the iframe content to a PDF
        html2pdf(iframe.contentDocument.body, {
          margin: 10,
          filename: `vuezen_${item?.order_id}_${formatDate(
            item?.delivery_date
          )}`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        }).then(() => {
          // Remove the iframe from the DOM
          document.body.removeChild(iframe);
          toast.success("Invoice Downloaded Successfully", {
            autoClose: 2000,
          });
          // setIsDownloading(false);
        });

        // const downloadLink = document.createElement("a");
        // downloadLink.href = URL.createObjectURL(response.data);
        // downloadLink.download = `Invoice_${item?.order_id}.pdf`;
        // downloadLink.click();
      })
      .catch((error) => {
        // setIsDownloading(false);
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
  };

  // let createdTime = new Date(item?.created_at)
  //   .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  //   .split(", ")[0]
  //   .replace(/\//g, "-");
  let createdTime = new Date(item?.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const cancelOrder = (item) => {
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
          order_id: item?.order_id,
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
            setUpdateState(!updateState);
            toast.success("Order cancelled Successfully", {
              autoClose: 2000,
            });
          })
          .catch((error) => {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
          });
      }
    });
  };

  const createOrderCashfree = (item) => {
    try {
      let dataAmount =
        item?.is_student_info_id && item?.card_data != null
          ? Number(item?.delivery_charges) > Number(item?.sub_total)
            ? Math.round(
                Number(item?.delivery_charges) - Number(item?.sub_total)
              ).toString()
            : Math.round(
                Number(item?.sub_total) + Number(item?.delivery_charges)
              ).toString()
          : Math.round(
              Number(item?.sub_total) + Number(item?.delivery_charges)
            ).toString();

      let data = {
        amount: dataAmount,
        currency: "INR",
        orderId: `order-${item?.order_id}`,
        phone: addressData?.mobile?.split("-")[1],
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
  const payAgain = (item) => {
    if (item?.payment_mode?.toLowerCase()?.includes("cashfree")) {
      createOrderCashfree(item);
    }
  };
  useEffect(() => {
    initializeSDK();
  }, []);

  useEffect(() => {
    if (item) {
      // setLoading(true)
      let config = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/user/user_address/get_user_address_by_id?id=${item?.address_id}`,
        withCredentials: true,
      };

      axios
        .request(config)
        .then((response) => {
          setAddressData(response?.data?.data);
          // setTimeout(() => {
          //   setLoading(false)
          // }, 1000);
        })
        .catch((error) => {
          setAddressData(null);
          // setLoading(false)
        });
    }
  }, [item]);
  return (
    <>
      <div className="single-order-main">
        <div className="single-order-content">
          <div className="single-order-content-img">
            {item?.variant_quantity?.map((innerItem, innerIndex) => {
              return (
                <div key={innerIndex}>
                  <div className="single-order-fixed-image">
                    <img
                      className="myorder_main_image"
                      src={`${environmentVar?.cdnUrl}/uploads/${innerItem?.thumbnail_url}`}
                      onClick={() =>
                        navigate(`/detailpage/${innerItem?.product_id}`)
                      }
                    />
                    {/* <span>+3</span>  */}
                  </div>

                  <div>{innerItem?.variant_name}</div>
                  <div
                    style={{
                      fontSize: "24px",
                      paddingTop: "10px",
                      fontWeight: "500",
                    }}
                  >
                    {item?.country_code == "IN"
                      ? "₹"
                      : item?.country_code == "AE"
                      ? "د.إ"
                      : item?.country_code == "US"
                      ? "$"
                      : "₹"}{" "}
                    {innerItem?.product_price}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="single-order-product-details">
            <h3>
              Order {item?.order_id} |{" "}
              <span>{formatDate(item?.created_at)}</span>
              {/* {item?.status} */}
            </h3>
            {!(
              item?.card_data != null && item?.payment_status == "pending"
            ) && (
              <h2>
                {/* {item?.variant_quantity?.[0]?.variant_name} |{" "} */}
                {item?.status === "delivered" ? (
                  <span style={{ color: "green" }}>Delivered</span>
                ) : item?.status === "cancelled" ? (
                  <span style={{ color: "red" }}>Cancelled</span>
                ) : (
                  <span>
                    Delivery expected by {formatDate(item?.delivery_date)}
                  </span>
                )}
              </h2>
            )}

            <div className="order-buttons">
              {item?.status === "processing" ||
              item?.status === "new" ||
              item?.status === "outfordelivery" ||
              item?.status === "delivered" ? (
                item?.card_data != null && item?.payment_status == "pending" ? (
                  " "
                ) : (
                  <button
                    className="product-button new-pad mr-20"
                    onClick={() => navigate(`/orderstrack/${item?.order_id}`)}
                  >
                    Track Order
                  </button>
                )
              ) : (
                item?.status === "cancelled" && ""
              )}

              {item?.status === "delivered" ? (
                <button
                  className="product-light-white-button new-pad"
                  onClick={() =>
                    navigate(
                      `/detailpage/${item?.variant_quantity?.[0]?.product_id}`
                    )
                  }
                >
                  View Item
                </button>
              ) : item?.status === "new" ? (
                item?.card_data != null && item?.payment_status == "pending" ? (
                  " "
                ) : (
                  <button
                    className="product-light-white-button new-pad"
                    onClick={() => cancelOrder(item)}
                  >
                    Cancel Order
                  </button>
                )
              ) : (
                (item?.status === "processing" ||
                  item?.status === "cancelled") &&
                ""
              )}
              {item?.card_data != null &&
                item?.payment_status == "pending" &&
                Date.now() - Date.parse(item?.order_date) < 60 * 60 * 1000 && (
                  <button
                    className="product-light-white-button new-pad"
                    onClick={() => payAgain(item)}
                  >
                    Pay Again
                  </button>
                )}
              {/* <button
                className="product-light-white-button new-pad"
                onClick={() => cancelOrder(item)}
              >
                Cancel Order
              </button> */}
            </div>
          </div>
        </div>
        {item?.status === "delivered" && (
          <div
            onClick={() => downloadInvoice(item)}
            className="single-order-invoice"
          >
            <FontAwesomeIcon
              icon={faDownload}
              size="2x"
              className="invoice-download"
            />{" "}
            Invoice
          </div>
        )}
      </div>
    </>
  );
};

export default SingleOrder;
