import { Table, Space, Tag } from "antd";
import PropTypes from "prop-types";
import ActionsMenu from "./ActionsMenu";
import moment from "moment";

const PromotionTable = ({
  data,
  handleUpdatePromotion,
  handleDeletePromotion,
}) => {
  const columns = [
    { title: "No.", dataIndex: "id", key: "id", width: 60, fixed: "left" },
    { title: "Promotion Code", dataIndex: "code", key: "code", width: 150 },
    {
      title: "Discount Percentage",
<<<<<<< HEAD
      dataIndex: "discount_percentage",
      key: "discount_percentage",
=======
      dataIndex: "discountPercentage",
      key: "discountPercentage",
>>>>>>> main
      width: 150,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 150,
      render: (startDate) => moment(startDate).format("YYYY-MM-DD"),
    },
    {
<<<<<<< HEAD
      title: "Status",
      dataIndex: "is_used",
      key: "is_used",
      width: 100,
      render: (is_used) => (
        <Tag color={is_used ? "green" : "red"}>
          {is_used ? "Active" : "Inactive"}
        </Tag>
      ),
=======
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,
      render: (endDate) => moment(endDate).format("YYYY-MM-DD"),
    },
    {
      title: "Status",
      dataIndex: "used",
      key: "used",
      width: 100,
      render: (used) => (used ? "Yes" : "No"),
>>>>>>> main
    },
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <ActionsMenu
            promotionId={record.id}
            handleUpdatePromotion={handleUpdatePromotion}
            handleDeletePromotion={handleDeletePromotion}
          />
        </Space>
      ),
    },
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

PromotionTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleUpdatePromotion: PropTypes.func.isRequired,
  handleDeletePromotion: PropTypes.func.isRequired,
};

export default PromotionTable;
