import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { environmentVar } from "../../config/environmentVar";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader1 } from "../../Components/Common/Loader/Loader";
import "./Redirect.scss";

const Redirect = ({ title }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const ref = params.get("ref");
  const order_id = params.get("order_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (ref !== null) {
      let config = {
        method: "put",
        url: `${environmentVar?.apiUrl}/api/order/update_status_by_network_gateway?refid=${ref}`,
        withCredentials: true,
      };

      axios
        .request(config)
        .then((response) => {
          toast.success("Payment has been Completed", {
            autoClose: 2000,
          });
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });

          console.log(error);
        });
    }

    if (order_id !== null) {
      setLoading(true);
      let config = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/order/cashfree_check_order/${order_id}`,
        withCredentials: true,
      };

      axios
        .request(config)
        .then((response) => {
          if (response?.data?.flag) {
            // window.location.href = environmentVar?.redirecturl
            setLoading(false);
            navigate("/orderhistory");
            toast.success("Payment has been Completed", {
              autoClose: 2000,
            });
          } else {
            setLoading(false);
            navigate("/orderhistory");
            toast.error("Payment Failed", {
              autoClose: 2000,
            });
          }
          //   refetch()
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            autoClose: 2000,
          });

          console.log(error);
        });
    }
  }, [location]);
  return (
    <div>
      <Helmet>
        <title>{title || "Welcome To Vuezen"}</title>
      </Helmet>
      <div>
        {loading && (
          <div className="loader_redirect">
            <Loader1 size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Redirect;
