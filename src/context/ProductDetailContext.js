import React, { createContext, useState } from "react";
const ProductDetailContext = createContext(null);

const ProductDetailProvider = ({ children }) => {
  const [variantDataInContext, setVariantDataInContext] = useState(null);
  const [productDataInContext, setProductDataInContext] = useState(null);

  const [selectedSort, setSelectedSort] = useState(null);

  //   const updateColorIds = (newIds) => {
  //     setColorIds(newIds);
  //   };

  return (
    <ProductDetailContext.Provider
      value={{
        // colorIds,
        // updateColorIds,

        variantDataInContext,
        setVariantDataInContext,
        productDataInContext,
        setProductDataInContext,
      }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
};

export { ProductDetailProvider, ProductDetailContext };
