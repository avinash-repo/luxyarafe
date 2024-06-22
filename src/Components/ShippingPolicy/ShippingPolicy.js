import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import TermsBanner from "../Common/TermsBanner/TermsBanner";
import ShippingContent from "../TermsContent/ShippingContent";

const ShippingPolicy = ({ title }) => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>{title || "Shipping Policy"}</title>
      </Helmet>
      <TermsBanner heading={"Shipping Policy"} />
      <ShippingContent />
    </>
  );
};

export default ShippingPolicy;
