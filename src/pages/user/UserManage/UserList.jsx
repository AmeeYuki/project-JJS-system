import React from "react";
import { Space, Table, Tag, Dropdown, Menu, Popconfirm } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function UserList({
  userData,
  onEditUser,
  handleDeleteUser,
  handleActiveUser, // Thêm prop để xử lý active user
  handleInactiveUser, // Thêm prop để xử lý inactive user
}) {
  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="submenu-usertable"
        onClick={() => onEditUser(record)}
      >
        <span>Edit User</span>
      </Menu.Item>

      {/* Thêm menu item cho active user */}
      {record.active ? (
        <Menu.Item
          key="deactivate"
          className="submenu-usertable"
          onClick={() => handleInactiveUser(record.id)}
        >
          <span>Inactive user</span>
        </Menu.Item>
      ) : (
        <Menu.Item
          key="activate"
          className="submenu-usertable"
          onClick={() => handleActiveUser(record.id)}
        >
          <span>Active user</span>
        </Menu.Item>
      )}

      <Menu.Item key="delete">
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => handleDeleteUser(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <p className="submenu-usertable-dropdown-delete">
            <span style={{ color: "#2C5282" }}></span>
            <span>Delete user</span>
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
      title: "Name",
      dataIndex: "fullname",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    {
      title: "Counter",
      dataIndex: "counterName",
      key: "counter",
      render: (counter_id) => (counter_id ? counter_id : ""),
    },
    {
      title: "Role",
      dataIndex: "roleName",
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
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={actionsMenu(record)} trigger={["click"]}>
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
    <>
      <Table
        columns={columns}
        dataSource={userData}
        rowKey="id"
        scroll={{ y: "330px" }}
      />
    </>
  );
}
