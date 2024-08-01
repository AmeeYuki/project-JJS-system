import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, message, Button, Row, Col } from "antd";
import {
  useAddOrderMutation,
  useLazyGetOrderByIdQuery,
  useLazyGetOrderDetailQuery,
  useUpdateOrderStatusCompleteMutation,
  useUpdatePurchasedQuantityMutation,
  useUpdateOrderDetailStatusPurchasedMutation,
  useUpdateOrderStatusCancelMutation,
} from "../../../../services/orderAPI";
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
  const [repurchaseQuantities, setRepurchaseQuantities] = useState({});
  const [originalQuantities, setOriginalQuantities] = useState({});
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const [updateOrderComplete] = useUpdateOrderStatusCompleteMutation();
  const [updateOrderCancel] = useUpdateOrderStatusCancelMutation();
  const [updatePurchasedQuantity] = useUpdatePurchasedQuantityMutation();
  const [updateOrderDetailStatusPurchased] =
    useUpdateOrderDetailStatusPurchasedMutation();
  const [getOrderById, { isLoading: isOrderLoading }] =
    useLazyGetOrderByIdQuery();
  const [getOrderDetail, { isLoading: isProductsLoading }] =
    useLazyGetOrderDetailQuery();

  const handleSearch = async () => {
    try {
      const orderData = await getOrderById(orderId).unwrap();
      if (!orderData || orderData.type === "buy") {
        message.error("Cannot process orders of type 'buy' or invalid order.");
        return;
      }

      setOrder(orderData);

      const productsData = await getOrderDetail(orderId).unwrap();
      setProducts(productsData);
      setOriginalQuantities(
        productsData.reduce((acc, item) => {
          acc[item.product.id] = item.quantity;
          return acc;
        }, {})
      );

      setRepurchaseQuantities(
        productsData.reduce((acc, item) => {
          acc[item.product.id] = 0;
          return acc;
        }, {})
      );
    } catch (error) {
      message.error("Failed to fetch order details.");
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.product_id === product.product_id
    );

    const productId = product.product_id;
    const originalQuantity = originalQuantities[productId];
    const totalRepurchaseQuantity = repurchaseQuantities[productId] || 0;

    const newRepurchaseQuantity = totalRepurchaseQuantity + product.quantity;

    if (existingItem) {
      const totalQuantity = existingItem.quantity + product.quantity;
      if (totalQuantity > originalQuantity) {
        message.error(
          "The product quantity in the cart cannot exceed the original quantity."
        );
        return;
      }

      const updatedCartItems = cartItems.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: totalQuantity }
          : item
      );

      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: product.quantity,
          maxQuantity: originalQuantity,
          totalPriceBuy: product.totalPriceBuy,
        },
      ]);
    }

    setRepurchaseQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newRepurchaseQuantity,
    }));
  };

  const removeFromCart = (key) => {
    setCartItems(cartItems.filter((item) => item.key !== key));
  };

  const updateCartQuantity = (key, quantity) => {
    setCartItems(
      cartItems.map((item) => (item.key === key ? { ...item, quantity } : item))
    );

    const updatedItem = cartItems.find((item) => item.key === key);
    if (updatedItem) {
      setRepurchaseQuantities((prevQuantities) => ({
        ...prevQuantities,
        [updatedItem.product_id]: quantity,
      }));
    }
  };

  const handleMakeOrder = async () => {
    try {
      const orderRequests = cartItems.map((item) => ({
        quantity: item.quantity,
        product_id: item.product_id,
        unit_price: item.totalPriceBuy,
      }));

      const finalOrderData = {
        orderRequests,
        orderDTO: {
          date: new Date().toISOString(),
          discount: 0,
          created_by: auth.name,
          type: "buy",
          payment_method: 0,
          order_status: 1,
          customer_id: order.customer.id,
          user_id: auth.id,
          counter_id: auth?.counter?.id,
        },
      };

      const result = await addOrder(finalOrderData);

      if (result.data) {
        const newOrderId = result.data.order.id;

        await Promise.all(
          cartItems.map((item) =>
            updatePurchasedQuantity({
              orderDetailId: item.orderDetailId,
              quantity: item.quantity,
            })
          )
        );

        await Promise.all(
          cartItems.map((item) =>
            updateOrderDetailStatusPurchased({
              orderDetailId: item.orderDetailId,
            })
          )
        );

        await updateOrderComplete({ orderId: newOrderId });

        setCartItems([]);
        setOrder(null);

        navigate(`/order/${newOrderId}`);

        message.success("Order successfully created!");
      }
    } catch (error) {
      message.error("Failed to create order.");
    }
  };

  const handleCancelOrder = async () => {
    try {
      if (orderId) {
        await updateOrderCancel({ orderId });
        setOrder(null);
        setCartItems([]);
        message.success("Order successfully canceled!");
      } else {
        message.error("No order to cancel.");
      }
    } catch (error) {
      message.error("Failed to cancel the order.");
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
      {order && (
        <>
          <OrderInformation order={order} />
          <OrderProducts
            products={products}
            addToCart={addToCart}
            repurchaseQuantities={repurchaseQuantities}
            originalQuantities={originalQuantities}
          />
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
          />
          <Row style={{ marginTop: "20px" }} justify="space-between">
            <Col>
              <Button
                type="default"
                onClick={handleCancelOrder}
                disabled={isLoading}
              >
                Cancel Order
              </Button>
            </Col>
            <Button
              type="primary"
              onClick={handleMakeOrder}
              loading={isLoading}
              disabled={cartItems.length === 0}
            >
              Make Repurchase
            </Button>
          </Row>
        </>
      )}
    </div>
  );
}
