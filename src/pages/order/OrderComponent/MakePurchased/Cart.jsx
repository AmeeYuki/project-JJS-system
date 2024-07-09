import React from "react";
import { Table, Button } from "antd";

const Cart = ({ cartItems, removeFromCart }) => {
  // console.log(cartItems);
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
