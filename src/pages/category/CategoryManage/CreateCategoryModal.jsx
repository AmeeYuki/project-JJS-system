import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, InputNumber, message } from "antd";
import moment from "moment";

const CreateCategoryModal = ({
  visible,
  onCreate,
  onCancel,
  loading,
  categories = [],
}) => {
  const [form] = Form.useForm();
  const [duplicateError, setDuplicateError] = useState(false);

  const disablePastDates = (current) => {
    return current && current < moment().startOf("day");
  };

  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        if (values.date) {
          values.date = values.date.format("YYYY-MM-DD");
        }
        const isDuplicate = categories.some(
          (category) =>
            category.type.toLowerCase() === values.type.toLowerCase()
        );
        if (isDuplicate) {
          setDuplicateError(true);
          form.setFields([
            {
              name: "type",
              errors: [
                "Category name already exists. Please choose a different name.",
              ],
            },
          ]);
        } else {
          setDuplicateError(false);
          onCreate(values);
          form.resetFields();
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Add New Category"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      okButtonProps={{ loading }}
      onOk={handleCreate}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="type"
          label="Type Name"
          validateStatus={duplicateError ? "error" : ""}
          help={
            duplicateError
              ? "Category name already exists. Please choose a different name."
              : ""
          }
          rules={[
            {
              required: true,
              message: "Please input the name of the type!",
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
            addonAfter=" VND"
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
            addonAfter=" VND"
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
          <DatePicker
            style={{ width: "100%" }}
            disabledDate={disablePastDates}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCategoryModal;
