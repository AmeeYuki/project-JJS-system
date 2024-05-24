import React from "react";
import { Space, Table, Tag, Dropdown, Menu, Popconfirm } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function UserList({ userData, onEditUser, handleDeleteUser }) {
  // const handleMenuClick = (action, record) => {
  //   switch (action) {
  //     case "edit":
  //       onEditUser(record);
  //       break;
  //     case "delete":
  //       // Handle delete action
  //       break;
  //     // case "inactive":
  //     //   // Handle inactive action
  //     //   break;
  //     case "viewDetail":
  //       // Handle view detail action
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="submenu-usertable"
        onClick={() => onEditUser(record)}
      >
        <span>Edit User</span>
      </Menu.Item>

      {/* <Menu.Item
        key="ActiveUSer"
        className="submenu-usertable"
        onClick={() => ActiveUSer(record, true)}
      >
        <span>Actice user </span>
      </Menu.Item> */}

      {/* <Menu.Item
        key="de-ActiveUSer"
        className="submenu-usertable"
        onClick={() => deActiveUSer(record, false)}
      >
        <span>De-actice user </span>
      </Menu.Item> */}

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
      dataIndex: "name",
      key: "name",
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

  return <Table columns={columns} dataSource={userData} rowKey="id" />;
}