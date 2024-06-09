import Search from "antd/es/input/Search";
import "./MakeSell.css";
import { Button, Col, ConfigProvider, Row } from "antd";
import CustomerSpace from "./CustomerSpace";
import ProductSpace from "./ProductSpace";
import { useAddOrderMutation } from "../../../../services/orderAPI";
import { useState } from "react";

export default function MakeSell() {
  const [addOrder, { isLoading }] = useAddOrderMutation();

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
      created_by: "string",
      type: "string",
      customer_id: 0,
      user_id: 0,
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
    e.preventDefault();
    try {
      const { data } = await addOrder(orderData); // Gọi mutation để thêm đơn hàng
      console.log("Added order:", data);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };
  const handleCustomerInfoChange = (customerInfo) => {
    // Cập nhật thông tin khách hàng vào state orderData
    setOrderData((prevData) => ({
      ...prevData,
      orderDTO: {
        ...prevData.orderDTO,
        customer_id: customerInfo.customer_id,
        // Cập nhật các trường thông tin khác nếu cần
      },
    }));
  };
  return (
    <div className="make-sell-page">
      <div className="header">
        <h1 className="title">Make Sell</h1>
      </div>
      <div className="body">
        <div className="customer-space">
          <CustomerSpace onCustomerInfoChange={handleCustomerInfoChange} />
        </div>
        <div className="product-space">
          <ProductSpace />
        </div>
        <div className="d-flex-center" style={{ marginTop: 20 }}>
          <div></div>
          <div>
            <Button type="primary" size="large">
              Make Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
