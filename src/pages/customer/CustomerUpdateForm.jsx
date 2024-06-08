import { Modal, Button, Input, Radio, Form } from "antd";
import PropTypes from "prop-types";

const CustomerUpdateForm = ({
  openUpdate,
  handleCloseUpdate,
  selectedCustomer,
  setSelectedCustomer,
  handleSaveUpdate,
}) => (
  <Modal
    title="Update Customer"
    open={openUpdate}
    onCancel={handleCloseUpdate}
    footer={null}
  >
    {selectedCustomer && (
      <Form
        layout="vertical"
        initialValues={selectedCustomer}
        onFinish={handleSaveUpdate}
      >
        <Form.Item
          label="Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input
            name="fullName"
            value={selectedCustomer.fullName}
            onChange={(e) =>
              setSelectedCustomer({
                ...selectedCustomer,
                fullName: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please enter the phone number" }]}
        >
          <Input
            name="phone"
            value={selectedCustomer.phone}
            onChange={(e) =>
              setSelectedCustomer({
                ...selectedCustomer,
                phone: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter the email" }]}
        >
          <Input
            name="email"
            value={selectedCustomer.email}
            onChange={(e) =>
              setSelectedCustomer({
                ...selectedCustomer,
                email: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <Input
            name="address"
            value={selectedCustomer.address}
            onChange={(e) =>
              setSelectedCustomer({
                ...selectedCustomer,
                address: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Radio.Group
            name="gender"
            value={selectedCustomer.gender}
            onChange={(e) =>
              setSelectedCustomer({
                ...selectedCustomer,
                gender: e.target.value,
              })
            }
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleCloseUpdate} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    )}
  </Modal>
);

CustomerUpdateForm.propTypes = {
  openUpdate: PropTypes.bool.isRequired,
  handleCloseUpdate: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.object,
  setSelectedCustomer: PropTypes.func.isRequired,
  handleSaveUpdate: PropTypes.func.isRequired,
};

export default CustomerUpdateForm;
