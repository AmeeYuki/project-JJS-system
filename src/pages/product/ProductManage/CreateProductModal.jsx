import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from "../../../config/FireBaseImage/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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
          (snapshot) => {
            // Optional: Handle progress updates
          },
          (error) => {
            message.error("Upload failed.");
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                setImageUrl(downloadURL);
                form.setFieldsValue({ image: downloadURL });
                resolve(downloadURL);
              })
              .catch((error) => {
                message.error("Error getting image URL.");
                reject(error);
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
        const productData = { ...values, image: imageUrl };
        onCreate(productData);
        form.resetFields();
        setFileList([]);
        setImageUrl(null);
      } else {
        message.error("Please upload an image.");
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  return (
    <div className="create-product-page">
      <Modal
        visible={visible}
        title="Create a new product"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={handleOk}
      >
        <Form form={form} name="form_in_modal" initialValues={{ active: true }}>
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[
              {
                required: true,
                message: "Please input the name of the product!",
              },
            ]}
          >
            <Input placeholder="Input the product name" />
          </Form.Item>

          <Form.Item
            name="typeId"
            label="Type"
            rules={[
              {
                required: true,
                message: "Please select the type of the product!",
              },
            ]}
          >
            <Select placeholder="Select product type">
              <Option value={1}>Gold</Option>
              <Option value={2}>Silver</Option>
              <Option value={3}>Diamond</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="barcode"
            label="Barcode"
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
            <Input placeholder="Input the barcode" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                required: true,
                message: "Please input the quantity of the product!",
              },
              { type: "number", message: "Please input a valid number!" },
            ]}
          >
            <InputNumber
              placeholder="Input the quantity"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="priceProcessing"
            label="Price (Processing)"
            rules={[
              {
                required: true,
                message: "Please input the price of processing!",
              },
              { type: "number", message: "Please input a valid number!" },
            ]}
          >
            <InputNumber
              placeholder="Input the price of processing"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="priceStone"
            label="Price (Stone)"
            rules={[
              {
                required: true,
                message: "Please input the price of stone!",
              },
              { type: "number", message: "Please input a valid number!" },
            ]}
          >
            <InputNumber
              placeholder="Input the price of stone"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Weight"
            rules={[
              {
                required: true,
                message: "Please input the weight of the product!",
              },
              { type: "number", message: "Please input a valid number!" },
            ]}
          >
            <InputNumber
              name="weightUnit"
              placeholder="Input the weight"
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

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Input the description" />
          </Form.Item>

          <Form.Item
            name="counterId"
            label="Counter"
            rules={[
              {
                required: true,
                message: "Please select the counter of the product!",
              },
            ]}
          >
            <Select placeholder="Select counter">
              <Option value={1}>Counter 1</Option>
              <Option value={2}>Counter 2</Option>
              <Option value={3}>Counter 3</Option>
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
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Import File</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateProductModal;
