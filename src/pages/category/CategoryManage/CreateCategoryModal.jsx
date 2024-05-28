import React from "react";
import { Modal, Form, Input, DatePicker, InputNumber } from "antd";

const CreateCategoryModal = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Add New Category"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      okButtonProps={{ loading }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            if (values.date) {
              values.date = values.date.format("YYYY-MM-DD");
            }
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="categoryName"
          label="Category Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the category!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="buy_price_per_gram"
          label="Buy Price per Gram"
          rules={[
            {
              required: true,
              message: "Please input the buy price per gram!",
            },
            {
              type: "number",
              min: 0,
              message: "Please input a valid number!",
            },
          ]}
        >
          <InputNumber
            placeholder="Input the price..."
            addonAfter="VND"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="sell_price_per_gram"
          label="Sell Price per Gram"
          rules={[
            {
              required: true,
              message: "Please input the sell price per gram!",
            },
            {
              type: "number",
              min: 0,
              message: "Please input a valid number!",
            },
          ]}
        >
          <InputNumber
            placeholder="Input the price..."
            addonAfter="VND"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please input the date!",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategoryModal;
