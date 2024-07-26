// import React from "react";
// import { Table, Button } from "antd";

// const Cart = ({ cartItems, removeFromCart }) => {
//   // console.log(cartItems);
//   const cartColumns = [
//     {
//       title: "No.",
//       dataIndex: "no",
//       key: "no",
//       render: (text, record, index) => index + 1,
//     },
//     {
//       title: "Product Name",
//       dataIndex: "product_name",
//       key: "product_name",
//     },
//     {
//       title: "Price to Buy",
//       dataIndex: "totalPriceBuy",
//       key: "unitPrice",
//       render: (totalPriceBuy) => `${totalPriceBuy.toLocaleString()} VNĐ`,
//     },
//     {
//       title: "Quantity",
//       dataIndex: "quantity",
//       key: "quantity",
//     },
//     {
//       title: "Total",
//       key: "total",
//       render: (_, record) =>
//         `${(record.totalPriceBuy * record.quantity).toLocaleString()} VNĐ`,
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Button onClick={() => removeFromCart(record.key)} type="danger">
//           Remove
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <br />
//       <h6 className="sub-title">Cart Information</h6>
//       <hr />
//       <Table columns={cartColumns} dataSource={cartItems} pagination={false} />
//     </div>
//   );
// };

// export default Cart;
import { useState } from "react";
import { Table, Button, Input, message } from "antd";
import { useUpdatePurchasedQuantityMutation } from "../../../../services/orderAPI";

const Cart = ({ cartItems, removeFromCart }) => {
  // State to manage quantity inputs
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.key] = item.quantity;
      return acc;
    }, {})
  );

  // Hook for updating purchased quantity
  const [updatePurchasedQuantity, { isLoading }] =
    useUpdatePurchasedQuantityMutation();

  // Handle quantity change
  const handleQuantityChange = (key, value) => {
    setQuantities((prev) => ({ ...prev, [key]: value }));
  };

  // Handle update quantity action
  const handleUpdateQuantity = async (orderDetailId, newQuantity) => {
    try {
      await updatePurchasedQuantity({
        orderDetailId,
        quantity: newQuantity,
      }).unwrap(); // Use unwrap to handle fulfilled/rejected states
      message.success("Quantity updated successfully.");
    } catch (error) {
      message.error("Failed to update quantity. Please try again.");
    }
  };

  // Columns for the Ant Design table
  const cartColumns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Price to Buy",
      dataIndex: "totalPriceBuy",
      key: "unitPrice",
      render: (totalPriceBuy) => `${totalPriceBuy.toLocaleString()} VNĐ`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <Input
          type="number"
          min={1}
          value={quantities[record.key]}
          onChange={(e) => handleQuantityChange(record.key, e.target.value)}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) =>
        `${(
          record.totalPriceBuy * quantities[record.key]
        ).toLocaleString()} VNĐ`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => removeFromCart(record.key)}
            type="danger"
            style={{ marginRight: "10px" }}
          >
            Remove
          </Button>
          {/* <Button
            onClick={() =>
              handleUpdateQuantity(record.key, quantities[record.key])
            }
            type="primary"
            loading={isLoading} // Display loading state
          >
            Update
          </Button> */}
        </>
      ),
    },
  ];

  return (
    <div>
      <br />
      <h6 className="sub-title">Cart Information</h6>
      <hr />
      <Table columns={cartColumns} dataSource={cartItems} pagination={false} />
    </div>
  );
};

export default Cart;
