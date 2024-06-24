import { useEffect } from "react";
import { Modal, Button, Input, Form, notification } from "antd";
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

  const handleSave = () => {
    // định dạng dữ liệu  phone
    const phoneNumber = selectedCustomer.phone;
    if (!/^\d+$/.test(phoneNumber)) {
      notification.error({
        message: "Error",
        description: "Phone number should only contain numbers.",
      });
      return;
    }

    // định dạng dữ liệu  email
    const email = selectedCustomer.email;
    if (!email.endsWith("@gmail.com")) {
      notification.error({
        message: "Error",
        description: "Email must end with @gmail.com.",
      });
      return;
    }

    handleSaveUpdate();
  };

  return (
    <Modal
      title="Update Customer"
      visible={openUpdate}
      onCancel={handleCloseUpdate}
      footer={null}
    >
      {selectedCustomer && (
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            label="Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  fullName: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter customer phone number" },
              {
                pattern: /^\d+$/,
                message: "Phone number should only contain numbers",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  phone: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter customer email" },
              {
                pattern: /@gmail\.com$/,
                message: "Email must end with @gmail.com",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  email: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please enter customer address" },
            ]}
          >
            <Input
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  address: e.target.value,
                })
              }
            />
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
