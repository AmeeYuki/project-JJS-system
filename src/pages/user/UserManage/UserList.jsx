import React from "react";
import { Space, Table, Tag, Dropdown, Menu } from "antd";
import { CaretDownOutlined, DownOutlined } from "@ant-design/icons";

export default function UserList({ userData }) {
  const handleMenuClick = (action, record) => {
    switch (action) {
      case "edit":
        // Handle edit action
        break;
      case "delete":
        // Handle delete action
        break;
      case "inactive":
        // Handle inactive action
        break;
      case "viewDetail":
        // Handle view detail action
        break;
      default:
        break;
    }
  };

  const actionMenu = (record) => (
    <Menu onClick={({ key }) => handleMenuClick(key, record)}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
      <Menu.Item key="inactive">Inactive</Menu.Item>
      <Menu.Item key="viewDetail">View Detail</Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Counter",
      dataIndex: "counter",
      key: "counter",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      key: "active",
      dataIndex: "active",
      render: (active) => (
        <Tag color={active ? "green" : "volcano"}>
          {active ? "ACTIVE" : "INACTIVE"}
        </Tag>
      ),
    },
    {
      // title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={actionMenu(record)}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <CaretDownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={userData} />;
}
