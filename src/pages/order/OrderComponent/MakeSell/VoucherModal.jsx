import React, { useState } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import { useUsePromotionMutation } from "../../../../services/promotionAPI";

const VoucherModal = ({ isVisible, onClose, onApplyPromotion }) => {
  const [code, setCode] = useState("");
  const [promotionDetails, setPromotionDetails] = useState(null);
  const [usePromotion, { isLoading }] = useUsePromotionMutation();

  // const handleApplyPromotion = async () => {
  //   try {
  //     const promotion = await usePromotion(code).unwrap();
  //     console.log(promotion);
  //     if (promotion) {
  //       onApplyPromotion(promotion);
  //       setPromotionDetails(promotion); // Store promotion details
  //       message.success("Voucher applied successfully!");
  //     } else {
  //       message.error("Voucher applied fail!");
  //       onApplyPromotion(null);
  //       setPromotionDetails(null); // Store promotion details
  //     }
  //   } catch (error) {
  //     console.error("Failed to apply promotion:", error);
  //     message.error("Failed to apply promotion. Please try again.");
  //   }
  // };

  const handleApplyPromotion = async () => {
    try {
      const promotion = await usePromotion(code).unwrap();
      console.log(promotion);
      if (promotion) {
        const currentTime = Date.now();
        if (currentTime < promotion.startDate) {
          message.error("Voucher is not yet available.");
          return;
        } else if (currentTime > promotion.endDate) {
          message.error("Voucher has expired.");
          return;
        } else {
          onApplyPromotion(promotion);
          setPromotionDetails(promotion); // Store promotion details
          message.success("Voucher applied successfully!");
          return;
        }
      } else {
        message.error("Voucher applied fail!");
      }
      onApplyPromotion(null);
      setPromotionDetails(null); // Clear promotion details
    } catch (error) {
      console.error("Failed to apply promotion:", error);
      message.error("Failed to apply promotion. Please try again.");
    }
  };

  const renderPromotionDetails = () => {
    if (!promotionDetails) return null;

    return (
      <div className="promotion-details">
        <p>
          <strong>Code:</strong> {promotionDetails.code}
        </p>
        {/* <p>
          <strong>Description:</strong> {promotionDetails.description || "N/A"}
        </p> */}
        <p>
          <strong>Discount Percentage:</strong>{" "}
          {promotionDetails.discountPercentage}%
        </p>
        <p>
          <strong>Fixed Discount Amount:</strong>{" "}
          {promotionDetails.fixedDiscountAmount} VNĐ
        </p>
        <p>
          <strong>Start Date:</strong>{" "}
          {new Date(promotionDetails.startDate).toLocaleString()}
        </p>
        <p>
          <strong>End Date:</strong>{" "}
          {new Date(promotionDetails.endDate).toLocaleString()}
        </p>
        {/* <p>
          <strong>Used:</strong> {promotionDetails.used ? "Yes" : "No"}
        </p> */}
      </div>
    );
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
      {renderPromotionDetails()}
    </Modal>
  );
};

export default VoucherModal;
