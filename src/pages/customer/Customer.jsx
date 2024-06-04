import React from "react";
import { Table, Tag, Space } from "antd";
import ActionsMenu from "./ActionsMenu";

export default function Customer({
  customerData,
  onEditUser,
  handleDeleteUser,
  handleViewDetail,
  handleCreatePromotion,
}) {
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "fullname",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 250,
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone",
      width: 120,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
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
          <ActionsMenu
            customerId={record.id}
            handleViewDetail={handleViewDetail}
            handleUpdateCustomer={onEditUser}
            handleDeleteCustomer={handleDeleteUser}
            handleCreatePromotion={handleCreatePromotion}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={customerData}
      rowKey="id"
      scroll={{ y: "330px" }}
    />
  );
}
