import { Modal, Button, Input, Radio, Form } from "antd";
import PropTypes from "prop-types";

const CustomerForm = ({
  open,
  handleClose,
  handleInputChange,
  handleAddCustomer,
  newCustomer,
  setNewCustomer,
}) => (
  <Modal
    title="Add a new customer"
    open={open}
    onCancel={handleClose}
    footer={null}
  >
    <Form layout="vertical">
      <Form.Item label="Name">
        <Input
          name="fullName"
          value={newCustomer.fullName}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          name="phone"
          value={newCustomer.phone}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          name="email"
          value={newCustomer.email}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Address">
        <Input
          name="address"
          value={newCustomer.address}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Gender">
        <Radio.Group
          name="gender"
          value={newCustomer.gender}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, gender: e.target.value })
          }
        >
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button onClick={handleClose} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleAddCustomer}>
          Save
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

CustomerForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleAddCustomer: PropTypes.func.isRequired,
  newCustomer: PropTypes.object.isRequired,
  setNewCustomer: PropTypes.func.isRequired,
};

export default CustomerForm;
