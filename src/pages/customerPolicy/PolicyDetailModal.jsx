import React from "react";
import { Modal, Descriptions, Tag } from "antd";

const PolicyDetailModal = ({ visible, policy, onClose }) => {
  const getStatusTag = (status) => {
    let color;
    let text;
    switch (status) {
      case "pending":
        color = "blue";
        text = "PENDING";
        break;
      case "accept":
        color = "green";
        text = "ACCEPTED";
        break;
      case "reject":
        color = "red";
        text = "REJECTED";
        break;
      case "used":
        color = "green";
        text = "USED";
        break;
      default:
        color = "default";
        text = status.toUpperCase();
    }
    return <Tag color={color}>{text}</Tag>;
  };

  return (
    <Modal
      title="Policy Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {policy && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Customer">
            {policy.customer.fullName}
          </Descriptions.Item>{" "}
          <Descriptions.Item label="Phone">
            {policy.customer.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {policy.description}
          </Descriptions.Item>
          <Descriptions.Item label="Discount">
            {policy.discountRate !== 0 && `${policy.discountRate}%`}
            {policy.discountRate !== 0 &&
              policy.fixedDiscountAmount !== 0 &&
              " / "}
            {policy.fixedDiscountAmount !== 0 &&
              `${new Intl.NumberFormat().format(
                policy.fixedDiscountAmount
              )} VNĐ`}
          </Descriptions.Item>
          <Descriptions.Item label="Valid">
            {new Date(policy.validFrom * 1000).toLocaleDateString()} -{" "}
            {new Date(policy.validTo * 1000).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Created By">
            {policy.createdBy}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={2}>
            {getStatusTag(policy.publishingStatus)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default PolicyDetailModal;
