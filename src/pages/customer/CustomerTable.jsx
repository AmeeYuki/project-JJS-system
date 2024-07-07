import { Table } from "antd";
import PropTypes from "prop-types";
import ActionsMenu from "./ActionsMenu";

const CustomerTable = ({
  data,
  handleViewDetail,
  handleUpdateCustomer,
<<<<<<< HEAD
  // handleDeleteCustomer,
=======
>>>>>>> main
  handleCreatePromotion,
}) => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
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
<<<<<<< HEAD
          // handleDeleteCustomer={handleDeleteCustomer}
=======
>>>>>>> main
          handleCreatePromotion={handleCreatePromotion}
        />
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

CustomerTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleViewDetail: PropTypes.func.isRequired,
  handleUpdateCustomer: PropTypes.func.isRequired,
<<<<<<< HEAD
  // handleDeleteCustomer: PropTypes.func.isRequired,
=======
>>>>>>> main
  handleCreatePromotion: PropTypes.func.isRequired,
};

export default CustomerTable;
