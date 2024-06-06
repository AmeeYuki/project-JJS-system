import { Modal, Button } from "antd";
import PropTypes from "prop-types";

const CustomerDetail = ({
  openDetail,
  handleCloseDetail,
  selectedCustomer,
}) => (
  <Modal
    title="Customer Details"
    open={openDetail}
    onCancel={handleCloseDetail}
    footer={null}
  >
    {selectedCustomer && (
      <div>
        <p>Name: {selectedCustomer.fullName}</p>
        <p>Phone: {selectedCustomer.phone}</p>
        <p>Email: {selectedCustomer.email}</p>
        <p>Address: {selectedCustomer.address}</p>
        <p>Gender: {selectedCustomer.gender}</p>
        <p>Accumulated Points: {selectedCustomer.accumulated_point}</p>
        <Button onClick={handleCloseDetail} style={{ marginTop: 16 }}>
          Close
        </Button>
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
