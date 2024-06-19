import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from "../../../config/FireBaseImage/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useGetTypesQuery } from "../../../services/typeAPI";
import { useGetCountersQuery } from "../../../services/counterAPI";

const { Option } = Select;

const CreateProductModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: typesData, isLoading: typesLoading } = useGetTypesQuery();
  const { data: countersData, isLoading: countersLoading } =
    useGetCountersQuery();

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setFileList([]);
      setImageUrl(null);
      setLoading(false);
    }
  }, [visible]);

  const handleImageChange = ({ file, fileList }) => {
    setFileList(fileList);
    if (file.status === "removed") {
      setImageUrl(null);
    }
  };
  
  const generateBarcode = (type) => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return type + randomNum;
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

  const validateNonNegativeNumber = (_, value) => {
    if (value < 0) {
      return Promise.reject(new Error("Please input a non-negative number!"));
    }
    return Promise.resolve();
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const imageUrl = await handleUpload();
      if (imageUrl) {
        const barcode = generateBarcode(
          values.typeId === 1 ? "G" : values.typeId === 2 ? "S" : "D"
        );
        const productData = {
          ...values,
          image: imageUrl,
          barcode: barcode,
        };
        await onCreate(productData);
        form.resetFields();
        setFileList([]);
        setImageUrl(null);
        setLoading(false);
      } else {
        message.error("Please upload an image.");
        setLoading(false);
      }
    } catch (error) {
      console.log("Validation Failed:", error);
      setLoading(false);
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
        okButtonProps={{ loading }}
        onCancel={onCancel}
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
            <Select
              placeholder="Select product type"
              loading={typesLoading}
              disabled={typesLoading}
            >
              {typesData &&
                typesData.map((type) => (
                  <Option key={type.id} value={type.id}>
                    {type.type}
                  </Option>
                ))}
            </Select>
          </Form.Item>{" "}
          <Form.Item name="barcode" label="Barcode">
            <Input
              disabled
              placeholder="Barcode will be generated automatically"
            />
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
              { validator: validateNonNegativeNumber },
            ]}
          >
            <InputNumber
              placeholder="Input the quantity"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="priceStone"
            label="Price (Stone):"
            rules={[
              {
                required: true,
                message: "Please input the stone price of the product!",
              },
              { pattern: /^[0-9]+$/, message: "Please input a valid price!" },
              { validator: validateNonNegativeNumber },
            ]}
          >
            <Input placeholder="Input the stone price..." addonAfter=" VND" />
          </Form.Item>
          <Form.Item
            name="priceProcessing"
            label="Price (Processing):"
            rules={[
              {
                required: true,
                message: "Please input the price of the product!",
              },
              { pattern: /^[0-9]+$/, message: "Please input a valid price!" },
              { validator: validateNonNegativeNumber },
            ]}
          >
            <Input placeholder="Input the price..." addonAfter=" VND" />
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
              { validator: validateNonNegativeNumber },
            ]}
          >
            <InputNumber
              placeholder="Input the weight"
              style={{ width: "100%" }}
              addonAfter={
                <Form.Item
                  name="weightUnit"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please select the weight unit!",
                    },
                  ]}
                >
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
            <Select
              placeholder="Select counter"
              loading={countersLoading}
              disabled={countersLoading}
            >
              {countersData &&
                countersData
                  .filter((counter) => counter.status === true)
                  .map((counter) => (
                    <Option key={counter.id} value={counter.id}>
                      {counter.counterName}
                    </Option>
                  ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="image"
            label="
          Image (png, jpg)"
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
              maxCount={1}
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
