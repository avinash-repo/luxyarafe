import React, { useContext } from "react";
import "./RightFilters.scss";
import { FilterContext } from "../../../context/FilterContext";
import { useNavigate } from "react-router-dom";

const RightFilters = () => {
  const { selectedSort, setSelectedSort } = useContext(FilterContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="filtersmain">
        <div className="filtersleft">
          {/* <button className="button mr-30">View Frames</button>
          <button
            onClick={() => navigate("/tryon")}
            className="light-white-button"
          >
            3D Try On
          </button> */}
        </div>
        <div className="filtersright">
          <select
            id="dropdown"
            className="sort"
            value={selectedSort}
            placeholder="Sort By"
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="" disabled selected hidden>Sort By</option>
            <option value="default">Default</option>
            {/* <option value="popular">Popular</option> */}
            <option value="new_arrival">New Arrivals</option>
            <option value="ascending">Low to High</option>
            <option value="descending">High to Low</option>
          </select>
        </div>
      </div>

    </>
  );
};

export default RightFilters;
