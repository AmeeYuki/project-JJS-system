import { useState } from "react";
import { Button, message, notification } from "antd";
import CustomerSpace from "./CustomerSpace";
import "./MakeSell.css";
import ProductSpace from "./ProductSpace";
import {
  useAddOrderMutation,
  useCreatePaymentMutation,
  useCreateWarrantiesMutation,
  useUpdateOrderStatusCompleteMutation,
} from "../../../../services/orderAPI";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../slices/auth.slice";
import { useNavigate } from "react-router-dom";
import {
  useAddPointMutation,
  useUsedPolicyMutation,
  useUsePointMutation,
} from "../../../../services/customerAPI";
import WarrantiesForm from "./WarrantiesForm";

export default function MakeSell() {
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const [usedPolicy] = useUsedPolicyMutation();
  const [applyPoints] = useUsePointMutation();
  const [addPoint] = useAddPointMutation();
  const [createPayment] = useCreatePaymentMutation();
  const [createWarranties] = useCreateWarrantiesMutation();
  const [updateOrderComplete] = useUpdateOrderStatusCompleteMutation();

  const [customerData, setCustomerData] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [customerPoint, setCustomerPoint] = useState();
  const [warrantiesData, setWarrantiesData] = useState(null);
  const [customerDataUpdate, setCustomerDataUpdate] = useState();
  const [pointUpdate, setPointUpdate] = useState();
  const [policyId, setPolicyId] = useState();
  const [pointDiscount, setPointDiscount] = useState(0);
  const [payment, setPayment] = useState(0);
  const [orderStatus, setOrderStatus] = useState(1);
  const [orderRequests, setOrderRequests] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isWarrantyModalVisible, setIsWarrantyModalVisible] = useState(false);

  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (orderRequests.length === 0) {
      message.error("Cart is not empty.");
      return;
    }

    if (warrantiesData === null) {
      message.error("Warranties is not empty.");
      return;
    }

    const orderData = {
      orderRequests,
      orderDTO: {
        date: new Date().toISOString(),
        discount,
        created_by: auth.name,
        type: "sell",
        customer_id: customerId,
        user_id: auth.id,
        counter_id: auth?.counter?.id || null,
        payment_method: payment,
        order_status: orderStatus,
      },
    };

    console.log(orderData);

    try {
      const response = await addOrder(orderData);
      const orderId = response.data.order.id;
      if (response.data) {
        if (warrantiesData) {
          const payloadWarranties = {
            time_warranty: warrantiesData.timeWarranty,
            customer_name: auth.name,
            warranty_detail: warrantiesData.warrantyDetail,
            order_id: orderId,
          };
          console.log(payloadWarranties);
          const responseWareent = await createWarranties(payloadWarranties);
          console.log(responseWareent);
        }

        if (customerDataUpdate) {
          await addPoint({
            data: customerDataUpdate,
            point: pointUpdate,
          });
        }

        if (pointDiscount !== 0) {
          await applyPoints({
            customerId,
            point: pointDiscount,
          });
        }

        if (policyId) {
          await usedPolicy({ id: policyId });
        }
        if (payment === 0) {
          notification.success({
            message: "Order made successfully",
          });
          await updateOrderComplete({
            orderId: orderId,
          });
          navigate(`/order/${orderId}`);
        } else if (payment === 1) {
          const totalOrder = orderRequests.reduce(
            (sum, req) => sum + req.quantity * req.unit_price,
            0
          );
          const totalFinal = Math.round(totalOrder - discount);
          // totalFinal = Math.round(totalFinal);

          console.log(totalFinal);
          const orderInfo = `Order ID: ${orderId}, Total: ${totalFinal}`;
          console.log(orderInfo);
          const paymentResponse = await createPayment({
            orderId,
            total: totalFinal,
            // total: 1000,
            orderInfo,
          });
          console.log(paymentResponse);
          const requestId = paymentResponse.data.payload.requestId;
          console.log(requestId);

          if (paymentResponse.data) {
            const payUrl = paymentResponse.data.payUrl;
            notification.success({
              message: "Order made successfully with momo",
            });
            window.open(payUrl, "_blank");
            navigate(`/check-payment/${orderId}/${requestId}`);

            // navigate(`/order/${orderId}`);
          } else {
            notification.error({
              message: "Payment creation failed",
            });
          }
        }
      } else {
        notification.error({
          message: "Order made Unsuccessfully",
        });
      }
    } catch (error) {
      console.error("Error adding order:", error);
      console.log();
      notification.error({
        message: "Error making order",
        description: error.message,
      });
    }
  };

  const handleCustomerInfoChange = (customerInfo) => {
    setCustomerId(customerInfo?.id);
    setCustomerPoint(customerInfo?.accumulated_point);
  };

  const handleProductChange = ({ products, discount }) => {
    const newOrderRequests = products.map((product) => ({
      quantity: product.quantity,
      product_id: product.id,
      unit_price: product.totalPrice,
    }));
    setOrderRequests(newOrderRequests);
    setDiscount(discount);
  };

  const handleOnDiscountData = (discountData) => {
    setPolicyId(discountData.id);
  };

  const handleGetCustomerInfo = () => {
    setCustomerData(true);
  };

  const handleBackOrder = () => {
    navigate("/order");
  };

  const handlePointDiscount = (point) => {
    setPointDiscount(point);
  };

  const handleCustomerData = (values) => {
    setCustomerDataUpdate(values);
  };

  const handlePaymentMethod = (values) => {
    setPayment(values);
  };

  const handleSubtotal = (values) => {
    const pointValue = 100000;
    const points = Math.floor(values / pointValue);
    const pointUpdate = points + customerPoint;
    setPointUpdate(pointUpdate);
  };

  console.log(warrantiesData);

  const handleWarrantySubmit = (warrantyData) => {
    setWarrantiesData(warrantyData);

    setIsWarrantyModalVisible(false);
    notification.success({
      message: "Warranty submitted successfully!",
    });
  };

  const showWarrantyModal = () => {
    setIsWarrantyModalVisible(true);
  };

  const handleCancelWarrantyModal = () => {
    setIsWarrantyModalVisible(false);
  };

  return (
    <div className="make-sell-page">
      <div className="header">
        <h1 className="title">Make Sell</h1>
      </div>
      <div className="body">
        <div className="customer-space">
          <CustomerSpace
            onCustomerInfoChange={handleCustomerInfoChange}
            handleGetCustomerInfo={handleGetCustomerInfo}
            onCustomerData={handleCustomerData}
          />
        </div>
        {customerData && (
          <div className="product-space">
            <ProductSpace
              auth={auth}
              customerId={customerId}
              customerPoint={customerPoint}
              onProductChange={handleProductChange}
              discountChange={setDiscount}
              onDiscountData={handleOnDiscountData}
              onPointDiscount={handlePointDiscount}
              onSubtotalOrder={handleSubtotal}
              setPaymentMethod={handlePaymentMethod}
            />
            <Button type="primary" onClick={showWarrantyModal}>
              Add Warranty
            </Button>
            <WarrantiesForm
              visible={isWarrantyModalVisible}
              onCancel={handleCancelWarrantyModal}
              onSubmit={handleWarrantySubmit}
              warrantiesData={warrantiesData}
            />
          </div>
        )}

        <div className="d-flex-center" style={{ marginTop: 20 }}>
          <Button type="primary" size="large" onClick={handleBackOrder}>
            Back
          </Button>
          {customerData && (
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={isLoading}
            >
              Make Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
