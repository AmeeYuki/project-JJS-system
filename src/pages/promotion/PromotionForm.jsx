import { Modal, Form, Input, Button, DatePicker, Switch } from "antd";
import PropTypes from "prop-types";
import moment from "moment";

const PromotionForm = ({
  visible,
  onCancel,
  onFinish,
  initialValues = {
    code: "",
    description: "",
    discount_percentage: "",
    fixed_discount_amount: "",
    start_date: "",
    end_date: "",
    is_used: false,
  },
}) => {
  return (
    <Modal
      title={initialValues.id ? "Update Promotion" : "Add a new Promotion"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
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
        <Form.Item label="Promotion Code" name="code">
          <Input placeholder="Promotion Code..." />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input placeholder="Description..." />
        </Form.Item>
        <Form.Item label="Discount Percentage" name="discount_percentage">
          <Input placeholder="Discount Percentage..." />
        </Form.Item>
        <Form.Item label="Fixed Discount Amount" name="fixed_discount_amount">
          <Input placeholder="Fixed Discount Amount..." />
        </Form.Item>
        <Form.Item label="Start Date" name="start_date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="End Date" name="end_date">
          <DatePicker />
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
