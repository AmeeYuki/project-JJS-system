import { Modal, Button, Input, Form } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

const PromotionForm = ({
  openPromotion,
  handleClosePromotion,
  selectedCustomer,
  handleSavePromotion,
}) => {
  const [promotionDetails, setPromotionDetails] = useState("");

  const handleInputChange = (e) => {
    setPromotionDetails(e.target.value);
  };

  const onFinish = () => {
    handleSavePromotion(promotionDetails);
    setPromotionDetails("");
  };

  return (
    <Modal
      title={`Create Promotion for ${selectedCustomer?.fullName}`}
      open={openPromotion}
      onCancel={handleClosePromotion}
      footer={null}
    >
      {selectedCustomer && (
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={`Create Promotion for ${selectedCustomer.fullName}`}
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
  selectedCustomer: PropTypes.object,
  handleSavePromotion: PropTypes.func.isRequired,
};

export default PromotionForm;
