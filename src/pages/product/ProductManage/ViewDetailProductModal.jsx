import React from "react";
import { Modal, Button, Row, Col } from "antd";

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
            <strong>Material:</strong> {product.productName}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Barcode:</strong> {product.barcode}
          </p>
          <p style={{ marginBottom: "10px" }}>
            <strong>Weight:</strong> {product.weight}
          </p>
          <p style={{ marginBottom: "0" }}>
            <strong>Price:</strong> {product.price}
          </p>
        </Col>
      </Row>
    </Modal>
  );
};

export default ViewDetailProductModal;
