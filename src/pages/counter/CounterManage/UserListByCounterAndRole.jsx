import React, { useState, useEffect, useCallback } from "react";
import { Space, Table, Tag, Dropdown, Spin } from "antd";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../slices/auth.slice";
import { useGetUsersByRoleAndCounterQuery } from "../../../services/userAPI";
import { useLazyGetOrderByUserIdQuery } from "../../../services/orderAPI";
import { formatCurrency } from "../../product/ProductUtil";
import { MoreOutlined } from "@ant-design/icons";

const UserListByCounterAndRole = ({
  roleId,
  counterId,
  handleActiveUser,
  handleInactiveUser,
}) => {
  const auth = useSelector(selectAuth);
  const idAuth = auth.id;

  const { data: userData = [], isLoading: isLoadingUsers } =
    useGetUsersByRoleAndCounterQuery({
      roleId,
      counterId,
      enabled: !!roleId && !!counterId,
    });

  const [userRevenue, setUserRevenue] = useState({});
  const [isLoadingRevenue, setIsLoadingRevenue] = useState(false);
  const [triggerFetchOrders] = useLazyGetOrderByUserIdQuery();

  const calculateTotalRevenue = useCallback((orders) => {
    return orders.reduce((total, order) => {
      const orderTotal = order.orderDetailsList.reduce((orderSum, detail) => {
        return orderSum + detail.quantity * detail.unitPrice;
      }, 0);
      return total + orderTotal;
    }, 0);
  }, []);

  const fetchUserRevenue = useCallback(async () => {
    setIsLoadingRevenue(true);
    const revenueData = {};
    for (const user of userData) {
      try {
        const { data: orderData } = await triggerFetchOrders(user.id);
        const totalRevenue = calculateTotalRevenue(orderData?.orders || []);
        revenueData[user.id] = totalRevenue;
      } catch (error) {
        console.error(`Error fetching orders for user ${user.id}:`, error);
        revenueData[user.id] = 0;
      }
    }
    setUserRevenue(revenueData);
    setIsLoadingRevenue(false);
  }, [userData, triggerFetchOrders, calculateTotalRevenue]);

  useEffect(() => {
    if (userData.length > 0) {
      fetchUserRevenue();
    }
  }, [userData, fetchUserRevenue]);

  const actionsMenu = (record) => [
    {
      key: record.active ? "deactivate" : "activate",
      label: record.active ? "Inactive user" : "Active user",
      onClick: () =>
        record.active
          ? handleInactiveUser(record.id)
          : handleActiveUser(record.id),
    },
  ];

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
      title: "Revenue",
      dataIndex: "id",
      key: "revenue",
      render: (userId) => (
        <div style={{ textAlign: "right" }}>
          {isLoadingRevenue ? (
            <Spin size="small" />
          ) : (
            formatCurrency(userRevenue[userId] || 0)
          )}
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
            <Dropdown menu={{ items: actionsMenu(record) }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <MoreOutlined style={{ color: "#333333" }} />
              </a>
            </Dropdown>
          </Space>
        ),
    },
  ];

  if (isLoadingUsers) return <div>Loading users...</div>;

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
    revenue: userRevenue[item.id] || 0,
    no: index + 1,
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataWithNo}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default UserListByCounterAndRole;
