import { Modal, Button, Input, Radio, Form, message } from "antd";
import PropTypes from "prop-types";
import { useEffect } from "react";

const CustomerUpdateForm = ({
  openUpdate,
  handleCloseUpdate,
  selectedCustomer,
  handleSaveUpdate,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedCustomer) {
      form.setFieldsValue(selectedCustomer);
    }
  }, [selectedCustomer, form]);

  const handlePhoneChange = (_, value) => {
    if (value && !/^\d+$/.test(value)) {
      return Promise.reject("Phone number should contain only digits!");
    }
    return Promise.resolve();
  };

  const onFinish = (values) => {
    handleSaveUpdate(values);
    handleCloseUpdate();
  };

  return (
    <Modal
      title="Update Customer"
      visible={openUpdate}
      onCancel={handleCloseUpdate}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="fullName"
          rules={[
            { required: true, message: "Please input the customer's name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input the customer's phone number!",
            },
            { validator: handlePhoneChange },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input the customer's email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please input the customer's address!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            { required: true, message: "Please select the customer's gender!" },
          ]}
        >
          <Radio.Group>
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
    </Modal>
  );
};

CustomerUpdateForm.propTypes = {
  openUpdate: PropTypes.bool.isRequired,
  handleCloseUpdate: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.object,
  handleSaveUpdate: PropTypes.func.isRequired,
};

export default CustomerUpdateForm;
