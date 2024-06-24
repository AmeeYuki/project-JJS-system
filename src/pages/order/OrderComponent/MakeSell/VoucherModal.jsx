import React from "react";
import { Modal, Button } from "antd";

export default function VoucherModal({ isVisible, onClose }) {
  return (
    <Modal
      title="Voucher"
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
      <p>Voucher details and options here.</p>
    </Modal>
  );
}
