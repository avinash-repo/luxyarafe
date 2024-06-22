import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap";
import SingleOrder from "./SingleOrder";
import { useQuery } from "react-query";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader6 } from "../Common/Loader/Loader";
import OrdersIcon from "../../Images/ordersbox.png";

const MyOrders = ({ col99 }) => {
  const [key, setKey] = useState("order");
  const navigate = useNavigate();
  const [updateState, setUpdateState] = useState(false);

  const fetchAllorders = async () => {
    let apiUrl = `${environmentVar?.apiUrl}/api/order/get_order`;

    const config = {
      method: "get",
      url: apiUrl,
      withCredentials: true,
    };

    const response = await axios(config);
    return response?.data;
  };

  const {
    data: obj,
    isLoading,
    error,
    refetch,
  } = useQuery(["getorderslist"], () => fetchAllorders());

  const handleRefetch = () => {
    refetch();
  };

  // Use useEffect to refetch when the state changes
  useEffect(() => {
    handleRefetch();
  }, [updateState]);

  if (isLoading)
    return (
      <>
        <Loader6 />
      </>
    );

  if (error) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <>
      <Col md={{ col99 }}>
        <div className="my-wishlist-main">
          <h1>My Orders</h1>
          <div className="coupens">
            <Tabs
              id="controlled-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="order" title="All Order">
                {obj?.allData.length ? (
                  obj?.allData?.map?.((item, index) => {
                    return (
                      <SingleOrder
                        item={item}
                        index={index}
                        updateState={updateState}
                        setUpdateState={setUpdateState}
                      />
                    );
                  })
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h4>HAVEN’T ORDERED YET?</h4>
                    <h5>Some of the very best collection await you!</h5>
                    <img src={OrdersIcon} style={{ width: "250px" }} />
                    <div
                      className="button"
                      style={{
                        fontWeight: "700",
                        width: "300px",
                        marginTop: "30px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/")}
                    >
                      Start Shopping
                    </div>
                  </div>
                )}
              </Tab>
              <Tab eventKey="delivered" title="Delivered">
                {Object.keys(obj?.obj).length !== 0 ? (
                  obj?.obj?.delivered?.map((item, index) => {
                    return (
                      <SingleOrder
                        item={item}
                        index={index}
                        updateState={updateState}
                        setUpdateState={setUpdateState}
                      />
                    );
                  })
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h4>HAVEN’T ORDERED YET?</h4>
                    <h5>Some of the very best collection await you!</h5>
                    <img src={OrdersIcon} style={{ width: "250px" }} />
                    <div
                      className="button"
                      style={{
                        fontWeight: "700",
                        width: "300px",
                        marginTop: "30px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/")}
                    >
                      Start Shopping
                    </div>
                  </div>
                )}
              </Tab>

              <Tab eventKey="cancelled" title="Cancelled">
                {Object.keys(obj?.obj).length !== 0 ? (
                  obj?.obj?.cancelled?.map((item, index) => {
                    return (
                      <SingleOrder
                        item={item}
                        index={index}
                        updateState={updateState}
                        setUpdateState={setUpdateState}
                      />
                    );
                  })
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h4>HAVEN’T ORDERED YET?</h4>
                    <h5>Some of the very best collection await you!</h5>
                    <img src={OrdersIcon} style={{ width: "250px" }} />
                    <div
                      className="button"
                      style={{
                        fontWeight: "700",
                        width: "300px",
                        marginTop: "30px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/")}
                    >
                      Start Shopping
                    </div>
                  </div>
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </Col>
    </>
  );
};

export default MyOrders;
