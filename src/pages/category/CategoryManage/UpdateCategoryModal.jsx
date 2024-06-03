import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, InputNumber } from "antd";
import moment from "moment";

const UpdateCategoryModal = ({
  visible,
  onUpdate,
  onCancel,
  category,
  loading,
}) => {
  const [form] = Form.useForm();
  const [priceChanged, setPriceChanged] = useState(false);

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        ...category,
        date: category.date ? moment(category.date) : undefined,
      });
    }
  }, [category, form]);

  const handlePriceChange = () => {
    setPriceChanged(true);
  };

  return (
    <Modal
      visible={visible}
      title="Update Category"
      okText="Update"
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
            if (priceChanged) {
              onUpdate({ ...values, id: category.id });
            } else {
              onUpdate({ date: values.date, id: category.id });
            }
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
            onChange={handlePriceChange}
          />
        </Form.Item>
        <Form.Item
          name="sell_price_per_gram"
          label="Sell Price per Gram"
          rules={[
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
            onChange={handlePriceChange}
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

export default UpdateCategoryModal;
