import React from "react";
import { Space, Table, Dropdown, Menu } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { format } from "date-fns";
import { formatCurrency } from "../../product/ProductUtil";

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
      title: "Type Name",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Buy Price per Gram",
      dataIndex: "buy_price_per_gram",
      key: "buy_price_per_gram",
      render: (buy_price_per_gram) => formatCurrency(buy_price_per_gram),
    },
    {
      title: "Sell Price per Gram",
      dataIndex: "sell_price_per_gram",
      key: "sell_price_per_gram",
      render: (sell_price_per_gram) => formatCurrency(sell_price_per_gram),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => format(new Date(date), "dd-MM-yyyy"),
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
