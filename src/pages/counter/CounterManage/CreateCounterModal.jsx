import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";

const CreateCounterModal = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  return (
    <div className="create-counter-page">
      <Modal
        visible={visible}
        title={
          <div
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333333",
            }}
          >
            Create a new counter
          </div>
        }
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
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
            name="counterName"
            label="Counter Name:"
            rules={[
              {
                required: true,
                message: "Please input the name of the counter!",
              },
            ]}
          >
            <Input placeholder="Input the counter name..." />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location:"
            rules={[
              {
                required: true,
                message: "Please input the location of the counter!",
              },
            ]}
          >
            <Input placeholder="Input the location..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateCounterModal;
