import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import "./CreateUserModal.css";
import { useGetCountersQuery } from "../../../services/counterAPI";

const { Option } = Select;

const UpdateUserModal = ({ visible, onUpdate, onCancel, user, loading }) => {
  const [form] = Form.useForm();
  const { data: countersData, isLoading: countersLoading } =
    useGetCountersQuery();

  useEffect(() => {
    if (user && visible) {
      form.setFieldsValue({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        phone_number: user.phoneNumber,
        dob: user.dob ? dayjs.unix(user.dob) : null,
        role_id: user.roleId,
        counter_id: user.counterId,
      });
    }
  }, [user, visible, form]);

  const handleUpdate = (values) => {
    const updatedValues = {
      ...values,
      // role_id: parseInt(values.role_id, 10),
      // counter_id: parseInt(values.counter_id, 10),
      dob: values.dob ? values.dob.unix() : null,
    };
    onUpdate(updatedValues);
  };

  return (
    <div className="update-user-page">
      <Modal
        open={visible}
        title="Update User"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={() => form.submit()}
      >
        <Form form={form} name="form_in_modal" onFinish={handleUpdate}>
          <Form.Item
            style={{ display: "none" }}
            name="id"
            label="ID"
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
            <Select
              placeholder="Select counter..."
              loading={countersLoading}
              disabled={countersLoading}
            >
              {countersData &&
                countersData.map((counter) => (
                  <Option key={counter.id} value={counter.id}>
                    {counter.counterName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateUserModal;
