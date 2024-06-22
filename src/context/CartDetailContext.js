import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { environmentVar } from "../config/environmentVar";

const CartDetailContext = createContext(null);

const CartDetailProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [scroll, setScroll] = useState(null);
  const [homeUpdate, setHomeUpdate] = useState(null);
  const [collectionData, setCollectionData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const getCollectionData = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/collection/get_beautiful_eyewear`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setCollectionData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCollectionData();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const updateQuantity = (index, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].itemQuantity = newQuantity;
      return updatedItems;
    });
  };

  // Other state management code...

  return (
    <CartDetailContext.Provider
      value={{
        isMobile,
        collectionData,
        cartItems,
        setCartItems,
        updateQuantity,

        scroll,
        setScroll,
        homeUpdate,
        setHomeUpdate,
        setCollectionData,
        setIsMobile,
        // Other state values...
      }}
    >
      {children}
    </CartDetailContext.Provider>
  );
};

export { CartDetailProvider, CartDetailContext };
