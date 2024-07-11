import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./GoldPrice.css"

const GoldPricePage = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="title">Welcome to Gold Price Page</h1>
        </Col>
      </Row>

      <iframe
        title="Gold Price"
        width="100%"
        height="750px"
        src="https://webtygia.com/api/vang?bgheader=000000&colorheader=ffffff&padding=5&fontsize=16&hienthi="
      ></iframe>
    </Container>
  );
};

export default GoldPricePage;
