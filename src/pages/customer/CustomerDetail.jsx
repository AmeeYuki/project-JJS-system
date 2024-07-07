import { Modal, Button } from "antd";
import PropTypes from "prop-types";

const CustomerDetail = ({
  openDetail,
  handleCloseDetail,
  selectedCustomer,
}) => (
  <Modal
    title="Customer Details"
    visible={openDetail}
    onCancel={handleCloseDetail}
    footer={[
      <Button key="close" onClick={handleCloseDetail}>
        Close
      </Button>,
    ]}
  >
    {selectedCustomer && (
      <div>
        <p>Name: {selectedCustomer.fullName}</p>
        <p>Phone: {selectedCustomer.phone}</p>
        <p>Email: {selectedCustomer.email}</p>
        <p>Address: {selectedCustomer.address}</p>
      </div>
    )}
  </Modal>
);

CustomerDetail.propTypes = {
  openDetail: PropTypes.bool.isRequired,
  handleCloseDetail: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.object,
};

export default CustomerDetail;
