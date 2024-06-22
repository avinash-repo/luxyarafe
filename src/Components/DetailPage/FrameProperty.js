import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import frameWidthImg from "../../Images/frame-width-img.webp";
import lenseWidthImg from "../../Images/lenses-width-img.webp";
import lenseheightImg from "../../Images/lenses-height-img.webp";
import bridgewidthImg from "../../Images/bridge-width-img.webp";
import templelenghtImg from "../../Images/temple-length-img.webp";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { FilterContext } from "../../context/FilterContext";

const FrameProperty = () => {
  const { id } = useParams();
  const { country_code } = useContext(FilterContext);
  const frameImages = [
    frameWidthImg,
    lenseWidthImg,
    lenseheightImg,
    bridgewidthImg,
    templelenghtImg,
  ];
  const [uiFrameData, setUiFrameData] = useState(null);

  const fetchCategoriesData = async ({ queryKey }) => {
    const [, id, country_code] = queryKey;
    let apiUrl = `${
      environmentVar?.apiUrl
    }/api/product/fetch_product_by_id?id=${id}&country_code=${
      country_code || "IN"
    }`;

    const config = {
      method: "get",
      url: apiUrl,
    };

    const response = await axios(config);
    return response?.data?.data;
  };

  const {
    data: productData,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["productbyidinframeproperty", id, country_code],
    fetchCategoriesData
  );
  const getGlassProperties = (val, productData) => {
    if (val?.heading.toLowerCase() == "frame width") {
      return productData?.[0]?.frame_width;
    } else if (val?.heading.toLowerCase() == "lens width") {
      return productData?.[0]?.lens_height;
    } else if (val?.heading.toLowerCase() == "lens height") {
      return productData?.[0]?.lens_width;
    } else if (val?.heading.toLowerCase() == "bridge width") {
      return productData?.[0]?.bridge_width;
    } else if (val?.heading.toLowerCase() == "temple length") {
      return productData?.[0]?.temple_length;
    }
  };
  const getUIFrameData = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/admin/frame_data/get_ui_frame_config`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setUiFrameData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUIFrameData();
  }, []);


  return (
    <>
      <Container>
        <div className="frame-property-header">
          <h2>Product Description</h2>
          <h3>{productData?.[0]?.summary}</h3>
          <ul>
            <li>
              Model Number: <span>{productData?.[0]?.model_number}</span>
            </li>
            <li>
              Shape: <span>{productData?.[0]?.shapeobj?.value}</span>
            </li>
            <li>
              Size: <span>{productData?.[0]?.sizeData?.[0]?.value}</span>
            </li>
            <li>
              Materials: <span>{productData?.[0]?.materialData?.value}</span>
            </li>
            <li>
              Weight: <span>{productData?.[0]?.weightData?.value} g</span>
            </li>
            <li>
              Gender:{" "}
              <span>
                {productData?.[0]?.genderDataArr
                  ?.map((item) => item?.value)
                  .join(", ")}
              </span>
            </li>
            <li>
              Frame Type: <span>{productData?.[0]?.frameTypeObj?.value}</span>
            </li>
            <li>
              Frame Width: <span>{productData?.[0]?.frame_width} mm</span>
            </li>
            <li>
              Lens Height: <span>{productData?.[0]?.lens_height} mm</span>
            </li>
            <li>
              Lens Width : <span>{productData?.[0]?.lens_width} mm</span>
            </li>
            <li>
              Bridge Width: <span>{productData?.[0]?.bridge_width} mm</span>
            </li>
            <li>
              Temple Length: <span>{productData?.[0]?.temple_length} mm</span>
            </li>
          </ul>
        </div>
        {console.log("uiFrameData",uiFrameData)}
        <div className="frame-property-boxes">
          {uiFrameData &&
            uiFrameData.map((val, index) => (
              <div className="frame-property-box">
                
                <div style={{width:"250px", height:"95px", position:'relative'}}>
                  {
                    index === 0 ? 
                      <h2 style={{position:"absolute", top:"-5px", left:"100px"}}>{`${getGlassProperties(val, productData)} mm`}</h2>
                      :index === 1 ?
                      <h2 style={{position:"absolute", top:"20px", left:"40px"}}>{`${getGlassProperties(val, productData)} mm`}</h2>
                      :index === 2 ?
                      <h2 style={{position:"absolute", top:"35px", left:"33px", fontSize:"16px"}}>{`${getGlassProperties(val, productData)} mm`}</h2>
                        :index === 3 ?
                      <h2 style={{position:"absolute", top:"-12px", left:"100px"}}>{`${getGlassProperties(val, productData)} mm`}</h2>
                        :index === 4 &&
                      <h2 style={{position:"absolute", top:"-20px", left:"100px"}}>{`${getGlassProperties(val, productData)} mm`}</h2>
                  }
                  <img src={frameImages[index]} />
                </div>
                <div className="frame-name">{val?.heading}</div>
                <div className="frame-para">{val?.description}</div>
              </div>
            ))}
        </div>
      </Container>
    </>
  );
};

export default FrameProperty;
