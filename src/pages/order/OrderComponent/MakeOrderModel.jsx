import React from "react";
import { Modal, Button, Space } from "antd";
// import "../Order.css";
const MakeOrderModal = ({ open, onMakeSell, onMakePurchase, onCancel }) => {
  return (
    <Modal
      open={open}
      title="Make a New Order"
      onCancel={onCancel}
      footer={null}
    >
      <div className="make-order-space">
        <Button
          style={{ width: "45%" }}
          type="primary"
          block
          onClick={onMakeSell}
        >
          Make Sell
        </Button>
        <Button
          style={{ width: "50%" }}
          type="primary"
          block
          onClick={onMakePurchase}
        >
          Make Purchase
        </Button>
      </div>
    </Modal>
  );
};

export default MakeOrderModal;
