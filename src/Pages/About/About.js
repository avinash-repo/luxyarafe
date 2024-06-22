import React, { useEffect } from "react";
import SmallBanner from "../../Components/Common/SmallBanner/SmallBanner";
import Section2 from "../../Components/About/Section2";
import Section3 from "../../Components/About/Section3";
import Collections from "../../Components/Common/Collections/Collections";
import Twoboxes from "../../Components/About/Twoboxes";
import { Helmet } from "react-helmet-async";
import AboutImg from '../../Images/about_us.webp'


const About = ({ landingPageData,title }) => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <div>
      <Helmet>
        <title>{title || "About Vuezen"}</title>
      </Helmet>
      <SmallBanner
        
        smallBannerImage={AboutImg}
        smallBannerHead={"About Us"}
        smallBannerPara={"For those who see the world differently."}
      />
      <Section2 />
      <Section3 />
      <Collections landingPageData={landingPageData} />
      <Twoboxes />
    </div>
  );
};

export default About;
