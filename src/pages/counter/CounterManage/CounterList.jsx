import React from "react";
import { Space, Table, Dropdown, Menu, Popconfirm } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

export default function CounterList({
  counterData,
  onEditCounter,
  handleDeleteCounter,
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
      <Menu.Item key="delete">
        <Popconfirm
          title="Are you sure you want to delete this counter?"
          onConfirm={() => handleDeleteCounter(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <p className="submenu-countertable-dropdown-delete">
            <span style={{ color: "#2C5282" }}></span>
            <span>Delete Counter</span>
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

  return <Table columns={columns} dataSource={counterData} rowKey="id" />;
}
