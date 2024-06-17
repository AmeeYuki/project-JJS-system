import React from "react";
import { Modal, Button } from "antd";

export default function PromotionModal({ isVisible, onClose }) {
  return (
    <Modal
      title="Promotion"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onClose}>
          Apply
        </Button>,
      ]}
    >
      <p>Promotion details and options here.</p>
    </Modal>
  );
}
