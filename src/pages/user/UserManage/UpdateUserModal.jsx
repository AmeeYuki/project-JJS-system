import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Radio, DatePicker } from "antd";
import moment from "moment";
import "./CreateUserModal.css";

const { Option } = Select;

const UpdateUserModal = ({ visible, onUpdate, onCancel, user, loading }) => {
  const [form] = Form.useForm();
  const [isUpdating, setIsUpdating] = useState(false); // State để theo dõi trạng thái loading của nút

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
        dob: moment(user.date_of_birth),
      });
    }
  }, [user, form]);

  return (
    <div className="update-user-page">
      <Modal
        visible={visible}
        title="Update user"
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{ loading }}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              // form.resetFields();
              onUpdate({ ...values, id: user.id });
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
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email:"
            rules={[
              {
                required: true,
                message: "Please input the email of the user!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone number:"
            rules={[
              {
                required: true,
                message: "Please input the phone number of the user!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="date_of_birth"
            name="dob"
            rules={[
              {
                required: true,
                message: "Please select the DOB of the user!",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
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
            <Select placeholder="Select user type: ">
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
            <Select placeholder="Select the counter...">
              <Option value={1}>Counter 1</Option>
              <Option value={2}>Counter 2</Option>
              <Option value={3}>Counter 3</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item
            name="gender"
            label="Gender:"
            rules={[
              {
                required: true,
                message: "Please select the gender of the user!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Radio.Group>
          </Form.Item> */}
          {/* <Form.Item
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
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateUserModal;
