import React from "react";
import { Space, Table, Dropdown, Menu } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function CategoryList({ categoryData, onEditCategory }) {
  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => onEditCategory(record)}>
        <span>Edit Category</span>
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
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Buy Price per Gram",
      dataIndex: "buy_price_per_gram",
      key: "buy_price_per_gram",
    },
    {
      title: "Sell Price per Gram",
      dataIndex: "sell_price_per_gram",
      key: "sell_price_per_gram",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      dataSource={categoryData}
      rowKey={(record) => record.id}
      scroll={{
        y: 330,
      }}
    />
  );
}
