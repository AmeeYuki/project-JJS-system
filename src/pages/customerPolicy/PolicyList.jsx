import React, { useState } from "react";
import { Table, Space, Dropdown, Menu, Tag, Modal } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  useAcceptPolicyMutation,
  useRejectPolicyMutation,
} from "../../services/customerAPI";
import PolicyDetailModal from "./PolicyDetailModal";

export default function PolicyList({ policyData, isLoading, handleRefetch }) {
  const [acceptPolicy] = useAcceptPolicyMutation();
  const [rejectPolicy] = useRejectPolicyMutation();
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState({
    visible: false,
    actionType: null,
    policyId: null,
  });

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
      case "used":
        color = "green";
        text = "USED";
        break;

      default:
        color = "default";
        text = status.toUpperCase();
    }
    return <Tag color={color}>{text}</Tag>;
  };

  const showConfirmModal = (actionType, policyId) => {
    setConfirmAction({
      visible: true,
      actionType,
      policyId,
    });
  };

  const handleAccept = (id) => {
    showConfirmModal("accept", id);
  };

  const handleReject = (id) => {
    showConfirmModal("reject", id);
  };

  const handleConfirm = async () => {
    const { actionType, policyId } = confirmAction;
    if (actionType === "accept") {
      await acceptPolicy({ id: policyId });
    } else if (actionType === "reject") {
      await rejectPolicy({ id: policyId });
    }
    handleRefetch();
    setConfirmAction({
      visible: false,
      actionType: null,
      policyId: null,
    });
  };

  const handleCancel = () => {
    setConfirmAction({
      visible: false,
      actionType: null,
      policyId: null,
    });
  };

  const handleViewDetails = (record) => {
    setSelectedPolicy(record);
    setIsModalVisible(true);
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

  const actionsMenu = (record) => {
    const { publishingStatus } = record;
    const isAccept =
      publishingStatus === "accept" || publishingStatus === "pending";
    const isReject =
      publishingStatus === "reject" || publishingStatus === "pending";
    const isUsed = publishingStatus === "used";

    return (
      <Menu>
        {isReject && (
          <Menu.Item key="accept" onClick={() => handleAccept(record.id)}>
            Accept
          </Menu.Item>
        )}
        {isAccept && (
          <Menu.Item key="reject" onClick={() => handleReject(record.id)}>
            Reject
          </Menu.Item>
        )}
        {isUsed && null}
        <Menu.Item key="viewDetails" onClick={() => handleViewDetails(record)}>
          View Details
        </Menu.Item>
      </Menu>
    );
  };

  const dataWithNo = policyData?.map((item, index) => ({
    ...item,
    no: index + 1,
  }));
  return (
    <>
      <Table
        dataSource={dataWithNo}
        columns={columns}
        pagination={{ pageSize: 5 }}
        loading={isLoading}
        rowKey="id"
      />
      <PolicyDetailModal
        visible={isModalVisible}
        policy={selectedPolicy}
        onClose={() => setIsModalVisible(false)}
      />
      <Modal
        title={`Confirm ${
          confirmAction.actionType === "accept" ? "Accept" : "Reject"
        } Policy`}
        visible={confirmAction.visible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to {confirmAction.actionType} this policy?</p>
      </Modal>
    </>
  );
}
