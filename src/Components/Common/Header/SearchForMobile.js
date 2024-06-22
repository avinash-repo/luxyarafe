import React, { useEffect, useState } from "react";
import "./Header.scss";
import search_icon from "../../../Images/Magnifer.webp";
import axios from "axios";
import { environmentVar } from "../../../config/environmentVar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SearchForMobile = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchData, setSearchData] = useState(null);
  const navigate = useNavigate();
  const handleChangeSearch = (value) => {
    setSearchKey(value);
    if (value.length >= 2) {
      let config = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/product/get_all_product_by_search?searchString=${value}&country_code=IN`,
        withCredentials: true,
      };
      axios
        .request(config)
        .then((response) => {
          setSearchData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchData(null);
    }
  };
  const handleClickNavSearch = (id) => {
    let data = {
      searchString: searchKey,
    };

    let config = {
      method: "post",
      url: `${environmentVar?.apiUrl}/api/product/search_params_data`,
      withCredentials: true,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        navigate(`/detailpage/${id}`);
      })
      .catch((error) => {
        toast.error("Unable to set search key", {
          autoClose: 2000,
        });
        navigate(`/detailpage/${id}`);
      });
  };
  const getSearchComponents = (searchData) => {
    if (searchData == null || searchData == undefined) {
      return <></>;
    } else if (searchData.length == 0) {
      return <div className="search-items-container">No Data Found</div>;
    } else if (searchData.length > 0) {
      return (
        <>
          {searchData.map((val) => (
            <div
              onClick={() => handleClickNavSearch(val?.id)}
              className="search-items-container"
            >
              <div className="search-items-img-wrapper">
                <img
                  src={`${environmentVar?.cdnUrl}/uploads/${val?.thumbnail_img}`}
                />
              </div>
              <div>
                <div className="search-item-details">{val?.title}</div>
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="search-for-mobile">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => handleChangeSearch(e.target.value)}
            placeholder="Search Eyewear"
          />
          <img src={search_icon} />
        </div>
        <div
          style={{
            backgroundColor: "white",
            position: "absolute",
            zIndex: "1",
            width: "100%",
            padding: "0px 16px",
          }}
        >
          {getSearchComponents(searchData)}
        </div>
      </div>
    </>
  );
};

export default SearchForMobile;
