// import React from "react";
import { Table, Space } from "antd";
import PropTypes from "prop-types";
import ActionsMenu from "./ActionsMenu";

const PromotionTable = ({
  data,
  handleUpdatePromotion,
  handleDeletePromotion,
}) => {
  const columns = [
    { title: "No.", dataIndex: "id", key: "id", width: 60 },
    { title: "Promotion Code", dataIndex: "code", key: "code", width: 200 },
    {
      title: "Discount(VND)",
      dataIndex: "discount",
      key: "discount",
      width: 200,
    },
    {
      title: "Start Date",
      dataIndex: "startdate",
      key: "startdate",
      width: 150,
    },
    { title: "End Date", dataIndex: "enddate", key: "enddate", width: 150 },
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
