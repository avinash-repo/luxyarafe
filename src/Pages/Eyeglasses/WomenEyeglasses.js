import React, { useEffect, useState } from "react";
import SmallBanner from "../../Components/Common/SmallBanner/SmallBanner";
import CategoryBody from "../../Components/CategoryBody/CategoryBody";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { environmentVar } from "../../config/environmentVar";

const WomenEyeglasses = () => {
  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, []);
  let { catid, genderid } = useParams();
  const [bannerData, setBannerData] = useState(null);
  const fetchBannerData = () => {
    if (!genderid) {
      genderid = 1;
    }
    axios
      .get(
        `${environmentVar?.apiUrl}/api/user/ui_inner_section/get_data?category_id=${catid}&sub_category_id=${genderid}`
      )
      .then((response) => setBannerData(response?.data?.data[0]))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchBannerData();
  }, [catid, genderid]);

  return (
    <>
     <Helmet>
        <title>{bannerData?.heading || "Welcome To Vuezen"}</title>
      </Helmet>
      <SmallBanner
        smallBannerHead={bannerData?.heading || ""}
        smallBannerPara={bannerData?.description || ""}
        smallBannerImage={bannerData?.image}
        smallBannerColor={bannerData?.color}




        
      />
      <CategoryBody/>
    </>
  );
};

export default WomenEyeglasses;
