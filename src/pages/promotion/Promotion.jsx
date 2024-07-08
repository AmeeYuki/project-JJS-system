import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
  notification,
} from "antd";
import PropTypes from "prop-types";
import moment from "moment";

const PromotionForm = ({
  open,
  onCancel,
  onFinish,
  initialValues = {
    code: "",
    description: "",
    discountType: "percentage",
    discountPercentage: "",
    fixedDiscountAmount: "",
    startDate: null,
    endDate: null,
    status: false,
  },
}) => {
  const handleDiscountTypeChange = (e) => {
    const discountType = e.target.value;

    // Reset discount fields based on selected discountType
    const resetValues = {
      discountType,
      discountPercentage: discountType === "percentage" ? "" : null,
      fixedDiscountAmount: discountType === "fixed" ? "" : null,
    };

    // Notify reset successful with a star notification
    notification.success({
      message: "Fields Reset",
      description: "Discount fields reset successfully.",
      icon: <i className="fas fa-star" style={{ color: "#108ee9" }}></i>, // You can replace with your star icon
    });

    onFinish({ ...initialValues, ...resetValues });
  };

  return (
    <Modal
      title={initialValues.id ? "Update Promotion" : "Add a new Promotion"}
      visible={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
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
          </Form.Item>
        ) : (
          <Form.Item
            label="Fixed Discount Amount"
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
