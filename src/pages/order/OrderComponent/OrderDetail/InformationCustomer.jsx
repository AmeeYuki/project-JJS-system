import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

export default function InformationCustomer({ order, warranties }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const renderWarrantyTime = (timeWarranty) => {
    switch (timeWarranty) {
      case 1:
        return "3 months";
      case 2:
        return "6 months";
      case 3:
        return "12 months";
      default:
        return "Unknown";
    }
  };

  return (
    <div>
      <h3 className="">Information:</h3>

      <div className="information-detail">
        <Row>
          <Col span={12}>
            <Row>
              <Col span={8} offset={0}>
                <p>Order Code:</p>
              </Col>
              <Col span={15}>{order?.id}</Col>
              <Col span={8} offset={0}>
                <p>Create by:</p>
              </Col>
              <Col span={15}>{order?.created_by}</Col>
              <Col span={8} offset={0}>
                <p>Create Date:</p>
              </Col>
              <Col span={15}>{dayjs(order?.date).format("DD/MM/YYYY")}</Col>
              <Col span={8} offset={0}>
                <p>Type:</p>
              </Col>
              <Col span={15}>{order?.type == "sell" ? "Sell" : "Buy"}</Col>{" "}
              <Col span={8} offset={0}>
                <p>Status:</p>
              </Col>
              <Col span={15}>
                {order?.order_status == 0
                  ? "Paying"
                  : order?.order_status == 1
                  ? "Complete"
                  : order?.order_status == 2
                  ? "Cancel"
                  : null}
              </Col>{" "}
              <Col span={8} offset={0}>
                <p>Payment method:</p>
              </Col>
              <Col span={15}>
                {order?.payment_method == 0 ? "Cash" : "Momo"}
              </Col>
              {/* <Col span={8} offset={0}>
                <p>Discount:</p>
              </Col> */}
              {/* <Col span={15}>
                {order?.discount.toLocaleString()}
                VNĐ
              </Col> */}
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8} offset={0}>
                <p>Customer Name:</p>
              </Col>
              <Col span={15}>
                <p>{order ? order?.customer.fullName : null}</p>
              </Col>
              <Col span={8} offset={0}>
                <p>Email:</p>
              </Col>
              <Col span={15}>
                <p>{order ? order?.customer.email : null}</p>
              </Col>
              <Col span={8} offset={0}>
                <p>Phone:</p>
              </Col>
              <Col span={15}>
                <p>{order ? order?.customer.phone : null}</p>
              </Col>
              <Col span={8} offset={0}>
                <p>Address:</p>
              </Col>
              <Col span={15}>
                <p>{order ? order?.customer.address : null}</p>
              </Col>
              <Col span={8} offset={0}>
                <p>Warranties:</p>
              </Col>
              <Col span={15}>
                <Button size="small" onClick={showModal}>
                  View Warranties
                </Button>{" "}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Modal
        title="Warranty Details"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {warranties?.length > 0 ? (
          warranties.map((warranty, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <p>
                <strong>Time Warranty:</strong>{" "}
                {renderWarrantyTime(warranty.timeWarranty)}
              </p>
              <p>
                <strong>Customer Name:</strong> {warranty.customerName}
              </p>
              <p>
                <strong>Create Date:</strong>{" "}
                {dayjs(warranty.createdDate).format("DD/MM/YYYY")}
              </p>
              <p>
                <strong>Warranty Details:</strong> {warranty.warrantyDetail}
              </p>
            </div>
          ))
        ) : (
          <p>No warranties available for this order.</p>
        )}
      </Modal>
    </div>
  );
}
