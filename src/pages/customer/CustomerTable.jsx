import { Table } from "antd";
import PropTypes from "prop-types";
import ActionsMenu from "./ActionsMenu";

const CustomerTable = ({
  data,
  handleViewDetail,
  handleUpdateCustomer,
  handleCreatePromotion,
}) => {
  const columns = [
    { title: "ID", dataIndex: "index", key: "id" },
    { title: "Name", dataIndex: "fullName", key: "fullName" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Accumulated Points",
      dataIndex: "accumulated_point",
      key: "accumulated_point",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <ActionsMenu
          customerId={record.id}
          handleViewDetail={handleViewDetail}
          handleUpdateCustomer={handleUpdateCustomer}
          handleCreatePromotion={handleCreatePromotion}
        />
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

CustomerTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleViewDetail: PropTypes.func.isRequired,
  handleUpdateCustomer: PropTypes.func.isRequired,
  handleCreatePromotion: PropTypes.func.isRequired,
};

export default CustomerTable;
