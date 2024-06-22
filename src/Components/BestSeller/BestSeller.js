import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import "./BestSeller.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CyberSell from "../../Images/cyber-sale.webp";
import BestSell1 from "../../Images/best-sell1.webp";
import BestSell2 from "../../Images/best-sell2.webp";
import BestSell3 from "../../Images/best-sell3.webp";
import BestSell4 from "../../Images/best-sell4.webp";

import ProductSell1 from "../../Images/product-sell1.webp";
import ProductSell2 from "../../Images/product-sell2.webp";
import ProductSell3 from "../../Images/product-sell3.webp";
import ProductSell4 from "../../Images/product-sell4.webp";

import { environmentVar } from "../../config/environmentVar";
import { useNavigate } from "react-router-dom";

const bestSellerArr = [
  {
    personImage: BestSell1,
    productImage: ProductSell1,
    productName: "Norah Geometric Champagne",
    price: "US $15.00",
  },
  {
    personImage: BestSell2,
    productImage: ProductSell2,
    productName: "Rodz Square Crystal Glasses",
    price: "US $22.00",
  },
  {
    personImage: BestSell3,
    productImage: ProductSell3,
    productName: "Gifford Aviator Black-Gold",
    price: "US $55.00",
  },
  {
    personImage: BestSell4,
    productImage: ProductSell4,
    productName: "Charlene Browline Tortoise ",
    price: "US $35.00",
  },
];

const BestSeller = ({ landingPageData, data }) => {
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
      {
        data == undefined ? <></> : (
          <Container className="best-slider">
          <div className="best-seller">
            {/* <img src={CyberSell} /> */}
            <h2>Best Selling Products</h2>
          </div>

          <Slider {...settings}>
            {data
              ?.filter((item) => item.type === "best_seller")
              ?.map((item, index) => {
                let totalDiscount = Number(
                  item?.variant_price_details?.[0]?.discount
                );
                let totalPrice = Number(item?.variant_price_details?.[0]?.price);
                return (
                  <div
                    className="slide-items"
                    key={index}
                    onClick={() => navigate(`/detailpage/${item?.product_id}`)}
                  >
                    <img
                      className="d-block w-100 product-person"
                      src={`${environmentVar?.cdnUrl}/uploads/bestSeller/${item?.image}`}
                      alt="First slide"
                    />
                    <img
                      className="d-block product-image"
                      src={`${environmentVar?.cdnUrl}/uploads/${item?.thumbnail_url}`}
                      alt="First slide"
                    />
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
            {/* <div className="slide-items">
              <img
                className="d-block w-100 product-person"
                src={BestSell1}
                alt="First slide"
              />
              <img
                className="d-block product-image"
                src={ProductSell1}
                alt="First slide"
              />
              <h2>Norah Geometric oooooooo</h2>
              <h3>US $35.00</h3>
            </div>

            <div className="slide-items">
              <img
                className="d-block w-100 product-person"
                src={BestSell2}
                alt="First slide"
              />
              <img
                className="d-block product-image"
                src={ProductSell2}
                alt="First slide"
              />
              <h2>Norah Geometric Champagne</h2>
              <h3>US $35.00</h3>
            </div>

            <div className="slide-items">
              <img
                className="d-block w-100 product-person"
                src={BestSell3}
                alt="First slide"
              />
              <img
                className="d-block product-image"
                src={ProductSell3}
                alt="First slide"
              />
              <h2>Norah Geometric Champagne</h2>
              <h3>US $35.00</h3>
            </div>

            <div className="slide-items">
              <img
                className="d-block w-100 product-person"
                src={BestSell4}
                alt="First slide"
              />
              <img
                className="d-block product-image"
                src={ProductSell4}
                alt="First slide"
              />
              <h2>Norah Geometric Champagne</h2>
              <h3>US $35.00</h3>
            </div>

            <div className="slide-items">
              <img
                className="d-block w-100 product-person"
                src={BestSell1}
                alt="First slide"
              />
              <img
                className="d-block product-image"
                src={ProductSell1}
                alt="First slide"
              />
              <h2>Norah Geometric Champagne</h2>
              <h3>US $35.00</h3>
            </div>

            <div className="slide-items">
              <img
                className="d-block w-100 product-person"
                src={BestSell2}
                alt="First slide"
              />
              <img
                className="d-block product-image"
                src={ProductSell2}
                alt="First slide"
              />
              <h2>Norah Geometric Champagne</h2>
              <h3>US $35.00</h3>
            </div> */}
          </Slider>
          </Container>
        )
      }
    </>
  );
};

export default BestSeller;
