import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { useCreateCustomerMutation } from "../../../../services/customerAPI";

const CreateCustomerModal = ({ visible, onClose, onCustomerCreated }) => {
  const [form] = Form.useForm();
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();

  const handleSubmit = async (values) => {
    try {
      const result = await createCustomer(values).unwrap();
      notification.success({
        message: "Success",
        description: "Customer created successfully!",
      });
      form.resetFields();
      onClose();
      onCustomerCreated(result); // Callback to update parent component
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to create customer. Please try again.",
      });
    }
  };

  return (
    <Modal
      title="Create Customer"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please input the full name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please input the phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input the address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCustomerModal;
