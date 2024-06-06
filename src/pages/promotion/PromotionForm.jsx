// import React from "react";
import { Modal, Form, Input, Button } from "antd";
import PropTypes from "prop-types";

const PromotionForm = ({
  visible,
  onCancel,
  onFinish,
  initialValues = { code: "", discount: "", startdate: "", enddate: "" },
}) => {
  return (
    <Modal
      title={initialValues.id ? "Update Promotion" : "Add a new Promotion"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
        <Form.Item label="Promotion Code" name="code">
          <Input placeholder="Promotion Code..." />
        </Form.Item>
        <Form.Item label="Discount" name="discount">
          <Input placeholder="Discount..." />
        </Form.Item>
        <Form.Item label="Start Date" name="startdate">
          <Input placeholder="Start Date..." />
        </Form.Item>
        <Form.Item label="End Date" name="enddate">
          <Input placeholder="End Date..." />
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
