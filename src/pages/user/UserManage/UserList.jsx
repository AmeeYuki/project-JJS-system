import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Dropdown, Menu, Popconfirm } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../slices/auth.slice";

export default function UserList({
  rawUserData,
  onEditUser,
  handleDeleteUser,
  handleActiveUser,
  handleInactiveUser,
  searchValue,
}) {
  const [userData, setUserData] = useState([]);
  const auth = useSelector(selectAuth);
  const idAuth = auth.id;

  useEffect(() => {
    if (rawUserData) {
      const convertedData = convertData(rawUserData);
      setUserData(convertedData);
    }
  }, [rawUserData]);

  useEffect(() => {
    if (rawUserData) {
      const filteredData = rawUserData?.users?.filter(
        (user) =>
          user.fullname?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.phone_number
            ?.toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );
      const convertedData = convertData({ users: filteredData });
      setUserData(convertedData);
    }
  }, [searchValue, rawUserData]);

  function convertData(users) {
    return users?.users?.map((el) => ({
      id: el?.id,
      fullname: el?.fullname,
      active: el?.active,
      counterName: el?.counter?.counterName,
      counterId: el?.counter?.id,
      dob: el?.date_of_birth,
      email: el?.email,
      phoneNumber: el?.phone_number,
      roleId: el?.role.id,
      roleName: el?.role.name,
      // Kết hợp fullname và phoneNumber thành một chuỗi duy nhất
    }));
  }

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="submenu-usertable"
        onClick={() => onEditUser(record)}
      >
        <span>Edit User</span>
      </Menu.Item>

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

  const dataWithNo = userData?.map((item, index) => ({
    ...item,
    no: index + 1,
  }));

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
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
      title: <div style={{ textAlign: "center" }}>Counter</div>,
      dataIndex: "counterName",
      key: "counter",
      render: (counter_id) => (
        <div style={{ textAlign: "center" }}>
          <Tag color={counter_id ? "cyan" : "#333333"}>
            {counter_id ? counter_id : "NaN"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "role",
    },
    {
      title: <div style={{ textAlign: "center" }}>Status</div>,
      key: "active",
      dataIndex: "active",
      render: (active) => (
        <div style={{ textAlign: "center" }}>
          <Tag color={active ? "green" : "volcano"}>
            {active ? "ACTIVE" : "INACTIVE"}
          </Tag>
        </div>
      ),
    },
    {
      key: "action",
      render: (_, record) =>
        record.id == idAuth ? (
          ""
        ) : (
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
        dataSource={dataWithNo}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
