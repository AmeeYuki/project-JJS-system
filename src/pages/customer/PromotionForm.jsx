import { Modal, Button, Input, Form, notification } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

const PromotionForm = ({
  openPromotion,
  handleClosePromotion,
  selectedCustomer,
  handleSavePromotion,
}) => {
  const [form] = Form.useForm();
  const [promotionDetails, setPromotionDetails] = useState("");

  const handleInputChange = (e) => {
    setPromotionDetails(e.target.value);
  };

  const onFinish = async () => {
    try {
      await handleSavePromotion(promotionDetails);
      notification.success({
        message: "Success",
        description: "Promotion details saved successfully.",
      });
      form.resetFields();
      setPromotionDetails("");
      handleClosePromotion();
    } catch (error) {
      notification.error({
        message: "Error",
        description: `Failed to save promotion details: ${error.message}`,
      });
    }
  };

  return (
    <Modal
      title={`Create Promotion for ${selectedCustomer?.fullName}`}
      open={openPromotion}
      onCancel={handleClosePromotion}
      footer={null}
    >
      {selectedCustomer && (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Promotion Details"
            name="promotionDetails"
            rules={[
              { required: true, message: "Please enter promotion details" },
            ]}
          >
            <Input.TextArea
              name="promotionDetails"
              placeholder="Enter promotion details..."
              value={promotionDetails}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleClosePromotion} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

PromotionForm.propTypes = {
  openPromotion: PropTypes.bool.isRequired,
  handleClosePromotion: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.shape({
    fullName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    gender: PropTypes.string,
    accumulated_point: PropTypes.number,
  }),
  handleSavePromotion: PropTypes.func.isRequired,
};

PromotionForm.defaultProps = {
  selectedCustomer: null,
};

export default PromotionForm;
