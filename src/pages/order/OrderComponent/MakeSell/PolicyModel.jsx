import React, { useEffect } from "react";
import { Modal, Button, List, Spin } from "antd";
import { useGetPolicyCustomerAcceptQuery } from "../../../../services/customerAPI";

export default function PolicyModel({
  isVisible,
  onClose,
  customerId,
  onApplyDiscount,
}) {
  const {
    data: policies,
    isLoading,
    refetch,
  } = useGetPolicyCustomerAcceptQuery(customerId, {
    skip: !customerId, // Skip query if customerId is not provided
  });

  useEffect(() => {
    if (customerId && isVisible) {
      refetch();
    }
  }, [customerId, isVisible, refetch]);

  const handleApply = (policy) => {
    const discountData = {
      discountRate: policy.discountRate,
      fixedDiscountAmount: policy.fixedDiscountAmount,
      id: policy.id,
    };
    onApplyDiscount(discountData);
    onClose(); // Close the modal after applying the discount
  };

  return (
    <Modal
      title="Promotion"
      visible={isVisible}
      onCancel={onClose}
      footer={null} // Remove the default footer
    >
      {isLoading ? (
        <Spin />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={policies}
          renderItem={(policy) => {
            const discountRateText =
              policy.discountRate !== 0 ? `${policy.discountRate}%` : "";
            const fixedDiscountText =
              policy.fixedDiscountAmount !== 0
                ? `${new Intl.NumberFormat().format(
                    policy.fixedDiscountAmount
                  )} VNĐ`
                : "";
            const discountText = [discountRateText, fixedDiscountText]
              .filter((text) => text)
              .join(" / ");

            return (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => handleApply(policy)}>
                    Apply
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={discountText}
                  description={policy.description}
                />
              </List.Item>
            );
          }}
        />
      )}
    </Modal>
  );
}
