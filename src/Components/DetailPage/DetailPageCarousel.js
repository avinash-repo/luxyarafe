import React, { useContext, useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import "./DetailPage.scss";
// import productImg1 from "../../Images/productImg1.png";
// import productImg2 from "../../Images/productImg2.png";
// import productImg3 from "../../Images/productImg3.png";
// import productImg4 from "../../Images/productImg4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { environmentVar } from "../../config/environmentVar";
import { ProductDetailContext } from "../../context/ProductDetailContext";

const DetailPageCarousel = ({ data, otherProduct }) => {
  const [index, setIndex] = useState(0);
  const { variantDataInContext } = useContext(ProductDetailContext);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const images = variantDataInContext?.thumbnail_images;

  return (
    <div>
      {/* Main Carousel */}
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        prevIcon={
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="2x"
            className="font-icon"
          />
        }
        nextIcon={
          <FontAwesomeIcon
            icon={faChevronRight}
            size="2x"
            className="font-icon"
          />
        }
      >
        {images?.map((imageUrl, idx) => {
          return (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-80-center"
                src={`${environmentVar?.cdnUrl}/uploads/${imageUrl}`}
                alt={`Slide ${idx + 1}`}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>

      {/* Thumbnails */}
      <div className="thumbnail-container">
        {images?.map((imageUrl, idx) => (
          <div className="image-corousel-div">
            <Image
              key={idx}
              src={`${environmentVar?.cdnUrl}/uploads/${imageUrl}`}
              alt={`Thumbnail ${idx + 1}`}
              className={`thumbnail ${index === idx ? "active" : ""}`}
              onClick={() => setIndex(idx)}
              rounded
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPageCarousel;
