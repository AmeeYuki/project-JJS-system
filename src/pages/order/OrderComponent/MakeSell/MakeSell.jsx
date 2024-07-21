// import Search from "antd/es/input/Search";
// import "./MakeSell.css";
// import { Button, Col, ConfigProvider, Row, notification } from "antd";
// import CustomerSpace from "./CustomerSpace";
// import ProductSpace from "./ProductSpace";
// import { useAddOrderMutation } from "../../../../services/orderAPI";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { selectAuth } from "../../../../slices/auth.slice";
// import { useNavigate } from "react-router-dom";
// import {
//   useAddPointMutation,
//   useUsedPolicyMutation,
//   useUsePointMutation,
// } from "../../../../services/customerAPI";

// export default function MakeSell() {
//   const [addOrder, { isLoading }] = useAddOrderMutation();
//   const [customerData, setCustomerData] = useState(false);
//   const [customerId, setCustomerId] = useState();
//   const [customerPoint, setCustomerPoint] = useState();
//   const [customerDataUpdate, setCustomerDataUpdate] = useState();
//   const [pointUpdate, setPointUpdate] = useState();
//   const [policyId, setPolicyId] = useState();
//   const [pointDiscount, setPointDiscount] = useState(0);
//   const [usedPolicy] = useUsedPolicyMutation();
//   const [applyPoints, { isLoading: isApplyingPoints }] = useUsePointMutation(); // Use the usePoint mutation
//   const [addPoint] = useAddPointMutation(); // Use the usePoint mutation
//   const [payment, setPayment] = useState(0);
//   const [orderStatus, setOrderStatus] = useState(0);
//   // const [loading, isLoading] = useState(false);
//   const auth = useSelector(selectAuth);
//   const navigate = useNavigate();

//   const [orderData, setOrderData] = useState({
//     orderRequests: [
//       {
//         quantity: 0,
//         product_id: 0,
//         unit_price: 0,
//       },
//     ],
//     orderDTO: {
//       date: new Date().toISOString(), // Lấy ngày hiện tại
//       discount: 0,
//       created_by: auth.name,
//       type: "sell",
//       customer_id: 0,
//       user_id: auth.id,
//       counter_id: auth?.counter?.id || null,
//       payment_method: payment,
//       order_status: orderStatus,
//     },
//   });

//   const handleSubmit = async (e) => {
//     console.log(orderData);
//     // const payload=

//     // if (orderData.orderRequests.length <= 0) {
//     //   notification.error({
//     //     message: "Not product in cart",
//     //   });
//     //   return;
//     // }
//     // try {
//     //   const response = await addOrder(orderData); // Call the mutation to add the order and unwrap the response
//     //   console.log(response);
//     //   if (response.error.originalStatus === 200) {
//     //     await addPoint({
//     //       data: customerDataUpdate,
//     //       point: pointUpdate,
//     //     }); // Call the mutation to add the order and unwrap the response

//     //     if (pointDiscount !== 0) {
//     //       await applyPoints({
//     //         customerId: customerId,
//     //         point: pointDiscount,
//     //       });
//     //     }

//     //     if (policyId) {
//     //       await usedPolicy({ id: policyId });
//     //     }
//     //     if (response) {
//     //       notification.success({
//     //         message: "Order made successfully",
//     //       });
//     //       navigate("/order");
//     //     } else {
//     //       throw new Error(`Unexpected status code: ${response.status}`);
//     //     }
//     //   } else {
//     //     notification.error({
//     //       message: "Error making order",
//     //     });
//     //   }
//     // } catch (error) {
//     //   console.error("Error adding order:", error);
//     //   notification.error({
//     //     message: "Error making order",
//     //     description: error.message,
//     //   });
//     // }
//   };

//   const handleCustomerInfoChange = (customerInfo) => {
//     // Cập nhật thông tin khách hàng vào state orderData
//     // console.log("Customer info changed:", customerInfo?.id); // Log dữ liệu khi thông tin khách hàng thay đổi
//     setCustomerId(customerInfo?.id);
//     setCustomerPoint(customerInfo?.accumulated_point);
//     setOrderData((prevData) => ({
//       ...prevData,
//       orderDTO: {
//         ...prevData.orderDTO,
//         customer_id: customerInfo?.id,
//         // Cập nhật các trường thông tin khác nếu cần
//       },
//     }));
//   };

//   const handleProductChange = ({ products, discount }) => {
//     const newOrderRequests = products.map((product) => ({
//       quantity: product.quantity,
//       product_id: product.id,
//       unit_price: product.totalPrice,
//     }));

//     // Update orderData with new order requests and discount
//     setOrderData((prevData) => ({
//       ...prevData,
//       orderRequests: newOrderRequests,
//     }));
//   };

//   const handleOnDiscountData = (discountData) => {
//     // Cập nhật thông tin khách hàng vào state orderData
//     setPolicyId(discountData.id);
//   };

//   const handleGetCustomerInfo = () => {
//     setCustomerData(true);
//   };

//   const handleBackOrder = () => {
//     navigate("/order");
//   };
//   const handleDiscountChange = (discountData) => {
//     console.log(discountData);
//     setOrderData((prevData) => ({
//       ...prevData,
//       orderDTO: {
//         ...prevData.orderDTO,
//         discount: discountData,
//         // Adjust as per your orderData structure
//       },
//     }));
//   };

//   const handlePointDiscount = (point) => {
//     setPointDiscount(point);
//   };

//   const handleCustomerData = (values) => {
//     setCustomerDataUpdate(values);
//   };
//   const handlePaymentMethod = (values) => {
//     setPayment(values);
//   };

//   const handleSubtotal = (values) => {
//     const pointValue = 100000;
//     const points = Math.floor(values / pointValue);
//     const pointUpdate = points + customerPoint;

//     setPointUpdate(pointUpdate);
//   };

//   return (
//     <div className="make-sell-page">
//       <div className="header">
//         <h1 className="title">Make Sell</h1>
//       </div>
//       <div className="body">
//         <div className="customer-space">
//           <CustomerSpace
//             onCustomerInfoChange={handleCustomerInfoChange}
//             handleGetCustomerInfo={handleGetCustomerInfo}
//             onCustomerData={handleCustomerData}
//           />
//         </div>
//         {customerData == true ? (
//           <div className="product-space">
//             <ProductSpace
//               auth={auth}
//               customerId={customerId}
//               customerPoint={customerPoint}
//               onProductChange={handleProductChange}
//               discountChange={handleDiscountChange}
//               onDiscountData={handleOnDiscountData}
//               onPointDiscount={handlePointDiscount}
//               onSubtotalOrder={handleSubtotal}
//               setPaymentMethod={handlePaymentMethod}
//             />
//           </div>
//         ) : null}

//         {customerData == true ? (
//           <div className="d-flex-center" style={{ marginTop: 20 }}>
//             <div>
//               <Button type="primary" size="large" onClick={handleBackOrder}>
//                 Back
//               </Button>
//             </div>
//             <div>
//               <Button
//                 type="primary"
//                 size="large"
//                 onClick={handleSubmit}
//                 loading={isLoading}
//               >
//                 Make Order
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="d-flex-center" style={{ marginTop: 20 }}>
//             <div>
//               <Button type="primary" size="large" onClick={handleBackOrder}>
//                 Back
//               </Button>
//             </div>
//             <div></div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Button, message, notification } from "antd";
import CustomerSpace from "./CustomerSpace";
import "./MakeSell.css";
import ProductSpace from "./ProductSpace";
import { useAddOrderMutation } from "../../../../services/orderAPI";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../slices/auth.slice";
import { useNavigate } from "react-router-dom";
import {
  useAddPointMutation,
  useUsedPolicyMutation,
  useUsePointMutation,
} from "../../../../services/customerAPI";

export default function MakeSell() {
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const [usedPolicy] = useUsedPolicyMutation();
  const [applyPoints] = useUsePointMutation();
  const [addPoint] = useAddPointMutation();

  const [customerData, setCustomerData] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [customerPoint, setCustomerPoint] = useState();
  const [customerDataUpdate, setCustomerDataUpdate] = useState();
  const [pointUpdate, setPointUpdate] = useState();
  const [policyId, setPolicyId] = useState();
  const [pointDiscount, setPointDiscount] = useState(0);
  const [payment, setPayment] = useState(0);
  const [orderStatus, setOrderStatus] = useState(0);
  const [orderRequests, setOrderRequests] = useState([]);
  const [discount, setDiscount] = useState(0);

  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (orderRequests.length === 0) {
      message.error("Cart is not empty.");
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
      console.log(response);
      if (response.error.originalStatus === 200) {
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

        notification.success({
          message: "Order made successfully",
        });
        navigate("/order");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error adding order:", error);
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
