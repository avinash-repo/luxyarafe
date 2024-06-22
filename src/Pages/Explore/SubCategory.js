import React from "react";
import { useNavigate } from "react-router-dom";
import { environmentVar } from "../../config/environmentVar";

const SubCategory = ({ item, innerItem }) => {
  const navigate = useNavigate(null);
  return (
    <>
      <div className="explore-image">
        <div
          className="image"
          onClick={() =>
            navigate(
              `/glasses/${item?.title?.replace(/ /g, "")}/${item?.id}/${
                innerItem?.value
              }/${innerItem?.id}`,
              { state: item }
            )
          }
        >
          <img
            src={`${environmentVar?.cdnUrl}/uploads/filterProduct/gender/${innerItem?.image}`}
          />
        </div>
        <h4>{innerItem?.value}</h4>
      </div>
    </>
  );
};

export default SubCategory;
