import React, { useState } from "react";
import { Button, Radio, Select } from "antd";
import { RiDiscountPercentLine } from "@remixicon/react";
import { Option } from "antd/es/mentions";

const CartSummary = ({
  subtotal,
  discount,
  discountPercent,
  totalBeforeDiscount,
  setVoucherModalVisible,
  setPromotionModalVisible,
  setSendRequestModalVisible,
  customerPoint,
  onPointChange, // New prop to handle points change
  setPaymentMethod,
}) => {
  const [discountType, setDiscountType] = useState("voucher");
  const [enteredPoints, setEnteredPoints] = useState(0);

  const handleAddVoucher = () => {
    setDiscountType("voucher");
    setVoucherModalVisible(true);
  };

  const handleAddPolicy = () => {
    setDiscountType("policy");
    setPromotionModalVisible(true);
  };

  const handleSendRequest = () => {
    setDiscountType("request");
    setSendRequestModalVisible(true);
  };

  const handlePointsChange = (e) => {
    const points = parseInt(e.target.value, 10);
    if (!isNaN(points) && points >= 0 && points <= customerPoint) {
      setEnteredPoints(points);
      onPointChange(points); // Call the handler from props
    }
  };

  const handleChange = (value) => {
    setPaymentMethod(value.target.value);
  };
  return (
    <div className="cart-total">
      <div className="policy">
        <div className="d-flex-space">
          <p className="d-flex-text-center">
            <RiDiscountPercentLine />
            Select Discount:
          </p>
          {(discount !== 0 || discountPercent !== 0) && (
            <p>
              {discountPercent !== 0
                ? `${discountPercent}%`
                : `${discount?.toLocaleString()} VNĐ`}
            </p>
          )}
        </div>
        <div className="d-flex-text-center" style={{ marginBottom: 10 }}>
          <Button
            type={discountType === "voucher" ? "primary" : "default"}
            size="small"
            onClick={handleAddVoucher}
          >
            Add Voucher
          </Button>
        </div>
        <div className="d-flex-text-center">
          <Button
            type={
              discountType === "request" || discountType === "policy"
                ? "primary"
                : "default"
            }
            size="small"
            onClick={handleSendRequest}
          >
            Send Policy
          </Button>
          <Button
            type={discountType === "policy" ? "primary" : "default"}
            size="small"
            onClick={handleAddPolicy}
          >
            Add policy
          </Button>
        </div>
      </div>
      <div className="money">
        <div className="d-flex-center">
          <p>Provisional:</p>
          <p>{subtotal.toLocaleString()} VNĐ</p>
        </div>
        {discountType === "policy" && (
          <div className="d-flex-center">
            <p>Discount (Policy):</p>
            <p>{discount.toLocaleString()} VNĐ</p>
          </div>
        )}
        {discountType === "request" && (
          <div className="d-flex-center">
            <p>Discount (Policy):</p>
            <p>{discount.toLocaleString()} VNĐ</p>
          </div>
        )}
        {discountType === "voucher" && (
          <div className="d-flex-center">
            <p>Discount (Voucher):</p>
            <p>{discount?.toLocaleString()} VNĐ</p>
          </div>
        )}
        <div className="d-flex-center">
          <p style={{ fontSize: "25px", fontWeight: 500 }}>
            Point ({customerPoint}):
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="number"
                value={enteredPoints}
                onChange={handlePointsChange}
                style={{
                  width: "60px",
                  textAlign: "center",
                  marginRight: "10px",
                }}
              />
            </div>
          </p>
          <p style={{ color: "red", fontWeight: 500 }}>
            {(enteredPoints * 1000).toLocaleString()} VNĐ
          </p>
        </div>
        <div className="d-flex-center">
          <p style={{ fontSize: "25px", fontWeight: 500 }}>Total:</p>
          <p style={{ color: "red", fontWeight: 500 }}>
            {totalBeforeDiscount.toLocaleString()} VNĐ
          </p>
        </div>
        <hr />
        <p style={{ fontSize: "20px", fontWeight: 500 }}>Payment method:</p>

        <Radio.Group defaultValue={0} onChange={handleChange}>
          <Radio value={0}>Cash</Radio>
          <Radio value={1}>MoMo</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default CartSummary;
