import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  Button,
  Switch,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateProductModal = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible]);

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImageUrl(info.file.response.url);
    }
  };

  return (
    <div className="create-product-page">
      <Modal
        visible={visible}
        title={
          <div
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333333",
            }}
          >
            Create a new product
          </div>
        }
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate({ ...values, image: imageUrl });
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="productName"
            label="Product Name:"
            rules={[
              {
                required: true,
                message: "Please input the name of the product!",
              },
            ]}
          >
            <Input placeholder="Input the product name..." />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category:"
            rules={[
              {
                required: true,
                message: "Please select the category of the product!",
              },
            ]}
          >
            <Select placeholder="Select product category...">
              <Option value="Gold">Gold</Option>
              <Option value="Silver">Silver</Option>
              <Option value="Diamond">Diamond</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="barcode"
            label="Barcode:"
            rules={[
              {
                required: true,
                message: "Please input the barcode of the product!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Please input a valid barcode number!",
              },
            ]}
          >
            <Input placeholder="Input the barcode..." />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Weight:"
            rules={[
              {
                required: true,
                message: "Please input the weight of the product!",
              },
              {
                type: "number",
                message: "Please input a valid number!",
              },
            ]}
          >
            <InputNumber
              placeholder="Input the weight..."
              style={{ width: "100%" }}
              addonAfter={
                <Form.Item name="weightUnit" noStyle>
                  <Select style={{ width: 80 }}>
                    <Option value="grams">g</Option>
                    <Option value="carats">ct</Option>
                  </Select>
                </Form.Item>
              }
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price:"
            rules={[
              {
                required: true,
                message: "Please input the price of the product!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Please input a valid price!",
              },
            ]}
          >
            <Input placeholder="Input the price..." addonAfter="VND" />
          </Form.Item>

          <Form.Item
            name="counter"
            label="Counter:"
            rules={[
              {
                required: true,
                message: "Please select the counter of the product!",
              },
            ]}
          >
            <Select>
              <Option value="counter 1">counter 1</Option>
              <Option value="counter 2">counter 2</Option>
              <Option value="counter 3">counter 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="image"
            label="Image (png, jpg)"
            rules={[
              {
                required: true,
                message: "Please upload an image of the product!",
              },
            ]}
          >
            <Upload
              accept=".png,.jpg"
              listType="picture"
              beforeUpload={() => false}
              onChange={handleImageChange}
            >
              <Button icon={<UploadOutlined />}>Import File</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="active"
            label="Active:"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Please select the active status!",
              },
            ]}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateProductModal;
