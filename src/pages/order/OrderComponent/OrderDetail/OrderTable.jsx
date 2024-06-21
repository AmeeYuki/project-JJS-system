import React from "react";
import { Table } from "antd";

export default function OrderTable({ products }) {
  console.log(products);
  const columns = [
    {
      title: "No.",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Product Name",
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
      dataIndex: "product_barcode",
      key: "product_barcode",
    },
    {
      title: "Type",
      dataIndex: "product_type",
      key: "product_type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Total",
      dataIndex: "total_price",
      key: "total",
      render: (total_price) => `${total_price.toLocaleString()} VNĐ`,
    },
  ];

  const data = products.map((item, index) => ({
    key: index,
    product_name: item.product.productName,
    product_image: item.product.imageUrl,
    product_barcode: item.product.barcode,
    product_type: item.product.type.type,
    quantity: item.quantity,
    total_price: item.unitPrice,
  }));

  return (
    <div style={{ marginTop: 10 }}>
      <h3 style={{ fontWeight: 400 }}>Product</h3>
      <hr />
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}
