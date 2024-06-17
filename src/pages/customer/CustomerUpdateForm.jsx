import { useEffect } from "react";
import { Modal, Button, Input, Radio, Form } from "antd";
import PropTypes from "prop-types";

const CustomerUpdateForm = ({
  openUpdate,
  handleCloseUpdate,
  selectedCustomer,
  setSelectedCustomer,
  handleSaveUpdate,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(selectedCustomer);
  }, [selectedCustomer, form]);

  return (
    <Modal
      title="Update Customer"
      open={openUpdate}
      onCancel={handleCloseUpdate}
      footer={null}
    >
      {selectedCustomer && (
        <Form form={form} layout="vertical" onFinish={handleSaveUpdate}>
          <Form.Item label="Name" name="fullName">
            <Input
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  fullName: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  phone: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  email: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  address: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  gender: e.target.value,
                })
              }
            >
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button onClick={handleCloseUpdate} style={{ marginRight: 8 }}>
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

CustomerUpdateForm.propTypes = {
  openUpdate: PropTypes.bool.isRequired,
  handleCloseUpdate: PropTypes.func.isRequired,
  selectedCustomer: PropTypes.object,
  setSelectedCustomer: PropTypes.func.isRequired,
  handleSaveUpdate: PropTypes.func.isRequired,
};

export default CustomerUpdateForm;
