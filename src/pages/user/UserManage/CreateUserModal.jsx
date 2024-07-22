import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";
import "./CreateUserModal.css";
import { useGetCountersQuery } from "../../../services/counterAPI";

const { Option } = Select;

const CreateUserModal = ({ visible, onCreate, onCancel, loading }) => {
  const { data: countersData, isLoading: countersLoading } =
    useGetCountersQuery();
  const [form] = Form.useForm();
  const [showCounter, setShowCounter] = useState(true);
  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [form, visible]);

  const handleDateChange = (date, dateString) => {
    // console.log("Selected DOB:", date);
  };

  const handleRoleChange = (value) => {
    setShowCounter(value === 3);
    if (!showCounter) {
      form.setFieldsValue({
        counter: null,
      });
    }
  };

  const activeCounters =
    countersData?.filter((counter) => counter.status === true) || [];

  return (
    <div className="create-user-page">
      <Modal
        visible={visible}
        title="Create a new user"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        confirmLoading={loading}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (values.dob) {
                values.dob = Math.floor(values.dob.valueOf() / 1000); // Convert moment date to Unix timestamp in seconds
              }
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
                message: "Please input the date of birth!",
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
              placeholder="Input DOB..."
              onChange={handleDateChange}
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
            <Select
              placeholder="Select user type: "
              onChange={handleRoleChange}
            >
              <Option value={1}>Admin</Option>
              <Option value={2}>Manager</Option>
              <Option value={3}>Staff</Option>
            </Select>
          </Form.Item>

          {showCounter && (
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
              <Select
                placeholder="Select counter..."
                loading={countersLoading}
                disabled={countersLoading}
              >
                {activeCounters &&
                  activeCounters.map((counter) => (
                    <Option key={counter.id} value={counter.id}>
                      {counter.counterName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
