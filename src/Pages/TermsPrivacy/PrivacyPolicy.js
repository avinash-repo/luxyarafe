import React, { useEffect } from "react";
import TermsBanner from "../../Components/Common/TermsBanner/TermsBanner";
import PrivacyContent from "../../Components/TermsContent/PrivacyContent";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = ({ title }) => {
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
      <TermsBanner heading={"Privacy Policy"} />
      <PrivacyContent />
    </>
  );
};

export default PrivacyPolicy;
