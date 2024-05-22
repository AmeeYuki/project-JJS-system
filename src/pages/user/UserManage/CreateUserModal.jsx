import React from "react";
import { Modal, Form, Input, Select, Radio, DatePicker } from "antd";
import moment from "moment";
import "./CreateUserModal.css";

const { Option } = Select;

const CreateUserModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <div className="create-user-page">
      <Modal
        visible={visible}
        title="Create a new user"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="name"
            label="User Name:"
            rules={[
              {
                required: true,
                message: "Please input the name of the user!",
              },
            ]}
          >
            <Input placeholder="Input the full name..." />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email:"
            rules={[
              {
                required: true,
                message: "Please input the email of the user!",
              },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please input a valid email address!",
              },
            ]}
          >
            <Input placeholder="Input the email..." />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone number:"
            rules={[
              {
                required: true,
                message: "Please input the phone number of the user!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please input a valid 10-digit phone number!",
              },
            ]}
          >
            <Input placeholder="Input the phone number..." />
          </Form.Item>

          <Form.Item
            name="dob"
            label="DOB"
            rules={[
              {
                required: true,

                message: "Please input a valid 10-digit phone number!",
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              placeholder="Input DOB..."
            />
          </Form.Item>
          <Form.Item
            name="role"
            label="User Type:"
            rules={[
              {
                required: true,
                message: "Please select the role of the user!",
              },
            ]}
          >
            <Select placeholder="Select user type: ">
              <Option value="Admin">Admin</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Staff">Staff</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>

          <Form.Item
            name="counter"
            label="Counter:"
            rules={[
              {
                required: true,
                message: "Please select the counter!",
              },
            ]}
          >
            <Select placeholder="Select the counter...">
              <Option value="counter 1">Counter 1</Option>
              <Option value="counter 2">Counter 2</Option>
              <Option value="counter 3">Counter 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="active"
            label="Status:"
            rules={[
              {
                required: true,
                message: "Please select the status of the user!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>Active</Radio>
              <Radio value={false}>Inactive</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
