import React from "react";
import { Space, Table, Tag, Dropdown, Menu, Popconfirm } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../slices/auth.slice";
import { useGetUsersByRoleAndCounterQuery } from "../../../services/userAPI";

const UserListByCounterAndRole = ({
  roleId,
  counterId,
  handleActiveUser,
  handleInactiveUser,
}) => {
  const auth = useSelector(selectAuth);
  const idAuth = auth.id;

  const { data: userData = [], isLoading } = useGetUsersByRoleAndCounterQuery({
    roleId,
    counterId,
    enabled: !!roleId && !!counterId,
  });

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key={record.active ? "deactivate" : "activate"}
        className="submenu-usertable"
        onClick={() =>
          record.active
            ? handleInactiveUser(record.id)
            : handleActiveUser(record.id)
        }
      >
        <span>{record.active ? "Inactive user" : "Active user"}</span>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: <div style={{ textAlign: "center" }}>Counter</div>,
      dataIndex: "counterName",
      key: "roleName",
      render: (counterName) => (
        <div style={{ textAlign: "center" }}>
          <Tag color={counterName ? "cyan" : "#333333"}>
            {counterName ? counterName : "NaN"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
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
        record.id === idAuth ? (
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

  if (isLoading) return <div>Loading...</div>;

  const dataWithNo = userData.map((item, index) => ({
    id: item.id,
    createdDate: item.created_date,
    modifiedDate: item.modified_date,
    fullName: item.fullName,
    email: item.email,
    phoneNumber: item.phoneNumber,
    dateOfBirth: item.date_of_birth,
    active: item.active,
    firstLogin: item.first_login,
    roleName: item.role.name,
    counterName: item.counter.counterName,
    no: index + 1,
  }));

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
};

export default UserListByCounterAndRole;
