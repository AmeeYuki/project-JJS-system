import React, { useState } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import { useUsePromotionMutation } from "../../../../services/promotionAPI";

const VoucherModal = ({ isVisible, onClose, onApplyPromotion }) => {
  const [code, setCode] = useState("");
  const [usePromotion, { isLoading }] = useUsePromotionMutation();

  const handleApplyPromotion = async () => {
    try {
      const promotion = await usePromotion(code).unwrap();
      onApplyPromotion(promotion);
      message.success("Promotion applied successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to apply promotion:", error);
      message.error("Failed to apply promotion. Please try again.");
    }
  };

  return (
    <Modal
      title="Voucher"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleApplyPromotion}
          loading={isLoading}
        >
          Apply
        </Button>,
      ]}
    >
      <Form>
        <Form.Item label="Voucher Code" required>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your voucher code"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VoucherModal;
