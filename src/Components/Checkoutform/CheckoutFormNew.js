import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { environmentVar } from "../../config/environmentVar.js";
import axios from "axios";
import { useNavigate } from "react-router";
import Loader from "../Common/Loader/Loader.js";
const CheckoutFormNew = ({ orderId }) => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    setIsSubmit(true);
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
      if (error) {
        console.error(error);
        // handleError();
        setIsSubmit(false);
        toast.error(error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else if (
        paymentIntent &&
        paymentIntent.status === "succeeded" &&
        paymentIntent?.id
      ) {
        let data = {
          order_id: `${orderId}`,
          card_details: "card data",
          card_data: JSON.stringify(paymentIntent),
          txn_id: paymentIntent.id,
          payment_status: "complete",
        };

        let config = {
          method: "put",
          maxBodyLength: Infinity,
          url: `${environmentVar?.apiUrl}/api/order/update_status`,
          withCredentials: true,
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            toast.success("Order Placed Successfully", {
              autoClose: 2000,
            });
            navigate("/orderhistory");
            setIsSubmit(false);
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
            setIsSubmit(false);
          });
      } else {
        let data = {
          order_id: `${orderId}`,
          card_details: "card data",
          card_data: JSON.stringify(paymentIntent),
          txn_id: paymentIntent.id,
          payment_status: "failed",
        };

        let config = {
          method: "put",
          maxBodyLength: Infinity,
          url: `${environmentVar?.apiUrl}/api/order/update_status`,
          withCredentials: true,
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            toast.error("Payment Failed", {
              autoClose: 2000,
            });
            navigate("/orderhistory");
            setIsSubmit(false);
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
            setIsSubmit(false);
          });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message, {
        autoClose: 2000,
      });
      setIsSubmit(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Button type="submit" disabled={!stripe} className="button mt-30">
          {isSubmit ? <Loader size={30} /> : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutFormNew;
