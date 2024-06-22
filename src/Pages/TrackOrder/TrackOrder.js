import React, { useEffect } from "react";
import TermsBanner from "../../Components/Common/TermsBanner/TermsBanner";
import TrackOrderContent from "../../Components/TrackOrderSections/TrackOrderContent";
import { Helmet } from "react-helmet-async";

const TrackOrder = ({title}) => {
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
      <TermsBanner
        heading={"Track Order"}
        para={"Enter your order number to view status."}
        isActive={true}
      />
      <TrackOrderContent />
    </>
  );
};

export default TrackOrder;
