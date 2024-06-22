import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailPageLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        marginTop: "100px",
        marginBottom: "100px",
      }}
    >
      <div
        style={{
          width: "calc(30% - 10px)",
          marginRight: "1%",
          height: "400px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <Skeleton height={200} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "45px",
          }}
        >
          <div>
            <Skeleton height={70} width={100} />
          </div>
          <div>
            <Skeleton height={70} width={100} />
          </div>
          <div>
            <Skeleton height={70} width={100} />
          </div>
          <div>
            <Skeleton height={70} width={100} />
          </div>
        </div>
      </div>

      <div
        style={{
          width: "calc(30% - 10px)",
          marginRight: "1%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <Skeleton height={400} /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Skeleton height={100} width={100} />
          <Skeleton height={30} width={30} />
        </div>
        <div>
          <Skeleton height={100} width={"100%"} />
        </div>
        <div>
          <Skeleton height={100} width={"100%"} />
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <Skeleton height={50} width={100} />
          </div>
          <div style={{ marginLeft: "20px" }}>
            <Skeleton height={50} width={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageLoader;
