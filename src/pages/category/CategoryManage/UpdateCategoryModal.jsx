import React, { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, InputNumber } from "antd";
import moment from "moment";

const UpdateCategoryModal = ({
  visible,
  onUpdate,
  onCancel,
  category,
  loading,
  existingCategories = [], 
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

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const checkTypeUniqueness = async (_, value) => {
    if (
      existingCategories.some(
        (cat) => cat.type === value && cat.id !== category.id
      )
    ) {
      return Promise.reject(new Error("Type name already exists!"));
    }
    return Promise.resolve();
  };

  return (
    <Modal
      visible={visible}
      title="Update Type"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      okButtonProps={{ loading }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const updatedValues = { id: category.id };

            if (values.type !== category.type) {
              updatedValues.type = values.type;
            } else {
              updatedValues.type = category.type;
            }
            if (values.buy_price_per_gram !== category.buy_price_per_gram) {
              updatedValues.buy_price_per_gram = values.buy_price_per_gram;
            } else {
              updatedValues.buy_price_per_gram = category.buy_price_per_gram;
            }
            if (values.sell_price_per_gram !== category.sell_price_per_gram) {
              updatedValues.sell_price_per_gram = values.sell_price_per_gram;
            } else {
              updatedValues.sell_price_per_gram = category.sell_price_per_gram;
            }
            if (
              values.date &&
              values.date.format("YYYY-MM-DD") !== category.date
            ) {
              updatedValues.date = values.date.format("YYYY-MM-DD");
            } else {
              updatedValues.date = category.date;
            }

            onUpdate(updatedValues);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="type"
          label="Type Name"
          rules={[
            {
              required: true,
              message: "Please input the name of the category!",
            },
            { validator: checkTypeUniqueness },
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
            addonAfter=" VND"
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
            addonAfter=" VND"
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
          <DatePicker style={{ width: "100%" }} disabledDate={disabledDate} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
