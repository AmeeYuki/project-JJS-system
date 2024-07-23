import React, { useEffect } from "react";
import { Modal, Button, List, Spin } from "antd";
import { useLazyGetPolicyCustomerAcceptQuery } from "../../../../services/customerAPI";

export default function PolicyModel({
  isVisible,
  onClose,
  customerId,
  onApplyDiscount,
}) {
  const [trigger, { data: policies, isLoading, refetch }] =
    useLazyGetPolicyCustomerAcceptQuery();

  useEffect(() => {
    if (customerId && isVisible) {
      trigger(customerId); // Trigger the lazy query when customerId and isVisible are set
      const intervalId = setInterval(() => {
        refetch();
      }, 5000); // Refetch data every 5 seconds

      return () => clearInterval(intervalId); // Clear interval on component unmount or when dependencies change
    }
  }, [customerId, isVisible, trigger, refetch]);

  const handleApply = (policy) => {
    const discountData = {
      discountRate: policy.discountRate,
      fixedDiscountAmount: policy.fixedDiscountAmount,
      id: policy.id,
    };
    onApplyDiscount(discountData);
    onClose(); // Close the modal after applying the discount
  };

  const renderPolicyDescription = (policy) => {
    const startDate = new Date(policy.validFrom * 1000).toLocaleDateString(
      "en-GB"
    );
    const endDate = new Date(policy.validTo * 1000).toLocaleDateString("en-GB");
    return `${startDate} - ${endDate}`;
  };

  const isWithinDateRange = (policy) => {
    const currentTime = Date.now() / 1000; // Convert current time to seconds
    return currentTime >= policy.validFrom && currentTime <= policy.validTo;
  };

  return (
    <Modal
      title="Customer policy"
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
            const isAvailable = isWithinDateRange(policy);

            return (
              <List.Item
                actions={[
                  // eslint-disable-next-line react/jsx-key
                  <Button
                    type="primary"
                    onClick={() => handleApply(policy)}
                    disabled={!isAvailable}
                  >
                    Apply
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={discountText}
                  description={renderPolicyDescription(policy)}
                />
              </List.Item>
            );
          }}
        />
      )}
    </Modal>
  );
}
