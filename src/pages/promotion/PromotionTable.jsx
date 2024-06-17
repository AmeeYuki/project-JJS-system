import { Table, Space, Tag } from "antd";
import PropTypes from "prop-types";
import ActionsMenu from "./ActionsMenu";

const PromotionTable = ({
  data,
  handleUpdatePromotion,
  handleDeletePromotion,
}) => {
  const columns = [
    { title: "No.", dataIndex: "id", key: "id", width: 60 },
    { title: "Promotion Code", dataIndex: "code", key: "code", width: 150 },
    {
      title: "Discount Percentage",
      dataIndex: "discount_percentage",
      key: "discount_percentage",
      width: 150,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      width: 150,
    },
    { title: "End Date", dataIndex: "end_date", key: "end_date", width: 150 },
    {
      title: "Status",
      dataIndex: "is_used",
      key: "is_used",
      width: 100,
      render: (is_used) => (
        <Tag color={is_used ? "green" : "red"}>
          {is_used ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "action",
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
      scroll={{ y: 330 }}
    />
  );
};

PromotionTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleUpdatePromotion: PropTypes.func.isRequired,
  handleDeletePromotion: PropTypes.func.isRequired,
};

export default PromotionTable;
