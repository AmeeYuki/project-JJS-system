import React from "react";
import { Table, Button, Space, Dropdown, Menu, Popconfirm, Tag } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function PolicyList({ policyData, isLoading }) {
  const dataWithNo = policyData?.map((item, index) => ({
    ...item,
    no: index + 1,
  }));

  const getStatusTag = (status) => {
    let color;
    let text;
    switch (status) {
      case "pending":
        color = "blue";
        text = "PENDING";
        break;
      case "accept":
        color = "cyan";
        text = "ACCEPTED";
        break;
      case "reject":
        color = "red";
        text = "REJECTED";
        break;
      default:
        color = "default";
        text = status.toUpperCase();
    }
    return <Tag color={color}>{text}</Tag>;
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: ["customer", "fullName"],
      key: "customerFullName",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Discount",
      key: "discount",
      align: "right",

      render: (_, record) => {
        const { discountRate, fixedDiscountAmount } = record;
        const discountText = [];
        if (discountRate !== 0) discountText.push(`${discountRate}%`);
        if (fixedDiscountAmount !== 0)
          discountText.push(
            `${new Intl.NumberFormat().format(fixedDiscountAmount)} VNĐ`
          );
        return discountText.join(" / ") || "N/A";
      },
    },

    {
      title: "Valid",
      key: "valid",
      align: "center",

      render: (_, record) => {
        const validFrom = new Date(
          record.validFrom * 1000
        ).toLocaleDateString();
        const validTo = new Date(record.validTo * 1000).toLocaleDateString();
        return `${validFrom} - ${validTo}`;
      },
    },
    {
      title: "Status",
      dataIndex: "publishingStatus",
      align: "center",
      key: "publishingStatus",
      render: (status) => getStatusTag(status),
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

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="submenu-usertable"
        onClick={() => onEditUser(record)}
      >
        <span>Edit User</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Table
      dataSource={dataWithNo}
      columns={columns}
      pagination={{ pageSize: 5 }}
      loading={isLoading}
    />
  );
}
