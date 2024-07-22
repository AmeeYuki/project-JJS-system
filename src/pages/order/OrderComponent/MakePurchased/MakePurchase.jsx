import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, message, Button } from "antd";
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
import { useNavigate } from "react-router-dom";

export default function MakePurchase() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const [addOrder, { isLoading }] = useAddOrderMutation();

  const [getOrderById, { isLoading: isOrderLoading }] =
    useLazyGetOrderByIdQuery();
  const [getOrderDetail, { isLoading: isProductsLoading }] =
    useLazyGetOrderDetailQuery();

  const handleSearch = async () => {
    try {
      const orderData = await getOrderById(orderId).unwrap();
      if (orderData.type === "buy") {
        message.error("Cannot process orders of type 'buy'.");
        return; // Exit the function if the order type is 'buy'
      }

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

  const handleMakeOrder = async () => {
    try {
      const orderRequests = cartItems.map((item) => ({
        quantity: item.quantity,
        product_id: item.product_id,
        unit_price: item.totalPriceSell,
      }));

      const finalOrderData = {
        orderRequests,
        orderDTO: {
          date: new Date().toISOString(),
          discount: 0,
          created_by: auth.name,
          type: "buy",
          payment_method: 0,
          order_status: 0,
          customer_id: order.customer.id,
          user_id: auth.id,
          counter_id: auth?.counter?.id,
        },
      };

      const result = await addOrder(finalOrderData);
      console.log(result);
      message.success("Order successfully created!");
      setCartItems([]);
      setOrder(null);
      navigate("/order");
    } catch (error) {
      message.error("Failed to create order.");
    }
  };

  return (
    <div className="make-purchase-page">
      <div className="header">
        <h1 className="title">Make Repurchase</h1>
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
                disabled={cartItems.length === 0}
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
