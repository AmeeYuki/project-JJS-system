import { useEffect } from "react";
import { Modal, Button, Input, Form, notification } from "antd";
import PropTypes from "prop-types";

const CustomerForm = ({
  open,
  handleClose,
  handleInputChange,
  handleAddCustomer,
  newCustomer,
  setNewCustomer,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(newCustomer);
  }, [newCustomer, form]);

  const handleSave = () => {
    // định dạng dữ liệu phone
    const phoneNumber = newCustomer.phone;
    if (!/^\d+$/.test(phoneNumber)) {
      notification.error({
        message: "Error",
        description: "Phone number should only contain numbers.",
      });
      return;
    }

    // định dạng dữ liệu  email
    const email = newCustomer.email;
    if (!email.endsWith("@gmail.com")) {
      notification.error({
        message: "Error",
        description: "Email must end with @gmail.com.",
      });
      return;
    }

    handleAddCustomer();
  };

  return (
    <Modal
      title="Add a new customer"
      visible={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input
            name="fullName"
            value={newCustomer.fullName}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please enter customer phone number" },
            {
              pattern: /^\d+$/,
              message: "Phone number should only contain numbers",
            },
          ]}
        >
          <Input
            name="phone"
            value={newCustomer.phone}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter customer email" },
            {
              pattern: /@gmail\.com$/,
              message: "Email must end with @gmail.com",
            },
          ]}
        >
          <Input
            name="email"
            value={newCustomer.email}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter customer address" }]}
        >
          <Input
            name="address"
            value={newCustomer.address}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CustomerForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleAddCustomer: PropTypes.func.isRequired,
  newCustomer: PropTypes.object.isRequired,
  setNewCustomer: PropTypes.func.isRequired,
};

export default CustomerForm;
