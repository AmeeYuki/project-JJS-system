import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";

const { Option } = Select;

export default function WarrantiesForm({
  visible,
  onCancel,
  onSubmit,
  warrantiesData,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (warrantiesData) {
      form.setFieldsValue({
        timeWarranty: warrantiesData.timeWarranty,
        warrantyDetail: warrantiesData.warrantyDetail,
      });
    }
  }, [warrantiesData, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onSubmit(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      title="Warranty Information"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="warranty_form"
        initialValues={{
          timeWarranty: warrantiesData?.timeWarranty || null,
          warrantyDetail: warrantiesData?.warrantyDetail || "",
        }}
      >
        <Form.Item
          name="timeWarranty"
          label="Warranty Time (months)"
          rules={[
            { required: true, message: "Please select the warranty time!" },
          ]}
        >
          <Select placeholder="Select warranty time">
            <Option value="1">3 months</Option>
            <Option value="2">6 months</Option>
            <Option value="3">12 months</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="warrantyDetail"
          label="Warranty Details"
          rules={[
            { required: true, message: "Please enter warranty details!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
