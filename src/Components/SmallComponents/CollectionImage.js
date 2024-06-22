import React from "react";
import "./CollectionImage.scss";
import Collection1 from "../../Images/women.webp";
import { useNavigate } from "react-router-dom";
import { environmentVar } from "../../config/environmentVar";
import { toast } from "react-toastify";
import axios from "axios";

const CollectionImage = ({ pic, txt, collectionlink }) => {
  const navigate = useNavigate(null);
  const handleClickImage = () => {
    const collectionLinkArr = collectionlink.split("/");
    const catId = collectionLinkArr[collectionLinkArr.length - 3];

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/category/get_category_by_id/${catId}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        navigate(collectionlink, { state: response?.data?.data });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });

    // navigate(collectionlink)
  };
  return (
    <>
      <div className="collection-image">
        <div className="image" onClick={handleClickImage}>
          <img src={pic} />
        </div>
        <h4>{txt}</h4>
      </div>
    </>
  );
};

export default CollectionImage;
