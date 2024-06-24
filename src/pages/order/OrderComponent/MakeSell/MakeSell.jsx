import Search from "antd/es/input/Search";
import "./MakeSell.css";
import { Button, Col, ConfigProvider, Row, notification } from "antd";
import CustomerSpace from "./CustomerSpace";
import ProductSpace from "./ProductSpace";
import { useAddOrderMutation } from "../../../../services/orderAPI";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../slices/auth.slice";
import { useNavigate } from "react-router-dom";

export default function MakeSell() {
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const [customerData, setCustomerData] = useState(false);
  const [customerId, setCustomerId] = useState();
  // const [loading, isLoading] = useState(false);
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    orderRequests: [
      {
        quantity: 0,
        product_id: 0,
        unit_price: 0,
      },
    ],
    orderDTO: {
      date: new Date().toISOString(), // Lấy ngày hiện tại
      discount: 0,
      created_by: auth.name,
      type: "sell",
      customer_id: 0,
      user_id: auth.id,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({
      ...prevState,
      orderDTO: {
        ...prevState.orderDTO,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    console.log(orderData);

    // if (orderData.orderRequests.length <= 0) {
    //   notification.error({
    //     message: "Not product in cart",
    //   });
    //   return;
    // }
    // try {
    //   const response = await addOrder(orderData); // Call the mutation to add the order and unwrap the response
    //   console.log(response);
    //   if (response) {
    //     notification.success({
    //       message: "Order made successfully",
    //     });
    //     navigate("/order");
    //   } else {
    //     throw new Error(`Unexpected status code: ${response.status}`);
    //   }
    // } catch (error) {
    //   console.error("Error adding order:", error);
    //   notification.error({
    //     message: "Error making order",
    //     description: error.message,
    //   });
    // }
  };

  const handleCustomerInfoChange = (customerInfo) => {
    // Cập nhật thông tin khách hàng vào state orderData
    // console.log("Customer info changed:", customerInfo?.id); // Log dữ liệu khi thông tin khách hàng thay đổi
    setCustomerId(customerInfo?.id);
    setOrderData((prevData) => ({
      ...prevData,
      orderDTO: {
        ...prevData.orderDTO,
        customer_id: customerInfo?.id,
        // Cập nhật các trường thông tin khác nếu cần
      },
    }));
  };

  const handleProductChange = (productData) => {
    // Xử lý dữ liệu sản phẩm tại đây, ví dụ: cập nhật state, log, hoặc thực hiện các hành động khác
    // console.log("Product data changed:", productData);

    console.log(productData);
    // Tạo một mảng mới chứa order requests dựa trên productData
    const newOrderRequests = productData.map((product) => ({
      quantity: product.quantity,
      product_id: product.id,
      unit_price: product.totalPrice,
    }));

    console.log("newOrderRequests:", newOrderRequests);

    // Cập nhật orderRequests trong orderData
    setOrderData((prevData) => ({
      ...prevData,
      orderRequests: newOrderRequests,
    }));
  };

  const handleGetCustomerInfo = () => {
    setCustomerData(true);
  };

  const handleBackOrder = () => {
    navigate("/order");
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
          />
        </div>
        {customerData == true ? (
          <div className="product-space">
            <ProductSpace
              customerId={customerId}
              onProductChange={handleProductChange}
            />
          </div>
        ) : null}

        {customerData == true ? (
          <div className="d-flex-center" style={{ marginTop: 20 }}>
            <div>
              <Button type="primary" size="large" onClick={handleBackOrder}>
                Back
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                loading={isLoading}
              >
                Make Order
              </Button>
            </div>
          </div>
        ) : (
          <div className="d-flex-center" style={{ marginTop: 20 }}>
            <div>
              <Button type="primary" size="large" onClick={handleBackOrder}>
                Back
              </Button>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}
