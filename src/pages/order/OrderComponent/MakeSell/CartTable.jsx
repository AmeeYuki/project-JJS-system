import React from "react";
import { Table, Button } from "antd";

const CartTable = ({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
  const cartColumns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Product",
      dataIndex: "product_name",
      key: "product_name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.product_image}
            alt={record.product_name}
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span>{record.product_name}</span>
        </div>
      ),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) => record.type.type,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => new Intl.NumberFormat("vi-VN").format(price) + " VNĐ",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={() => decreaseQuantity(record)}>-</Button>
          <span style={{ margin: "0 10px" }}>{record.quantity}</span>
          <Button onClick={() => increaseQuantity(record)}>+</Button>
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text) => text.toLocaleString(),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => removeFromCart(record)}>Delete</Button>
      ),
    },
  ];

  const cartData = cartItems.map((item, index) => ({
    key: index,
    id: item.id,
    product_name: item.product_name,
    product_image: item.product_image,
    barcode: item.barcode,
    type: item.type,
    price: item.price,
    quantity: item.quantity,
    total: item.price * item.quantity,
  }));

  return (
    <Table columns={cartColumns} dataSource={cartData} pagination={false} />
  );
};

export default CartTable;
