import React, { useEffect, useState } from "react";
import SmallBanner from "../../Components/Common/SmallBanner/SmallBanner";
import ContactForm from "../../Components/ContactComp/ContactForm";
import { Helmet } from "react-helmet-async";

const Contact = ({ title }) => {
  const [smallBannerHead, setSmallBannerHead] = useState();
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);

      if (window.location.href.split("/").pop() === "contact") {
        setSmallBannerHead("Contact Us");
      } else if (window.location.href.split("/").pop() === "about") {
        setSmallBannerHead("About Us");
      }
    }
  }, [window, smallBannerHead]);
  return (
    <>
      <Helmet>
        <title>{title || "Contact Vuezen"}</title>
      </Helmet>
      <SmallBanner
        smallBannerImage={"contact_us.webp"}
        smallBannerHead={smallBannerHead}
      />
      <ContactForm />
    </>
  );
};

export default Contact;
