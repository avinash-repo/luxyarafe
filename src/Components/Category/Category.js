import React, { useContext } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Category.scss'; // Import your custom CSS file for styling
import { CartDetailContext } from '../../context/CartDetailContext';
import { environmentVar } from '../../config/environmentVar';
import CollectionImage from '../SmallComponents/CollectionImage';

const Category = ({ landingPageData }) => {
    const { collectionData } = useContext(CartDetailContext);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: collectionData.length > 3 ? 4 : collectionData.length,
        slidesToScroll: 1,
        draggable: true,
        arrows: false,
        centerMode: false,
    };
    return (
        <>
            {landingPageData && landingPageData.length > 0 && (
                <div className="category-component">
                    <h2>{'The most beautiful eyewear collections'}</h2>
                    <Slider {...settings}>
                        {collectionData &&
                            collectionData.map((val) => (
                                <div className='category-slide'>
                                    <CollectionImage
                                        pic={`${environmentVar?.cdnUrl}/uploads/ui/${val?.image}`}
                                        txt={`${val?.name}`}
                                        collectionlink={`${val?.slug}`}
                                    />
                                </div>
                            ))}
                    </Slider>
                </div>
            )}
        </>
    );
};

export default Category;
