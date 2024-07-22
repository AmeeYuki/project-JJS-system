import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCheckPaymentMutation,
  useUpdateOrderStatusCancelMutation,
  useUpdateOrderStatusCompleteMutation,
} from "../../../../services/orderAPI";
import { notification, Spin, Button, Flex } from "antd";

export default function CheckPayment() {
  const { orderId, requestId } = useParams();
  const navigate = useNavigate();
  const [checkPayment] = useCheckPaymentMutation();
  const [updateOrderComplete] = useUpdateOrderStatusCompleteMutation();
  const [updateOrderCancel] = useUpdateOrderStatusCancelMutation();
  const [loading, setLoading] = useState(true); // Track loading state
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (loading) {
      const id = setInterval(async () => {
        try {
          const response = await checkPayment({ orderId, requestId }).unwrap();

          switch (response.resultCode) {
            case 1000:
              // Payment initiated, keep checking
              break;
            case 1007:
              // Payment successful, update order status and navigate
              await updateOrderComplete({ orderId });
              notification.success({
                message: "Payment completed successfully!",
              });
              navigate(`/order/${orderId}`);
              setLoading(false); // Stop checking after success
              clearInterval(id);
              break;
            case 1006:
              // Payment canceled, update order status
              await updateOrderCancel({ orderId });
              notification.error({
                message: "Payment canceled!",
              });
              navigate(`/order/${orderId}`);

              setLoading(false); // Stop checking after cancel
              clearInterval(id);
              break;
            default:
              // Handle other result codes if needed
              break;
          }
        } catch (err) {
          console.error("Error checking payment:", err);
          notification.error({
            message: "Error checking payment!",
          });
          setLoading(false); // Stop checking on error
          clearInterval(id);
        }
      }, 2000); // Check every 2 seconds

      setIntervalId(id);

      // Cleanup function to clear the interval when component unmounts or stops checking
      return () => clearInterval(id);
    }
  }, [
    loading,
    checkPayment,
    updateOrderComplete,
    updateOrderCancel,
    orderId,
    requestId,
    navigate,
  ]);

  const handleCancel = async () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setLoading(false); // Stop loading state

    try {
      // Call API to update order status to canceled
      await updateOrderCancel({ orderId });
      notification.info({
        message: "Order has been canceled.",
      });
      navigate(`/order/${orderId}`); // Navigate to order page or any other relevant page
    } catch (error) {
      console.error("Error canceling order:", error);
      notification.error({
        message: "Failed to cancel the order.",
      });
    }
  };

  useEffect(() => {
    setLoading(true); // Start checking when component mounts
    return () => setLoading(false); // Stop checking when component unmounts
  }, []);

  return (
    <div style={{ marginTop: "150px" }}>
      <Flex vertical align="center">
        <div style={{ textAlign: "center" }}>
          <h1>Check Payment Status</h1>
          <p>Order ID: {orderId}</p>
          <p>Request ID: {requestId}</p>
        </div>
        <Spin tip="Checking payment status...">
          {/* <div style={{ textAlign: "center" }}>Please wait...</div> */}
        </Spin>
        <div>
          <Button
            type="primary"
            danger
            style={{ marginTop: 36, width: 100 }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Flex>
    </div>
  );
}
