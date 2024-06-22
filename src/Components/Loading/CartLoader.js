import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Col } from "react-bootstrap";

const CartLoader = () => {
  return (
    <Col md={8} style={{ marginBottom: "100px", display: "flex" }}>
      <div style={{ width: "20%", textAlign: "center" }}>
        <Skeleton height={"60%"} width={"90%"} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
        <Skeleton height={100} />
        <Skeleton height={100} />
        <Skeleton height={100} />
      </div>
    </Col>
  );
};

export default CartLoader;
