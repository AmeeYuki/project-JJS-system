import { Modal, Button, Input, Radio, Form, notification } from "antd";
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

  const handleFormSubmit = async () => {
    try {
      await handleAddCustomer();
      notification.success({
        message: "Success",
        description: "Customer added successfully!",
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description: `Error adding customer: ${error.message}`,
      });
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/^0+/, "");
    if (/^\d*$/.test(value)) {
      setNewCustomer({ ...newCustomer, [name]: sanitizedValue });
    } else {
      notification.error({
        message: "Invalid Phone Number",
        description: "Phone number must be numeric.",
      });
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setNewCustomer({ ...newCustomer, email: value });
    if (!value.includes("@gmail")) {
      notification.error({
        message: "Invalid Email",
        description: 'Email must contain "@gmail".',
      });
    }
  };

  return (
    <Modal
      title="Add a new customer"
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter the name" }]}
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
            { required: true, message: "Please enter a valid phone number" },
          ]}
        >
          <Input
            name="phone"
            value={newCustomer.phone}
            onChange={handlePhoneChange}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            name="email"
            value={newCustomer.email}
            onChange={handleEmailChange}
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <Input
            name="address"
            value={newCustomer.address}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select gender" }]}
        >
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
          <Button type="primary" htmlType="submit">
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
  newCustomer: PropTypes.shape({
    fullName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    gender: PropTypes.string,
    accumulated_point: PropTypes.number,
  }).isRequired,
  setNewCustomer: PropTypes.func.isRequired,
};

export default CustomerForm;
