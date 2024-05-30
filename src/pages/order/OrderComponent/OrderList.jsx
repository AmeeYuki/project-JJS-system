import React from "react";
import { Dropdown, Menu, Space, Table } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function OrderList({ ordersData }) {
  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item key="viewDetail">
        <span>View Detail</span>
      </Menu.Item>
      <Menu.Item key="edit">
        <span>Edit User</span>
      </Menu.Item>
    </Menu>
  );
  console.log(ordersData);

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Create by",
      dataIndex: "createBy",
      key: "createBy",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 60,
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={() => actionsMenu(record)} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <MoreHorizIcon style={{ color: "#333333" }} />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={ordersData} columns={columns} />
    </div>
  );
}
