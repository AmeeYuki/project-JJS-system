import PropTypes from "prop-types";
import { Table, Space } from "antd";
import ActionsMenu from "./ActionsMenu";

const CustomerTable = ({
  data,
  handleViewDetail,
  handleUpdateCustomer,
  handleDeleteCustomer,
  handleCreatePromotion,
}) => {
  const columns = [
    { title: "No.", dataIndex: "id", key: "id", width: 70 },
    {
      title: "Customer Name",
      dataIndex: "fullName",
      key: "fullName",
      width: 200,
    },
    { title: "Email", dataIndex: "email", key: "email", width: 200 },
    { title: "Phone number", dataIndex: "phone", key: "phone", width: 150 },
    { title: "Address", dataIndex: "address", key: "address", width: 200 },
    {
      title: " Points",
      dataIndex: "accumulated_point",
      key: "accumulated_point",
      width: 90,
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ActionsMenu
            customerId={record.id}
            handleViewDetail={handleViewDetail}
            handleUpdateCustomer={handleUpdateCustomer}
            handleDeleteCustomer={handleDeleteCustomer}
            handleCreatePromotion={handleCreatePromotion}
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

CustomerTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleViewDetail: PropTypes.func.isRequired,
  handleUpdateCustomer: PropTypes.func.isRequired,
  handleDeleteCustomer: PropTypes.func.isRequired,
  handleCreatePromotion: PropTypes.func.isRequired,
};

export default CustomerTable;
