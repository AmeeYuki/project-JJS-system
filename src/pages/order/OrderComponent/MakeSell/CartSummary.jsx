import React from "react";
import { Button } from "antd";
import { RiCouponLine, RiUserStarLine } from "@remixicon/react";

const CartSummary = ({
  subtotal,
  discount,
  discountPercent,
  totalBeforeDiscount,
  setVoucherModalVisible,
  setPromotionModalVisible,
  setSendRequestModalVisible,
}) => {
  // console.log(discount);
  // console.log(discountPercent);
  return (
    <div className="cart-total">
      <div className="voucher d-flex-center">
        <div>
          <p className="d-flex-text-center">
            <RiCouponLine />
            Voucher:
            <Button
              type="primary"
              size="small"
              onClick={() => setVoucherModalVisible(true)}
            >
              Add Voucher
            </Button>
          </p>
        </div>
        <p>200 VNĐ</p>
      </div>
      <div className="policy d-flex-center">
        <div>
          <p className="d-flex-text-center">
            <RiUserStarLine />
            Customer Policy:
            <Button
              type="primary"
              size="small"
              onClick={() => setSendRequestModalVisible(true)}
            >
              Send Request
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => setPromotionModalVisible(true)}
            >
              Add policy
            </Button>
          </p>
        </div>
        {(discount !== 0 || discountPercent !== 0) && (
          <p>
            {discountPercent !== 0
              ? `${discountPercent}%`
              : `${discount.toLocaleString()} VNĐ`}
          </p>
        )}
      </div>
      <div className="money">
        <div className="d-flex-center">
          <p>Provisional:</p>
          <p>{subtotal.toLocaleString()} VNĐ</p>
        </div>
        {discountPercent !== 0 && (
          <div className="d-flex-center">
            <p>Discount ({discountPercent}%):</p>
            <p>{discount.toLocaleString()} VNĐ</p>
          </div>
        )}{" "}
        {discountPercent === 0 && (
          <div className="d-flex-center">
            <p>Discount:</p>
            <p>{discount.toLocaleString()} VNĐ</p>
          </div>
        )}
        {discount === 0 && discountPercent === 0 ? null : (
          <div className="d-flex-center">
            <p style={{ fontSize: "25px", fontWeight: 500 }}>Total:</p>
            <p style={{ color: "red", fontWeight: 500 }}>
              {totalBeforeDiscount.toLocaleString()} VNĐ
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
