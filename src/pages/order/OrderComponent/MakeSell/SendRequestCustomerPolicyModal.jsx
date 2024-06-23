import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Checkbox,
  Radio,
  notification,
} from "antd";
import dayjs from "dayjs";
import { useCreateCustomerPolicyMutation } from "../../../../services/customerAPI";

export default function SendRequestCustomerPolicyModal({ isVisible, onClose }) {
  const [form] = Form.useForm();
  const [discountType, setDiscountType] = useState("percentage");
  const [startDate, setStartDate] = useState(null);
  const [createCustomerPolicy, { isLoading }] =
    useCreateCustomerPolicyMutation();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const requestData = {
          description: values.description,
          discount_rate:
            discountType === "percentage" ? values.discount_rate : 0,
          fixed_discount_amount:
            discountType === "fixed" ? values.fixed_discount_amount : 0,
          valid_from: dayjs(values.valid_from).unix(),
          valid_to: dayjs(values.valid_to).unix(),
          approval_required: false,
          customer_id: values.customer_id,
        };

        console.log("Request Data to be sent:", requestData);

        // Send request data to the backend
        createCustomerPolicy(requestData)
          .unwrap()
          .then((response) => {
            console.log("Response Data:", response);
            notification.success({
              message: "Request Sent",
              description: "Your request has been sent successfully.",
            });
            form.resetFields();
            onClose();
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
      discount_rate: 0,
      fixed_discount_amount: 0,
    });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    form.setFieldsValue({ valid_to: null }); // Reset end date if start date changes
  };

  const disabledEndDate = (endValue) => {
    if (!endValue || !startDate) {
      return false;
    }
    return endValue.isBefore(startDate, "day");
  };

  return (
    <Modal
      title="Send Request"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          loading={isLoading}
        >
          Send
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Discount Type" required>
          <Radio.Group onChange={handleDiscountTypeChange} value={discountType}>
            <Radio value="percentage">Percentage Discount</Radio>
            <Radio value="fixed">Fixed Discount Amount</Radio>
          </Radio.Group>
        </Form.Item>
        {discountType === "percentage" && (
          <Form.Item
            name="discount_rate"
            label="Discount Rate"
            rules={[
              { required: true, message: "Please input the discount rate!" },
            ]}
          >
            <InputNumber min={0} max={100} formatter={(value) => `${value}%`} />
          </Form.Item>
        )}
        {discountType === "fixed" && (
          <Form.Item
            name="fixed_discount_amount"
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
          name="valid_from"
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
          name="valid_to"
          label="Valid To"
          rules={[{ required: true, message: "Please select the end date!" }]}
        >
          <DatePicker disabledDate={disabledEndDate} />
        </Form.Item>
        {/* <Form.Item name="approval_required" valuePropName="checked">
          <Checkbox>Approval Required</Checkbox>
        </Form.Item> */}
        <Form.Item
          name="customer_id"
          label="Customer ID"
          rules={[{ required: true, message: "Please input the customer ID!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
