import React, { useEffect } from "react";
import TermsBanner from "../../Components/Common/TermsBanner/TermsBanner";
import TermsContent from "../../Components/TermsContent/TermsContent";
import { Helmet } from "react-helmet-async";

const TermsConditions = ({title}) => {
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
      <TermsBanner heading={"Terms & Conditions"} />
      <TermsContent />
    </>
  );
};

export default TermsConditions;
