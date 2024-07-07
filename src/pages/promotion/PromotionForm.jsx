import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Radio,
  notification,
} from "antd";
import dayjs from "dayjs";
import { useAddPromotionMutation } from "../../services/promotionAPI";

const PromotionForm = ({ open, onCancel, onFinish }) => {
  const [form] = Form.useForm();
  const [discountType, setDiscountType] = useState("percentage");
  const [startDate, setStartDate] = useState(null);
  const [addPromotion] = useAddPromotionMutation();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const requestData = {
          description: values.description,
          discount_percentage:
            discountType === "percentage" ? values.discountPercentage : 0,
          fixed_discount_amount:
            discountType === "fixed" ? values.fixedDiscountAmount : 0,
          start_date: dayjs(values.start_date).toISOString(),
          end_date: dayjs(values.end_date).toISOString(),
        };

        console.log("Request Data to be sent:", requestData);

        // Send request data to the backend
        addPromotion(requestData)
          .unwrap()
          .then((response) => {
            console.log("Response Data:", response);
            notification.success({
              message: "Request Sent",
              description: "Your request has been sent successfully.",
            });

            form.resetFields();
            onFinish();
          })
          .catch((error) => {
            console.error("Error sending request:", error);
            notification.error({
              message: "Request Failed",
              description: "There was an issue sending your request.",
            });
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
    form.setFieldsValue({
      discountPercentage: 0,
      fixedDiscountAmount: 0,
    });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    form.setFieldsValue({ end_date: null }); // Reset end date if start date changes
  };

  const disabledEndDate = (endValue) => {
    if (!endValue || !startDate) {
      return false;
    }
    return endValue.isBefore(startDate, "day");
  };

  return (
    <Modal
      title="Add Promotion"
      visible={open}
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
      <Form form={form} layout="vertical">
        <Form.Item label="Discount Type" required>
          <Radio.Group onChange={handleDiscountTypeChange} value={discountType}>
            <Radio value="percentage">Percentage Discount</Radio>
            <Radio value="fixed">Fixed Discount Amount</Radio>
          </Radio.Group>
        </Form.Item>
        {discountType === "percentage" && (
          <Form.Item
            name="discountPercentage"
            label="Discount Percentage"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage!",
              },
            ]}
          >
            <InputNumber min={0} max={100} formatter={(value) => `${value}%`} />
          </Form.Item>
        )}
        {discountType === "fixed" && (
          <Form.Item
            name="fixedDiscountAmount"
            label="Fixed Discount Amount"
            rules={[
              {
                required: true,
                message: "Please input the fixed discount amount!",
              },
            ]}
          >
            <InputNumber min={0} formatter={(value) => `${value}`} />
          </Form.Item>
        )}
        <Form.Item
          name="start_date"
          label="Valid From"
          rules={[
            {
              required: true,
              message: "Please select the start date!",
            },
          ]}
        >
          <DatePicker onChange={handleStartDateChange} />
        </Form.Item>
        <Form.Item
          name="end_date"
          label="Valid To"
          rules={[{ required: true, message: "Please select the end date!" }]}
        >
          <DatePicker disabledDate={disabledEndDate} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PromotionForm;
