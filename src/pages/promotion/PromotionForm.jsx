import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Switch,
  Select,
  notification,
} from "antd";
import PropTypes from "prop-types";
import moment from "moment";

const { Option } = Select;

const PromotionForm = ({
  visible,
  onCancel,
  onFinish,
  initialValues = {
    code: "",
    description: "",
    discount_type: "%",
    discount_percentage: null,
    fixed_discount_amount: null,
    start_date: null,
    end_date: null,
    is_used: false,
  },
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const normalizedValues = {
      ...values,
      discount_percentage:
        values.discount_type === "%" ? values.discount_percentage : null,
      fixed_discount_amount:
        values.discount_type === "fixed" ? values.fixed_discount_amount : null,
    };
    onFinish(normalizedValues);
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };

  const handleDateChange = (_, dateString) => {
    if (moment(dateString).isBefore(moment(), "day")) {
      notification.error({
        message: "Invalid Date",
        description: "Start date and end date cannot be in the past.",
      });
    }
  };

  return (
    <Modal
      title={initialValues.id ? "Update Promotion" : "Add a new Promotion"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          ...initialValues,
          start_date: initialValues.start_date
            ? moment(initialValues.start_date)
            : null,
          end_date: initialValues.end_date
            ? moment(initialValues.end_date)
            : null,
        }}
      >
        <Form.Item
          label="Promotion Code"
          name="code"
          rules={[{ required: true, message: "Please enter promotion code" }]}
        >
          <Input placeholder="Promotion Code..." />
        </Form.Item>
        <Form.Item label="Discount Type" name="discount_type" initialValue="%">
          <Select style={{ width: 120 }}>
            <Option value="%">%</Option>
            <Option value="fixed">Fixed</Option>
          </Select>
        </Form.Item>
        {form.getFieldValue("discount_type") === "%" ? (
          <Form.Item
            label="Discount Percentage"
            name="discount_percentage"
            rules={[
              { required: true, message: "Please enter discount percentage" },
            ]}
          >
            <Input placeholder="Discount Percentage..." />
          </Form.Item>
        ) : (
          <Form.Item
            label="Fixed Discount Amount"
            name="fixed_discount_amount"
            rules={[
              { required: true, message: "Please enter fixed discount amount" },
            ]}
          >
            <Input placeholder="Fixed Discount Amount..." />
          </Form.Item>
        )}
        <Form.Item
          label="Start Date"
          name="start_date"
          rules={[{ required: true, message: "Please select start date" }]}
        >
          <DatePicker disabledDate={disabledDate} onChange={handleDateChange} />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="end_date"
          rules={[{ required: true, message: "Please select end date" }]}
        >
          <DatePicker disabledDate={disabledDate} onChange={handleDateChange} />
        </Form.Item>
        <Form.Item label="Is Used" name="is_used" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues.id ? "Save" : "Add"}
          </Button>
          <Button onClick={onCancel} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

PromotionForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default PromotionForm;
