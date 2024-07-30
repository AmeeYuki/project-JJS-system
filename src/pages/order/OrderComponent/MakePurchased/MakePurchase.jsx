// import { useState } from "react";
// import { SearchOutlined } from "@ant-design/icons";
// import { Input, message, Button, Row, Col } from "antd";
// import {
//   useAddOrderMutation,
//   useLazyGetOrderByIdQuery,
//   useLazyGetOrderDetailQuery,
//   useUpdateOrderStatusCompleteMutation,
//   useUpdatePurchasedQuantityMutation,
// } from "../../../../services/orderAPI";
// import OrderInformation from "./OrderInformation";
// import OrderProducts from "./OrderProducts";
// import Cart from "./Cart";
// import "./MakePurchase.css";
// import { useSelector } from "react-redux";
// import { selectAuth } from "../../../../slices/auth.slice";
// import { useNavigate } from "react-router-dom";

// export default function MakePurchase() {
//   const [orderId, setOrderId] = useState("");
//   const [order, setOrder] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const auth = useSelector(selectAuth);
//   const navigate = useNavigate();
//   const [addOrder, { isLoading }] = useAddOrderMutation();
//   const [updateOrderComplete] = useUpdateOrderStatusCompleteMutation();
//   const [updatePurchasedQuantity] = useUpdatePurchasedQuantityMutation();

//   const [getOrderById, { isLoading: isOrderLoading }] =
//     useLazyGetOrderByIdQuery();
//   const [getOrderDetail, { isLoading: isProductsLoading }] =
//     useLazyGetOrderDetailQuery();

//   const handleSearch = async () => {
//     try {
//       const orderData = await getOrderById(orderId).unwrap();
//       if (orderData.type === "buy") {
//         message.error("Cannot process orders of type 'buy'.");
//         return;
//       }

//       setOrder(orderData);

//       const productsData = await getOrderDetail(orderId).unwrap();
//       setProducts(productsData);
//     } catch (error) {
//       message.error("Failed to fetch order details.");
//     }
//   };

//   const addToCart = (product) => {
//     const existingItem = cartItems.find(
//       (item) => item.product_id === product.product_id
//     );

//     if (existingItem) {
//       const totalQuantity = existingItem.quantity + product.quantity;
//       if (totalQuantity > product.maxQuantity) {
//         message.error(
//           `The product quantity in the cart cannot exceed the original quantity.`
//         );
//       } else {
//         const updatedCartItems = cartItems.map((item) =>
//           item.product_id === product.product_id
//             ? { ...item, quantity: totalQuantity }
//             : item
//         );
//         setCartItems(updatedCartItems);
//       }
//     } else {
//       setCartItems([
//         ...cartItems,
//         {
//           ...product,
//           quantity: product.quantity,
//           maxQuantity: product.quantity,
//           totalPriceBuy: product.totalPriceBuy,
//         },
//       ]);
//     }
//   };

//   const removeFromCart = (key) => {
//     setCartItems(cartItems.filter((item) => item.key !== key));
//   };
//   const updateCartQuantity = (key, value) => {
//     const updatedCartItems = cartItems.map((item) =>
//       item.key === key ? { ...item, quantity: value } : item
//     );
//     setCartItems(updatedCartItems);
//   };

//   const handleMakeOrder = async () => {
//     try {
//       const orderRequests = cartItems.map((item) => ({
//         quantity: item.quantity,
//         product_id: item.product_id,
//         unit_price: item.totalPriceBuy,
//       }));

//       const finalOrderData = {
//         orderRequests,
//         orderDTO: {
//           date: new Date().toISOString(),
//           discount: 0,
//           created_by: auth.name,
//           type: "buy",
//           payment_method: 0,
//           order_status: 1,
//           customer_id: order.customer.id,
//           user_id: auth.id,
//           counter_id: auth?.counter?.id,
//         },
//       };

//       const result = await addOrder(finalOrderData);
//       const orderId = result.data.order.id;

//       if (result.data) {
//         await Promise.all(
//           cartItems.map((item) =>
//             updatePurchasedQuantity({
//               orderDetailId: item.orderDetailId,
//               quantity: item.quantity,
//             })
//           )
//         );

//         await updateOrderComplete({ orderId });

//         setCartItems([]);
//         setOrder(null);

//         navigate(`/order/${orderId}`);

//         message.success("Order successfully created!");
//       }
//     } catch (error) {
//       message.error("Failed to create order.");
//     }
//   };

//   return (
//     <div className="make-purchase-page">
//       <div className="header">
//         <h1 className="title">Make Repurchase</h1>
//         {!order && (
//           <div className="action">
//             <div className="action-left">
//               <Input
//                 style={{ borderRadius: 20, width: "350px" }}
//                 size="large"
//                 placeholder="Search by order id"
//                 prefix={<SearchOutlined />}
//                 onPressEnter={handleSearch}
//                 onChange={(e) => setOrderId(e.target.value)}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//       {order && (
//         <>
//           <OrderInformation order={order} />
//           <OrderProducts products={products} addToCart={addToCart} />
//           <Cart
//             cartItems={cartItems}
//             removeFromCart={removeFromCart}
//             updateCartQuantity={updateCartQuantity}
//           />
//           <Row style={{ marginTop: "20px" }} justify="space-between">
//             <Col></Col>
//             <Button
//               type="primary"
//               onClick={handleMakeOrder}
//               loading={isLoading}
//               disabled={cartItems.length === 0}
//             >
//               Make Repurchased
//             </Button>
//           </Row>
//         </>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, message, Button, Row, Col } from "antd";
import {
  useAddOrderMutation,
  useLazyGetOrderByIdQuery,
  useLazyGetOrderDetailQuery,
  useUpdateOrderStatusCompleteMutation,
  useUpdatePurchasedQuantityMutation,
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
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const [addOrder, { isLoading }] = useAddOrderMutation();
  const [updateOrderComplete] = useUpdateOrderStatusCompleteMutation();
  const [updatePurchasedQuantity] = useUpdatePurchasedQuantityMutation();
  const [getOrderById, { isLoading: isOrderLoading }] =
    useLazyGetOrderByIdQuery();
  const [getOrderDetail, { isLoading: isProductsLoading }] =
    useLazyGetOrderDetailQuery();

  const handleSearch = async () => {
    try {
      const orderData = await getOrderById(orderId).unwrap();
      if (orderData.type === "buy") {
        message.error("Cannot process orders of type 'buy'.");
        return;
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
      (item) => item.product_id === product.product_id
    );
    const totalRepurchaseQuantity =
      repurchaseQuantities[product.product_id] || 0;
    const newRepurchaseQuantity = totalRepurchaseQuantity + product.quantity;

    if (existingItem) {
      const totalQuantity = existingItem.quantity + product.quantity;
      if (totalQuantity > product.maxQuantity) {
        message.error(
          "The product quantity in the cart cannot exceed the original quantity."
        );
      } else {
        const updatedCartItems = cartItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: totalQuantity }
            : item
        );
        setCartItems(updatedCartItems);
      }
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: product.quantity,
          maxQuantity: product.quantity,
          totalPriceBuy: product.totalPriceBuy,
        },
      ]);
    }

    setRepurchaseQuantities({
      ...repurchaseQuantities,
      [product.product_id]: newRepurchaseQuantity,
    });
  };

  const removeFromCart = (key) => {
    const item = cartItems.find((item) => item.key === key);
    if (item) {
      const updatedRepurchaseQuantities = {
        ...repurchaseQuantities,
        [item.product_id]:
          repurchaseQuantities[item.product_id] - item.quantity,
      };
      setRepurchaseQuantities(updatedRepurchaseQuantities);
    }
    setCartItems(cartItems.filter((item) => item.key !== key));
  };

  const updateCartQuantity = (key, value) => {
    const updatedCartItems = cartItems.map((item) =>
      item.key === key ? { ...item, quantity: value } : item
    );
    setCartItems(updatedCartItems);
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
      const orderId = result.data.order.id;

      if (result.data) {
        await Promise.all(
          cartItems.map((item) =>
            updatePurchasedQuantity({
              orderDetailId: item.orderDetailId,
              quantity: item.quantity,
            })
          )
        );

        await updateOrderComplete({ orderId });

        setCartItems([]);
        setOrder(null);

        navigate(`/order/${orderId}`);

        message.success("Order successfully created!");
      }
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
      {order && (
        <>
          <OrderInformation order={order} />
          <OrderProducts
            products={products}
            addToCart={addToCart}
            repurchaseQuantities={repurchaseQuantities}
          />
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
          />
          <Row style={{ marginTop: "20px" }} justify="space-between">
            <Col></Col>
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
