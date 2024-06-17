import React from "react";
import { Modal, Button, Form, Input } from "antd";

export default function SendRequestModal({ isVisible, onClose }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Request Data:", values);
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Send Request"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Send
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[
            { required: true, message: "Please input the customer name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerEmail"
          label="Customer Email"
          rules={[
            { required: true, message: "Please input the customer email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="requestDetails"
          label="Request Details"
          rules={[
            { required: true, message: "Please input the request details!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
