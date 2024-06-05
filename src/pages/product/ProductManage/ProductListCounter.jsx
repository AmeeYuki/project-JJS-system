import React from "react";
import { Space, Table, Dropdown, Menu, Popconfirm } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { convertProductData, formatCurrency } from "../ProductUtil.jsx";

export default function ProductListCounter({
  productData,
  onEditProduct,
  handleDeleteProduct,
  onViewProductDetail,
}) {
  const convertedProductData = convertProductData(productData);

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item key="detail" onClick={() => onViewProductDetail(record)}>
        <span>View Detail</span>
      </Menu.Item>
      <Menu.Item
        key="edit"
        className="submenu-producttable"
        onClick={() => onEditProduct(record)}
      >
        <span>Edit Product</span>
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          title="Are you sure you want to delete this product?"
          onConfirm={() => handleDeleteProduct(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <p className="submenu-producttable-dropdown-delete">
            <span style={{ color: "#2C5282" }}></span>
            <span>Delete Product</span>
          </p>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Category",
      dataIndex: "typeName",
      key: "typeName",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      render: (weight, record) => `${weight} ${record.weightUnit}`,
    },
    {
      title: "Price Processing",
      dataIndex: "priceProcessing",
      key: "priceProcessing",
      render: (priceProcessing) => formatCurrency(priceProcessing),
    },
    {
      title: "Price Stone",
      dataIndex: "priceStone",
      key: "priceStone",
      render: (priceStone) => formatCurrency(priceStone),
    },
    {
      title: "Counter Name",
      dataIndex: "counterName",
      key: "counterName",
    },
    {
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={actionsMenu(record)}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreHorizIcon style={{ color: "#333333" }} />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={convertedProductData}
      rowKey="id"
      scroll={{
        y: 330,
      }}
    />
  );
}
