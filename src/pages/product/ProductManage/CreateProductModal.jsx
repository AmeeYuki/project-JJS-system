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
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from "../../../config/FireBaseImage/Config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const { Option } = Select;

const CreateProductModal = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setFileList([]);
      setImageUrl(null);
    }
  }, [visible]);

  const handleImageChange = ({ file, fileList }) => {
    setFileList(fileList);
    if (file.status === "removed") {
      setImageUrl(null);
    }
  };

  const handleUpload = async () => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            message.error("Upload failed.");
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    }
    return null;
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const imageUrl = await handleUpload();
      if (imageUrl) {
        onCreate({ ...values, image: imageUrl });
      }
    } catch (error) {
      console.log("Validation Failed:", error);
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
        onOk={handleOk}
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
              fileList={fileList}
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
