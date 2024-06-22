import React, { useEffect } from 'react'
import CartDetails from '../../Components/CartDetails/CartDetails'
import { Helmet } from "react-helmet-async";

const Cart = ({title}) => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
    <Helmet>
        <title>{title || "Welcome To Vuezen"}</title>
      </Helmet>
        <CartDetails/>
    </>
  )
}

export default Cart