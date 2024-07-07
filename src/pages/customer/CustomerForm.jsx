<<<<<<< HEAD
import { Modal, Button, Input, Radio, Form, notification } from "antd";
=======
import { useEffect } from "react";
import { Modal, Button, Input, Form, notification } from "antd";
>>>>>>> main
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

<<<<<<< HEAD
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
=======
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
>>>>>>> main
  };

  return (
    <Modal
      title="Add a new customer"
<<<<<<< HEAD
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter the name" }]}
=======
      visible={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter customer name" }]}
>>>>>>> main
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
<<<<<<< HEAD
            { required: true, message: "Please enter a valid phone number" },
=======
            { required: true, message: "Please enter customer phone number" },
            {
              pattern: /^\d+$/,
              message: "Phone number should only contain numbers",
            },
>>>>>>> main
          ]}
        >
          <Input
            name="phone"
            value={newCustomer.phone}
<<<<<<< HEAD
            onChange={handlePhoneChange}
=======
            onChange={handleInputChange}
>>>>>>> main
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
<<<<<<< HEAD
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Please enter a valid email" },
=======
            { required: true, message: "Please enter customer email" },
            {
              pattern: /@gmail\.com$/,
              message: "Email must end with @gmail.com",
            },
>>>>>>> main
          ]}
        >
          <Input
            name="email"
            value={newCustomer.email}
<<<<<<< HEAD
            onChange={handleEmailChange}
=======
            onChange={handleInputChange}
>>>>>>> main
          />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
<<<<<<< HEAD
          rules={[{ required: true, message: "Please enter the address" }]}
=======
          rules={[{ required: true, message: "Please enter customer address" }]}
>>>>>>> main
        >
          <Input
            name="address"
            value={newCustomer.address}
            onChange={handleInputChange}
          />
        </Form.Item>
<<<<<<< HEAD
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
=======
>>>>>>> main
        <Form.Item>
          <Button onClick={handleClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
<<<<<<< HEAD
          <Button type="primary" htmlType="submit">
=======
          <Button type="primary" onClick={handleSave}>
>>>>>>> main
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
