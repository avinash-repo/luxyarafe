import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loader = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ width: "calc(32% - 10px)", marginRight: "1%" }}>
        <Skeleton height={200} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton width={100} height={50} />
          <Skeleton width={100} height={50} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton width={150} height={100} />
          <Skeleton width={150} height={100} />
        </div>
      </div>
      <div style={{ width: "calc(32% - 10px)", marginRight: "1%" }}>
        <Skeleton height={200} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton width={100} height={50} />
          <Skeleton width={100} height={50} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton width={150} height={100} />
          <Skeleton width={150} height={100} />
        </div>
      </div>
      <div style={{ width: "calc(32% - 10px)", marginRight: "1%" }}>
        <Skeleton height={200} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton width={100} height={50} />
          <Skeleton width={100} height={50} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton width={150} height={100} />
          <Skeleton width={150} height={100} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
