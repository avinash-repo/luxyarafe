import React, { useEffect, useState } from "react";
import Collections from "../../Components/Common/Collections/Collections";
import Category from "./Category";
import { Helmet } from "react-helmet-async";


const Explore = ({ landingPageData,title }) => {
  const [isCategoryMobile, setIsCategoryMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsCategoryMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Category  landingPageData={landingPageData} />
    </div>
  );
};

export default Explore;
