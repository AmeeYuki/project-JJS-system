import React from "react";
import { Space, Table, Dropdown, Menu, Tag } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

export default function CounterList({
  counterData,
  onEditCounter,
  handleActiveCounter,
  handleInactiveCounter,
}) {
  const navigate = useNavigate();

  const onViewCounterDetail = (record) => {
    navigate(`/counter/${record.id}`, {
      state: { counterName: record.counterName, location: record.location },
    });
  };

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item key="detail" onClick={() => onViewCounterDetail(record)}>
        <span>View Detail</span>
      </Menu.Item>
      <Menu.Item
        key="edit"
        className="submenu-countertable"
        onClick={() => onEditCounter(record)}
      >
        <span>Edit Counter</span>
      </Menu.Item>
      {record.status ? (
        <Menu.Item
          key="deactivate"
          className="submenu-usertable"
          onClick={() => handleInactiveCounter(record.id)}
        >
          <span>Inactive Counter</span>
        </Menu.Item>
      ) : (
        <Menu.Item
          key="activate"
          className="submenu-usertable"
          onClick={() => handleActiveCounter(record.id)}
        >
          <span>Active Counter</span>
        </Menu.Item>
      )}
    </Menu>
  );

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Counter Name",
      dataIndex: "counterName",
      key: "counterName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
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

  return (
    <Table
      columns={columns}
      dataSource={counterData}
      rowKey="id"
      // scroll={{
      //   y: 330,
      // }}
      pagination={{ pageSize: 4 }}
    />
  );
}
