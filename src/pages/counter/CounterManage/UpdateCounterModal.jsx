import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const UpdateCounterModal = ({
  visible,
  onUpdate,
  onCancel,
  counter,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (counter) {
      form.setFieldsValue({
        ...counter,
      });
    }
  }, [counter, form]);

  return (
    <div className="update-counter-page">
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
            Update counter
          </div>
        }
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{ loading }}
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              const updatedData = { id: counter.id };

              if (values.counterName) {
                updatedData.counter_name = values.counterName;
              }

              if (values.location) {
                updatedData.location = values.location;
              }

              onUpdate(updatedData);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} name="form_in_modal">
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
            <Input />
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
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateCounterModal;
