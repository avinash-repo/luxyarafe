import React, { createContext, useState } from "react";
const FilterContext = createContext(null);

const FilterProvider = ({ children }) => {
  const [colorIds, setColorIds] = useState([]);
  const [shapeIds, setShapeIds] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [materialIds, setMaterialIds] = useState([]);
  const [sizeIds, setSizeIds] = useState([]);
  const [weightGroupIds, setWeightGroupIds] = useState([]);
  const [MinPricingIds, setMinPricingIds] = useState([]);
  const [MaxPricingIds, setMaxPricingIds] = useState([]);
  const [currencyRate] = useState("1");
  const [studentChecked, setStudentChecked] = useState(false);
  const [imData, setImData] = useState('');
  const [studentPrice, setStudentPrice] = useState('');
  const [studentDisPrice, setStudentDisPrice] = useState('');
  const [isForStudent, setisForStudent] = useState(false);

  const [selectedSort, setSelectedSort] = useState(null);
  const [country_code, setCountryCode] = useState("IN");
  const [symbol, setSymbol] = useState(null);
  const [updateStateWishlist, setUpdateStateWishlist] = useState(null);
  const [updateStateCart, setUpdateStateCart] = useState(null);
  const [couponId, setCouponId] = useState(null);
  const updateColorIds = (newIds) => {
    setColorIds(newIds);
  };
  const updateShapeIds = (newIds) => {
    setShapeIds(newIds);
  };
  const updateMaterialIds = (newIds) => {
    setMaterialIds(newIds);
  };
  const updateSizeIds = (newIds) => {
    setSizeIds(newIds);
  };
  const updateWeightGroupsIds = (newIds) => {
    setWeightGroupIds(newIds);
  };
  const updateMinPricingIds = (newIds) => {
    setMinPricingIds(newIds);
  };
  const updateMaxPricingIds = (newIds) => {
    setMaxPricingIds(newIds);
  };

  return (
    <FilterContext.Provider
      value={{
        isForStudent,
        setisForStudent,
        studentDisPrice,
        setStudentDisPrice,
        studentPrice,
        setStudentPrice,
        studentChecked,
        setStudentChecked,
        imData,
        setImData,
        colorIds,
        updateColorIds,
        shapeIds,
        updateShapeIds,
        materialIds,
        updateMaterialIds,
        sizeIds,
        updateSizeIds,
        weightGroupIds,
        updateWeightGroupsIds,
        MinPricingIds,
        MaxPricingIds,
        updateMinPricingIds,
        updateMaxPricingIds,
        currencyRate,

        selectedSort,
        setSelectedSort,

        country_code,
        setCountryCode,
        symbol,
        setSymbol,
        setSelectedCoupon,
        selectedCoupon,

        updateStateWishlist,
        setUpdateStateWishlist,
        updateStateCart,
        setUpdateStateCart,

        couponId, setCouponId
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterProvider, FilterContext };
