import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Tabs, Tab } from "react-bootstrap";
import "./Coupens.scss";
import SingleCoupen from "./SingleCoupen";

const Coupens = () => {
  const [key, setKey] = useState("home");

  return (
    <>
      <Col md={9}>
        <div className="my-wishlist-main">
          <h1>Coupons</h1>
          <div className="coupens">
            <Tabs
              id="controlled-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="home" title="All Coupons">
                <Row>
                  <Col lg={6} xl={6}>
                    <SingleCoupen />
                  </Col>
                  <Col lg={6} xl={6}>
                    <SingleCoupen />
                  </Col>
                  <Col lg={6} xl={6}>
                    <SingleCoupen />
                  </Col>
                  <Col lg={6} xl={6}>
                    <SingleCoupen />
                  </Col>
                  <Col lg={6} xl={6}>
                    <SingleCoupen />
                  </Col>
                  <Col lg={6} xl={6}>
                    <SingleCoupen />
                  </Col>
                  <Col lg={6} xl={6}>
                    <SingleCoupen />
                  </Col>
                  <Col lg={6} xl={6}>
                    <SingleCoupen />
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey="profile" title="Expired Coupons">
                <Row>
                  <Col md={4}>
                    <SingleCoupen />
                  </Col>
                  <Col md={4}>
                    <SingleCoupen />
                  </Col>
                  <Col md={4}>
                    <SingleCoupen />
                  </Col>
                  <Col md={4}>
                    <SingleCoupen />
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Coupens;
