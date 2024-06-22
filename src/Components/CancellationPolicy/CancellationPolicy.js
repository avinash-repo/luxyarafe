import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import TermsBanner from "../Common/TermsBanner/TermsBanner";
import CancellationContent from "../TermsContent/CancellationContent";

const CancellationPolicy = ({ title }) => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>{title || "Return Exchange Policy"}</title>
      </Helmet>
      <TermsBanner heading={"Return Exchange Policy"} />
      <CancellationContent />
    </>
  );
};

export default CancellationPolicy;
