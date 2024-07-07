import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
<<<<<<< HEAD
  Switch,
  Select,
=======
  Radio,
>>>>>>> main
  notification,
} from "antd";
import PropTypes from "prop-types";
import moment from "moment";

const { Option } = Select;

const PromotionForm = ({
  open,
  onCancel,
  onFinish,
  initialValues = {
    code: "",
    description: "",
<<<<<<< HEAD
    discount_type: "%",
    discount_percentage: null,
    fixed_discount_amount: null,
    start_date: null,
    end_date: null,
    is_used: false,
=======
    discountType: "percentage",
    discountPercentage: "",
    fixedDiscountAmount: "",
    startDate: null,
    endDate: null,
    status: false,
>>>>>>> main
  },
}) => {
  const [form] = Form.useForm();

<<<<<<< HEAD
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
=======
  const handleDiscountTypeChange = (e) => {
    const discountType = e.target.value;

    form.setFieldsValue({
      discountType,
      discountPercentage: discountType === "percentage" ? "" : null,
      fixedDiscountAmount: discountType === "fixed" ? "" : null,
    });

    notification.success({
      message: "Fields Reset",
      description: "Discount fields reset successfully.",
      icon: <i className="fas fa-star" style={{ color: "#108ee9" }}></i>,
    });
>>>>>>> main
  };

  return (
    <Modal
      title={initialValues.id ? "Update Promotion" : "Add a new Promotion"}
      visible={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          ...initialValues,
          startDate: initialValues.startDate
            ? moment(initialValues.startDate)
            : null,
          endDate: initialValues.endDate ? moment(initialValues.endDate) : null,
        }}
        validateTrigger="onBlur"
      >
        <Form.Item
          label="Promotion Code"
          name="code"
<<<<<<< HEAD
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
=======
          rules={[
            { required: true, message: "Please input the promotion code!" },
          ]}
        >
          <Input placeholder="Promotion Code..." />
        </Form.Item>

        <Form.Item
          label="Select Discount Type"
          name="discountType"
          initialValue={initialValues.discountType}
          rules={[{ required: true, message: "Please select discount type!" }]}
        >
          <Radio.Group onChange={handleDiscountTypeChange}>
            <Radio.Button value="percentage">Percentage</Radio.Button>
            <Radio.Button value="fixed">Fixed Amount</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {initialValues.discountType === "percentage" ? (
          <Form.Item
            label="Discount Percentage"
            name="discountPercentage"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage!",
              },
            ]}
          >
            <Input type="number" placeholder="Discount Percentage..." />
>>>>>>> main
          </Form.Item>
        ) : (
          <Form.Item
            label="Fixed Discount Amount"
<<<<<<< HEAD
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
=======
            name="fixedDiscountAmount"
            rules={[
              {
                required: true,
                message: "Please input the fixed discount amount!",
              },
            ]}
          >
            <Input type="number" placeholder="Fixed Discount Amount..." />
          </Form.Item>
        )}

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[
            { required: true, message: "Please select the start date!" },
            {
              validator: (_, value) => {
                if (value && value >= moment().startOf("day")) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Start date must be in the future!")
                );
              },
            },
          ]}
        >
          <DatePicker
            disabledDate={(current) =>
              current && current < moment().startOf("day")
            }
          />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          rules={[
            { required: true, message: "Please select the end date!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("startDate") < value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("End date must be greater than start date!")
                );
              },
            }),
          ]}
        >
          <DatePicker
            disabledDate={(current) =>
              current && current < moment().startOf("day")
            }
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select the status!" }]}
        >
          <Radio.Group>
            <Radio value={true}>Active</Radio>
            <Radio value={false}>Inactive</Radio>
          </Radio.Group>
>>>>>>> main
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
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    code: PropTypes.string,
    description: PropTypes.string,
    discountType: PropTypes.oneOf(["percentage", "fixed"]),
    discountPercentage: PropTypes.number,
    fixedDiscountAmount: PropTypes.number,
    startDate: PropTypes.instanceOf(moment),
    endDate: PropTypes.instanceOf(moment),
    status: PropTypes.bool,
  }),
};

export default PromotionForm;
