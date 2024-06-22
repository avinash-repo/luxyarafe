import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "../FasionTrend/FasionTrend.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSell1 from "../../Images/product-sell1.webp";
import ProductSell2 from "../../Images/product-sell2.webp";
import ProductSell3 from "../../Images/product-sell3.webp";
import ProductSell4 from "../../Images/product-sell4.webp";
import { environmentVar } from "../../config/environmentVar";
import { useNavigate } from "react-router-dom";

const fasionTrendArr = [
  { productImage: ProductSell1, productName: "Winston", price: "US $15.00" },
  { productImage: ProductSell2, productName: "Carrero", price: "US $23.96" },
  { productImage: ProductSell3, productName: "Dexter", price: "US $55.00" },
  { productImage: ProductSell4, productName: "Adorno", price: " US $28.95" },
];

const TrendSlider = ({ data }) => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // Add more breakpoints as needed
    ],
  };
  return (
    <>
      <Container className="trend-slider">
        <Slider {...settings}>
          {data
            ?.filter((item) => item.type === "fashion_trend")
            ?.map((item, index) => {
              let totalDiscount = Number(
                item?.variant_price_details?.[0]?.discount
              );
              let totalPrice = Number(item?.variant_price_details?.[0]?.price);
              return (
                <div
                  className="trend-slider-main"
                  key={index}
                  onClick={() => navigate(`/detailpage/${item?.product_id}`)}
                >
                  <div className="trend-slider-img">
                    <img
                      className="d-block"
                      src={`${environmentVar?.cdnUrl}/uploads/${item?.thumbnail_url}`}
                      alt="First slide"
                    />
                  </div>
                  <h2>{item?.variant_name}</h2>
                  <h3>
                    {/* {item?.variant_price_details?.[0]?.country_code}{" "} */}
                    {item?.variant_price_details?.[0]?.currency_symbol}
                    {Number(
                      totalPrice - (totalDiscount * totalPrice) / 100
                    )?.toFixed(2)}
                  </h3>
                </div>
              );
            })}
        </Slider>
      </Container>
    </>
  );
};

export default TrendSlider;
