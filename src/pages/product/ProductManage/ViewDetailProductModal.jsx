import React from "react";
import { Modal, Button, Row, Col, Tag } from "antd";
import { formatCurrency } from "../ProductUtil.jsx";

const ViewDetailProductModal = ({ visible, onClose, product }) => {
  return (
    <Modal
      title={
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333333",
          }}
        >
          View Detail
        </div>
      }
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button
          key="close"
          onClick={onClose}
          style={{
            backgroundColor: "#555555",
            color: "white",
            padding: "5px 40px",
          }}
        >
          Close
        </Button>,
      ]}
    >
      <Row justify="center" style={{ marginBottom: "20px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "500",
              marginBottom: "10px",
            }}
          >
            {product.productName}
          </div>
        </Col>
      </Row>
      <Row
        justify="center"
        align="middle"
        style={{
          padding: "10px 20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Col span={10} style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "200px", height: "200px", overflow: "hidden" }}>
            <img
              src={product.image}
              alt={product.productName}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        </Col>

        <Col span={14} style={{ paddingLeft: "20px" }}>
          <p style={{ marginBottom: "10px" }}>
            <strong>Type:</strong> {product.type}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Barcode:</strong> {product.barcode}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Weight:</strong> {product.weight} {product.weightUnit}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Price Processing:</strong>{" "}
            {formatCurrency(product.priceProcessing)}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Price Stone:</strong> {formatCurrency(product.priceStone)}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Description:</strong> {product.description}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Counter Name:</strong> {product.counterName}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Counter Location:</strong> {product.counterLocation}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Buy Price Per Gram:</strong>{" "}
            {formatCurrency(product.buyPricePerGram)}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Sell Price Per Gram:</strong>{" "}
            {formatCurrency(product.sellPricePerGram)}
          </p>
          <p style={{ marginBottom: "0" }}>
            <strong>Status:</strong>{" "}
            <Tag color={product.active ? "green" : "volcano"}>
              {product.active ? "ACTIVE" : "INACTIVE"}
            </Tag>
          </p>
        </Col>
      </Row>
    </Modal>
  );
};

export default ViewDetailProductModal;
