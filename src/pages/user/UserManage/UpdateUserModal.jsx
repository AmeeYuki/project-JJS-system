import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import "./CreateUserModal.css";

const { Option } = Select;

const UpdateUserModal = ({ visible, onUpdate, onCancel, user, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        dob: user.date_of_birth ? dayjs(user.date_of_birth * 1000) : null,
        role_id: user.role_id, // Set default value for role_id if user.role_id is falsy
        counter_id: 1, // Set default value for counter_id if user.counter_id is falsy
      });
    }
  }, [user, form]);

  const handleUpdate = (values) => {
    // Convert role_id and counter_id to integers
    const updatedValues = {
      ...values,
      role_id: parseInt(values.role_id),
      counter_id: parseInt(values.counter_id),
      id: user.id,
    };
    onUpdate(updatedValues);
  };
  return (
    <div className="update-user-page">
      <Modal
        visible={visible}
        title="Update User"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (values.dob) {
                values.dob = Math.floor(values.dob.valueOf() / 1000); // Convert dayjs date to Unix timestamp in seconds
              }
              handleUpdate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} name="form_in_modal">
          <Form.Item
            name="fullname"
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
            name="phone_number"
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
                message: "Please input the date of birth!",
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
            name="role_id"
            label="User Type:"
            rules={[
              {
                required: true,
                message: "Please select the role of the user!",
              },
            ]}
          >
            <Select placeholder="Select user type">
              <Option value={1}>Admin</Option>
              <Option value={2}>Manager</Option>
              <Option value={3}>Staff</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="counter_id"
            label="Counter:"
            rules={[
              {
                required: true,
                message: "Please select the counter!",
              },
            ]}
          >
            <Select placeholder="Select the counter">
              <Option value={1}>Counter 1</Option>
              <Option value={2}>Counter 2</Option>
              <Option value={3}>Counter 3</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateUserModal;
