// import React, { useState } from "react";
// import { Table, Button, InputNumber } from "antd";

// const Cart = ({ cartItems, removeFromCart, updateCartQuantity }) => {
//   const handleQuantityChange = (key, value) => {
//     updateCartQuantity(key, value);
//   };

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
//       render: (quantity, record) => (
//         <InputNumber
//           min={1}
//           max={record.maxQuantity}
//           value={quantity}
//           onChange={(value) => handleQuantityChange(record.key, value)}
//         />
//       ),
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
import React from "react";
import { Table, Button, InputNumber } from "antd";

const Cart = ({ cartItems, removeFromCart, updateCartQuantity }) => {
  const handleQuantityChange = (key, value) => {
    // Ensure value is within valid range: min 1 and max based on maxQuantity
    if (
      value >= 1 &&
      value <= cartItems.find((item) => item.key === key)?.maxQuantity
    ) {
      updateCartQuantity(key, value);
    }
  };

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
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={record.maxQuantity}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.key, value)}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) =>
        `${(record.totalPriceBuy * record.quantity).toLocaleString()} VNĐ`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => removeFromCart(record.key)} type="danger">
          Remove
        </Button>
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
