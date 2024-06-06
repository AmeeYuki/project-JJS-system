import { Modal, Button, Input, Form } from "antd";
import PropTypes from "prop-types";

const PromotionForm = ({
  openPromotion,
  handleClosePromotion,
  selectedCustomer,
  handleSavePromotion,
}) => (
  <Modal
    title="Create Promotion"
    open={openPromotion}
    onCancel={handleClosePromotion}
    footer={null}
  >
    {selectedCustomer && (
      <Form layout="vertical">
        <Form.Item label={`Create Promotion for ${selectedCustomer.fullName}`}>
          <Input.TextArea
            name="promotionDetails"
            placeholder="Enter promotion details..."
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleClosePromotion} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSavePromotion}>
            Save
          </Button>
        </Form.Item>
      </Form>
    )}
  </Modal>
);

PromotionForm.propTypes = {
  openPromotion: PropTypes.bool.isRequired,
  handleClosePromotion: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.object,
  handleSavePromotion: PropTypes.func.isRequired,
};

export default PromotionForm;
