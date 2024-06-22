import React, { useContext, useEffect, useState } from "react";
import "./LeftSideBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import shapeIcon from "../../../Images/aviatoricon.webp";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { environmentVar } from "../../../config/environmentVar";
import { FilterContext } from "../../../context/FilterContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #c2c2c2;
  cursor: pointer;
`;

const LeftSideBar = ({ onClose, responseData }) => {
  const [openItem, setOpenItem] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [pricing, setPricing] = useState();
  // const { state } = useLocation();
  const [state, setState] = useState();

  const {
    colorIds,
    updateColorIds,
    shapeIds,
    updateShapeIds,
    materialIds,
    updateMaterialIds,
    sizeIds,
    updateSizeIds,
    weightGroupIds,
    updateWeightGroupsIds,
    MinPricingIds,
    MaxPricingIds,
    updateMinPricingIds,
    updateMaxPricingIds,
    country_code,
  } = useContext(FilterContext);
  const countryCode = country_code || "IN";

  const { category, catid, gender, genderid } = useParams();
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/category/get_category_by_id/${catid}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setState(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [catid, genderid]);
  const toggleItem = (index) => {
    if (openItem.includes(index)) {
      let arr = [...openItem];
      let arr1 = arr.filter((val) => val != index);
      setOpenItem(arr1);
    } else {
      let arr = [...openItem];
      arr.push(index);
      setOpenItem(arr);
    }
  };

  const fetchCategoriesData = async () => {
    const response = await axios.get(
      `${environmentVar?.apiUrl}/api/user/filter/get_data`
    );
    return response?.data?.data;
  };
  const { data, isLoading, error } = useQuery(
    "filteronsidebar",
    fetchCategoriesData
  );

  const handleColorsID = (colorId) => {
    const isSelected = colorIds.includes(colorId);

    const updatedIds = isSelected
      ? colorIds.filter((id) => id !== colorId)
      : [...colorIds, colorId];
    updateColorIds(updatedIds);
  };
  const handleShapesID = (shapeId) => {
    const isSelected = shapeIds.includes(shapeId);

    const updatedIds = isSelected
      ? shapeIds.filter((id) => id !== shapeId)
      : [...shapeIds, shapeId];
    updateShapeIds(updatedIds);
  };

  const navigate = useNavigate();
  const handleCheckboxChange = (item) => {
    const newUrl = `/glasses/${category}/${catid}/${item?.value}/${item?.id}`;
    navigate(newUrl);
  };
  const handleCheckboxMaterialChange = (materialId) => {
    const isSelected = materialIds.includes(materialId);

    const updatedIds = isSelected
      ? materialIds.filter((id) => id !== materialId)
      : [...materialIds, materialId];
    updateMaterialIds(updatedIds);
  };
  const handleCheckboxSizeChange = (sizeId) => {
    const isSelected = sizeIds.includes(sizeId);

    const updatedIds = isSelected
      ? sizeIds.filter((id) => id !== sizeId)
      : [...sizeIds, sizeId];
    updateSizeIds(updatedIds);
  };
  const handleCheckboxWeightGroupChange = (weightGroupId) => {
    const isSelected = weightGroupIds.includes(weightGroupId);

    const updatedIds = isSelected
      ? weightGroupIds.filter((id) => id !== weightGroupId)
      : [...weightGroupIds, weightGroupId];
    updateWeightGroupsIds(updatedIds);
  };
  const handleCheckboxPricingChange = (minPrice, maxPrice) => {
    // Check if minPrice already exists, and if so, remove it
    const updatedMinIds = MinPricingIds.includes(minPrice)
      ? MinPricingIds.filter((price) => price !== minPrice)
      : [...MinPricingIds, minPrice];

    // Check if maxPrice already exists, and if so, remove it
    const updatedMaxIds = MaxPricingIds.includes(maxPrice)
      ? MaxPricingIds.filter((price) => price !== maxPrice)
      : [...MaxPricingIds, maxPrice];

    updateMinPricingIds(updatedMinIds);
    updateMaxPricingIds(updatedMaxIds);
  };

  useEffect(() => {
    // Reset styling logic here
    // For example, assuming you have a function to reset styling called resetStyling
    resetStyling();
  }, [catid, genderid]); // This useEffect will be triggered whenever catid or genderid changes

  const resetStyling = () => {
    // Clear the shapeIds or any other state responsible for styling
    updateShapeIds([]);
    updateColorIds([]);
    updateMaterialIds([]);
    updateSizeIds([]);
    updateWeightGroupsIds([]);
    updateMinPricingIds([]);
    updateMaxPricingIds([]);
  };

  const getPricing = () => {
    // let config = {
    //   method: 'get',
    //   url: `${environmentVar?.apiUrl}/api/user/filter/get_filtered_price?country_code=${countryCode}`,
    // };

    // axios.request(config)
    // .then((response) => {
    //   setPricing(response?.data?.data)
    // })
    // .catch((error) => {
    //   setPricing()
    // });

    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/user/filter/get_filtered_price?country_code=${countryCode}&cat_id=${catid}&gender=${genderid}`,
    };

    axios
      .request(config)
      .then((response) => {
        setPricing(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
        setPricing();
      });
  };
  useEffect(() => {
    getPricing();
  }, [catid, genderid]);
  return (
    <div className="leftsidebar-main">
      <div className="left-sidebar-header">
        <h2>Filter</h2>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={onClose}
          className="close-icon"
        />
      </div>

      <ul className="accordion-menu">
        {state?.genderData.length === 0 ? (
          <></>
        ) : (
          <li>
            <label onClick={() => toggleItem(1)}>
              Gender
              <FontAwesomeIcon
                icon={openItem.includes(1) ? faMinus : faPlus}
                className="plusicon"
              />
            </label>
            {openItem.includes(1) && (
              <ul className="submenu">
                {state &&
                  state?.genderData?.map((item, index) => {
                    return (
                      <li key={index}>
                        {" "}
                        <input
                          type="checkbox"
                          checked={Number(genderid) === item?.id}
                          onChange={() => handleCheckboxChange(item)}
                        />{" "}
                        <h2>
                          {item?.value?.charAt(0).toUpperCase() +
                            item?.value?.slice(1)}
                        </h2>{" "}
                      </li>
                    );
                  })}
              </ul>
            )}
          </li>
        )}

        <li>
          <label onClick={() => toggleItem(2)}>
            Shape
            <FontAwesomeIcon
              icon={openItem.includes(2) ? faMinus : faPlus}
              className="plusicon"
            />
          </label>

          {openItem.includes(2) && (
            <ul className="submenu">
              <li>
                <div className="shapemain">
                  {data &&
                    data?.shape?.map((item, index) => {
                      return (
                        <div
                          className="shapebox"
                          key={index}
                          style={{
                            background: shapeIds.includes(item?.id)
                              ? "#032140"
                              : "",
                            color: shapeIds.includes(item?.id) ? "#fff" : "",
                          }}
                          onClick={() => handleShapesID(item?.id)}
                        >
                          <img
                            src={`${environmentVar?.cdnUrl}/uploads/filterProduct/category/${item?.image}`}
                            onClick={() => handleShapesID(item?.id)}
                            style={{
                              // background: shapeIds.includes(item?.id)
                              //   ? "#032140"
                              //   : "",
                              filter: shapeIds.includes(item?.id)
                                ? "invert(1)"
                                : "",
                            }}
                          />
                          <h2>
                            {item?.value?.charAt(0).toUpperCase() +
                              item?.value?.slice(1)}
                          </h2>
                        </div>
                      );
                    })}
                </div>
              </li>
            </ul>
          )}
        </li>

        <li>
          <label onClick={() => toggleItem(3)}>
            Color
            <FontAwesomeIcon
              icon={openItem.includes(3) ? faMinus : faPlus}
              className="plusicon"
            />
          </label>

          {openItem.includes(3) && (
            <ul className="submenu">
              <li>
                <div className="colored-circles-container">
                  {data &&
                    data?.color?.map((item, index) => (
                      <Circle
                        style={{
                          backgroundColor: item?.value,
                          border: colorIds.includes(item?.id)
                            ? "3px solid black"
                            : "",
                        }}
                        key={index}
                        onClick={() => handleColorsID(item?.id)}
                      ></Circle>
                    ))}
                </div>
              </li>
            </ul>
          )}
        </li>

        <li>
          <label onClick={() => toggleItem(4)}>
            Material
            <FontAwesomeIcon
              icon={openItem.includes(4) ? faMinus : faPlus}
              className="plusicon"
            />
          </label>

          {openItem.includes(4) && (
            <ul className="submenu">
              {data &&
                data?.material?.map((item, index) => (
                  <li key={index}>
                    {" "}
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxMaterialChange(item?.id)}
                      checked={materialIds.includes(item?.id)}
                    />{" "}
                    <h2>
                      {item?.value?.charAt(0).toUpperCase() +
                        item?.value?.slice(1)}
                    </h2>{" "}
                  </li>
                ))}
            </ul>
          )}
        </li>

        <li>
          <label onClick={() => toggleItem(5)}>
            Size
            <FontAwesomeIcon
              icon={openItem.includes(5) ? faMinus : faPlus}
              className="plusicon"
            />
          </label>

          {openItem.includes(5) && (
            <ul className="submenu">
              {data &&
                data?.size?.map((item, index) => (
                  <li key={index}>
                    {" "}
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxSizeChange(item?.id)}
                      checked={sizeIds.includes(item?.id)}
                    />{" "}
                    <h2>
                      {item?.value?.charAt(0).toUpperCase() +
                        item?.value?.slice(1)}
                    </h2>{" "}
                  </li>
                ))}
            </ul>
          )}
        </li>

        <li>
          <label onClick={() => toggleItem(6)}>
            Weight Group
            <FontAwesomeIcon
              icon={openItem.includes(6) ? faMinus : faPlus}
              className="plusicon"
            />
          </label>

          {openItem.includes(6) && (
            <ul className="submenu">
              {data &&
                data?.weight_group?.map((item, index) => (
                  <li key={index}>
                    {" "}
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxWeightGroupChange(item?.id)}
                      checked={weightGroupIds.includes(item?.id)}
                    />{" "}
                    <h2>
                      {item?.value?.charAt(0).toUpperCase() +
                        item?.value?.slice(1)}
                    </h2>{" "}
                  </li>
                ))}
            </ul>
          )}
        </li>

        <li>
          <label onClick={() => toggleItem(7)}>
            Price
            <FontAwesomeIcon
              icon={openItem.includes(7) ? faMinus : faPlus}
              className="plusicon"
            />
          </label>

          {openItem.includes(7) && (
            <ul className="submenu">
              {/* {data &&
              data?.price_range?.map((item, index) => {
                return item?.max === undefined ? (
                  <li>
                    {" "}
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxPricingChange(item?.min, "morethan")
                      }
                      checked={MinPricingIds.includes(item?.min)}
                    />{" "}
                    <h2>≥</h2> ₹{item?.min}{" "}
                  </li>
                ) : (
                  <li key={index}>
                    {" "}
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxPricingChange(item?.min, item?.max)
                      }
                      checked={MaxPricingIds.includes(item?.max)}
                    />{" "}
                    <h2>₹{item?.min} - ₹{item?.max}{" "}</h2>
                  </li>
                );
              })} */}
              {pricing &&
                pricing?.priceRanges?.map((item, index) => {
                  let currencySymbol;

                  if (pricing?.country_code === "AE") {
                    currencySymbol = "د.إ";
                  } else if (pricing?.country_code === "US") {
                    currencySymbol = "$";
                  } else {
                    currencySymbol = "₹";
                  }

                  return (
                    <>
                      <li key={index}>
                        {" "}
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxPricingChange(item?.min, item?.max)
                          }
                          checked={MaxPricingIds.includes(item?.max)}
                        />{" "}
                        <h2>
                          {currencySymbol}
                          {item?.min} - {currencySymbol}
                          {item?.max}{" "}
                        </h2>
                      </li>
                    </>
                  );
                })}
            </ul>
          )}
        </li>
      </ul>
      <div className="left-sidebar-buttons">
        <button className="btn btn-secondary" onClick={resetStyling}>
          Clear All
        </button>
        <button className="btn btn-primary" onClick={onClose}>
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
