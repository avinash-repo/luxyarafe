import React, { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CartItems from "./CartItems";
import BillDetails from "./BillDetails";
import { environmentVar } from "../../config/environmentVar";
import { FilterContext } from "../../context/FilterContext";
import axios from "axios";
import CartLoader from "../Loading/CartLoader";

const CartDetails = () => {
  const { country_code, symbol, setStudentPrice, setStudentDisPrice, setStudentChecked, setImData } = useContext(FilterContext);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const abortController = new AbortController();
  const getCartDetails = () => {
    setLoading(true);
    let apiUrl = `${
      environmentVar?.apiUrl
    }/api/cart/get_from_cart?country_code=${country_code || "IN"}`;

    const config = {
      method: "get",
      url: apiUrl,
      withCredentials: true,
      signal: abortController.signal,
    };
    axios(config)
      .then((response) => {
        setLoading(false);
        setData(response.data.productList);
      })
      .catch((error) => {
        setLoading(false);
        setData([]);
      });
  };

  // const getCartCount = () => {
  //   let config = {
  //     method: "get",
  //     url: `${environmentVar?.apiUrl}/api/cart/get_cart_count`,
  //     withCredentials: true,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setCartCount(response.data.data);
  //     })
  //     .catch((error) => {
  //       setCartCount();
  //     });
  // };

  // useEffect(() => {
  //   getCartCount();
  // }, [cartCount, status]);
  useEffect(() => {
    getCartDetails();
    setImData('');
    setStudentChecked(false);
    setStudentDisPrice('');
    setStudentPrice('');
    return () => {
      abortController.abort();
    };
  }, [status, symbol]);
  return (
    <>
      <div className="cart-details-fluid">
        <Container>
          <Row>
            {loading ? (
              <CartLoader />
            ) : (
              <CartItems
                data={data}
                setData={setData}
                status={status}
                setStatus={setStatus}
              />
            )}

            {data?.length >= 1 ? <BillDetails data={data}  status={status} /> : <></>}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CartDetails;
