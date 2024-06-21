import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, message, Row, Col, Card, Button } from "antd";
import {
  useAddOrderMutation,
  useLazyGetOrderByIdQuery,
  useLazyGetOrderDetailQuery,
} from "../../../../services/orderAPI"; // Adjust the path as necessary
import OrderInformation from "./OrderInformation";
import OrderProducts from "./OrderProducts";
import Cart from "./Cart";
import "./MakePurchase.css";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../slices/auth.slice";

export default function MakePurchase() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const auth = useSelector(selectAuth);

  const [addOrder, { isLoading }] = useAddOrderMutation();
  const [orderData, setOrderData] = useState({
    orderRequests: [], // Danh sách sản phẩm trong giỏ hàng
    orderDTO: {
      date: new Date().toISOString(), // Ngày hiện tại
      discount: 0, // Giảm giá (nếu có)
      created_by: auth.name, // Người tạo đơn hàng
      type: "buy", // Loại đơn hàng (có thể là buy, sell, ...)
      customer_id: 0, // ID khách hàng (nếu có)
      user_id: auth.id, // ID người dùng tạo đơn hàng
    },
  });

  const [getOrderById, { isLoading: isOrderLoading }] =
    useLazyGetOrderByIdQuery();
  const [getOrderDetail, { isLoading: isProductsLoading }] =
    useLazyGetOrderDetailQuery();

  const handleSearch = async () => {
    try {
      const orderData = await getOrderById(orderId).unwrap();
      setOrder(orderData);
      const productsData = await getOrderDetail(orderId).unwrap();
      setProducts(productsData);
    } catch (error) {
      message.error("Failed to fetch order details.");
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.product_name === product.product_name
    );

    // Kiểm tra số lượng yêu cầu không được vượt quá quantity của sản phẩm
    if (existingItem && existingItem.quantity + 1 > product.quantity) {
      message.error(`Cannot add more than ${product.quantity} items`);
    } else {
      if (existingItem) {
        const updatedCartItems = cartItems.map((item) =>
          item.product_name === product.product_name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (key) => {
    setCartItems(cartItems.filter((item) => item.key !== key));
  };

  const addToOrderData = (product) => {
    const { product_id, unit_price, quantity } = product;

    const existingRequest = orderData.orderRequests.find(
      (item) => item.product_id === product_id
    );

    if (existingRequest) {
      const updatedRequests = orderData.orderRequests.map((item) =>
        item.product_id === product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setOrderData({
        ...orderData,
        orderRequests: updatedRequests,
      });
    } else {
      const newRequest = {
        quantity: quantity,
        product_id: product_id,
        unit_price: unit_price,
      };
      setOrderData({
        ...orderData,
        orderRequests: [...orderData.orderRequests, newRequest],
      });
    }
  };

  const handleMakeOrder = async () => {
    try {
      // Lấy danh sách sản phẩm từ giỏ hàng để thêm vào đơn hàng
      const orderRequests = cartItems.map((item) => ({
        quantity: item.quantity,
        product_id: item.product_id,
        unit_price: item.unit_price,
      }));

      // Cập nhật orderData với danh sách sản phẩm từ giỏ hàng
      setOrderData({
        ...orderData,
        orderRequests: orderRequests,
      });

      // Gọi API để tạo đơn hàng
      const result = await addOrder(orderData).unwrap();
      message.success("Order successfully created!");

      // Sau khi đơn hàng được tạo thành công, làm sạch giỏ hàng và đặt lại dữ liệu đơn hàng
      setCartItems([]);
      setOrderData({
        orderRequests: [],
        orderDTO: {
          date: new Date().toISOString(),
          discount: 0,
          created_by: auth.name,
          type: "buy",
          customer_id: 0,
          user_id: auth.id,
        },
      });
    } catch (error) {
      message.error("Failed to create order.");
    }
  };

  return (
    <div className="make-purchase-page">
      <div className="header">
        <h1 className="title">Make Sell</h1>
        {!order && (
          <div className="action">
            <div className="action-left">
              <Input
                style={{ borderRadius: 20, width: "350px" }}
                size="large"
                placeholder="Search by order id"
                prefix={<SearchOutlined />}
                onPressEnter={handleSearch}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      {isOrderLoading || isProductsLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {order && (
            <>
              <OrderInformation order={order} />
              <OrderProducts products={products} addToCart={addToCart} />
              <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
              <Button
                type="primary"
                onClick={handleMakeOrder}
                loading={isLoading}
                disabled={orderData.orderRequests.length === 0}
              >
                Make Order
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}
