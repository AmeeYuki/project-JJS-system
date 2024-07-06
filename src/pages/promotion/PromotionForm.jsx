import { useEffect } from "react";
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
    description: "",
    discountType: "percentage",
    discountPercentage: "",
    fixedDiscountAmount: "",
    startDate: moment().startOf("day"),
    endDate: moment().endOf("day"),
    status: false,
  },
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...initialValues,
      startDate: moment(initialValues.startDate),
      endDate: moment(initialValues.endDate),
      discountPercentage:
        initialValues.discountType === "percentage"
          ? initialValues.discountPercentage
          : 0,
      fixedDiscountAmount:
        initialValues.discountType === "fixed"
          ? initialValues.fixedDiscountAmount
          : 0,
    });
  }, [form, initialValues]);

  const handleDiscountTypeChange = (e) => {
    const discountType = e.target.value;
    let defaultValues = {};

    if (discountType === "percentage") {
      defaultValues = {
        discountType,
        discountPercentage: initialValues.discountPercentage || 0,
        fixedDiscountAmount: 0,
      };
    } else if (discountType === "fixed") {
      defaultValues = {
        discountType,
        discountPercentage: 0,
        fixedDiscountAmount: initialValues.fixedDiscountAmount || 0,
      };
    }

    form.setFieldsValue(defaultValues);

    notification.success({
      message: "Fields Reset",
      description: "Discount fields reset successfully.",
      icon: <i className="fas fa-star" style={{ color: "#108ee9" }}></i>,
    });
  };

  const handleFinish = (values) => {
    const formattedValues = {
      ...values,
      startDate: values.startDate ? values.startDate.toISOString() : null,
      endDate: values.endDate ? values.endDate.toISOString() : null,
    };

    onFinish(formattedValues);
  };

  const validateEndDate = (_, value) => {
    const startDateValue = form.getFieldValue("startDate");
    if (startDateValue && value && moment(value).isBefore(startDateValue)) {
      return Promise.reject(
        new Error("End date must be valid and greater than start date!")
      );
    }
    return Promise.resolve();
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
          discountPercentage:
            initialValues.discountType === "percentage"
              ? initialValues.discountPercentage
              : 0,
          fixedDiscountAmount:
            initialValues.discountType === "fixed"
              ? initialValues.fixedDiscountAmount
              : 0,
        }}
        validateTrigger="onBlur"
      >
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
                if (!value || !moment(value).isValid()) {
                  return Promise.reject(
                    new Error("Please select a valid start date!")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
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
            { validator: validateEndDate },
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
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
    description: PropTypes.string,
    discountType: PropTypes.oneOf(["percentage", "fixed"]),
    discountPercentage: PropTypes.number,
    fixedDiscountAmount: PropTypes.number,
    startDate: PropTypes.oneOfType([
      PropTypes.instanceOf(moment),
      PropTypes.string,
    ]),
    endDate: PropTypes.oneOfType([
      PropTypes.instanceOf(moment),
      PropTypes.string,
    ]),
    status: PropTypes.bool,
  }),
};

export default PromotionForm;
