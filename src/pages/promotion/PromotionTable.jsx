import { Table, Space, Tag } from "antd";
import PropTypes from "prop-types";
import ActionsMenu from "./ActionsMenu";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";

const PromotionTable = ({
  data,
  handleUpdatePromotion,
  handleDeletePromotion,
}) => {
  const auth = useSelector(selectAuth);
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      render: (text, record, index) => index + 1,
    },
    { title: "Promotion Code", dataIndex: "code", key: "code" },
    {
      title: "Discount",
      align: "end",
      key: "discount",
      render: (record) => {
        if (record.discountPercentage) {
          return `${record.discountPercentage}%`;
        } else if (record.fixedDiscountAmount) {
          return `${record.fixedDiscountAmount} VND`;
        }
        return null;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      align: "center",
      key: "startDate",
      render: (startDate) => dayjs(startDate).format("DD-MM-YYYY"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      align: "center",
      key: "endDate",
      render: (endDate) => dayjs(endDate).format("DD-MM-YYYY"),
    },

    ...(auth.roles.some(
      (role) => role === "ROLE_ADMIN" || role === "ROLE_MANAGER"
    )
      ? [
          {
            title: "Actions",
            key: "action",
            fixed: "right",
            render: (_, record) => (
              <Space size="middle">
                <ActionsMenu
                  promotionId={record.id}
                  // handleUpdatePromotion={handleUpdatePromotion}
                  handleDeletePromotion={handleDeletePromotion}
                />
              </Space>
            ),
          },
        ]
      : []),
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      scroll={{ x: "100%" }}
    />
  );
};

export default PromotionTable;
