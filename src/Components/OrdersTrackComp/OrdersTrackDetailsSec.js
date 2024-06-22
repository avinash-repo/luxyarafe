import React, { useEffect, useState } from "react";
import "./OrdersTrack.scss";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import { environmentVar } from "../../config/environmentVar";
import axios from "axios";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";
import { Loader5 } from "../Common/Loader/Loader";

const Root = styled.div`
  padding: 30px 0;
`;

const OrdersTrackDetailsSec = ({ responseData, loading, setLoading }) => {
  const [addressData, setAddressData] = useState(null);

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

  const downloadInvoice = () => {
    axios({
      url: `${environmentVar?.apiUrl}/api/order/download_invoice?order_id=${responseData?.order_id}`,
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
          filename: `vuezen_${responseData?.order_id}_${formatDate(
            responseData?.delivery_date
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
  useEffect(() => {
    if (responseData) {
      setLoading(true);
      let config = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/user/user_address/get_user_address_by_id?id=${responseData?.address_id}`,
        withCredentials: true,
      };

      axios
        .request(config)
        .then((response) => {
          setAddressData(response?.data?.data);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((error) => {
          setAddressData(null);
          setLoading(false);
        });
    }
  }, [responseData]);
  return (
    <>
      {loading ? (
        <Loader5 />
      ) : (
        <Root>
          <div className="orderstrackdetails-sec-main">
            <Row>
              <Col md={4}>
                <div className="orderstrackdetails-sec">
                  <div className="deliveryaddress">
                    <h2>Delivery Address</h2>
                    <h3>{addressData?.full_name}</h3>
                    <h4>
                      {`${addressData?.house_no}, ${addressData?.address}, ${addressData?.city} - ${addressData?.zipcode}, ${addressData?.state} ${addressData?.country}`}
                    </h4>
                    <h4>
                      <span>Phone number </span>
                      {addressData?.mobile}
                    </h4>
                  </div>
                </div>
              </Col>
              <Col md={1} className="lines-bothsides">
                {/* <div className="orderstrackdetails-sec">
                <div className="deliveryaddress">
                  <h2>Your Rewards</h2>
                  <h5>14 Super Coins Cashback</h5>
                  <p>Use it to save on your next order</p>
                </div>
              </div> */}
              </Col>
              {responseData?.status == "delivered" && (
                <Col md={4}>
                  <div className="orderstrackdetails-sec">
                    <div className="deliveryaddress">
                      <h2>More actions</h2>
                      <h3>Download Invoice</h3>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={downloadInvoice}
                        className="download-button"
                      >
                        Download
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </Root>
      )}
    </>
  );
};

export default OrdersTrackDetailsSec;
