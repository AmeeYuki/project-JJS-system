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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../config/FireBaseImage/firebaseConfig";
import { useGetTypesQuery } from "../../../services/typeAPI";
import { useGetCountersQuery } from "../../../services/counterAPI";

const { Option } = Select;

const UpdateProductModal = ({
  visible,
  onUpdate,
  onCancel,
  product,
  loading,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { data: typesData, isLoading: typesLoading } = useGetTypesQuery();
  const { data: countersData, isLoading: countersLoading } =
    useGetCountersQuery();

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        weight: product.weight ? Number(product.weight) : undefined,
        priceProcessing: product.priceProcessing
          ? Number(product.priceProcessing)
          : undefined,
        priceStone: product.priceStone ? Number(product.priceStone) : undefined,
      });
      if (product.image) {
        setFileList([
          { uid: "-1", name: "image.png", status: "done", url: product.image },
        ]);
      }
    }
  }, [product, form]);

  const handleImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleImageRemove = (file) => {
    setFileList([]);
  };

  const handleUpload = async () => {
    if (fileList.length > 0 && fileList[0].status !== "done") {
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
                setFileList([
                  {
                    uid: "-1",
                    name: file.name,
                    status: "done",
                    url: downloadURL,
                  },
                ]);
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
    return fileList.length > 0 ? fileList[0].url : product.image;
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const imageUrl = await handleUpload();
      const updatedProduct = {
        product_name: values.productName,
        barcode: values.barcode,
        quantity: values.quantity,
        price_processing: values.priceProcessing,
        price_stone: values.priceStone,
        weight: values.weight,
        weight_unit: values.weightUnit,
        description: values.description,
        image_url: imageUrl,
        type_id: values.typeId,
        counter_id: values.counterId,
        id: product.id,
      };
      await onUpdate(updatedProduct);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  return (
    <div className="update-product-page">
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
            Update product
          </div>
        }
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{ loading }}
        onCancel={onCancel}
        onOk={handleOk}
      >
        <Form form={form} name="form_in_modal">
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
            <Input />
          </Form.Item>

          <Form.Item
            name="typeId"
            label="Type:"
            rules={[
              {
                required: true,
                message: "Please select the category of the product!",
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
          </Form.Item>

          <Form.Item name="barcode" label="Barcode:">
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity:"
            rules={[
              {
                required: true,
                message: "Please input the quantity of the product!",
              },
              { type: "number", message: "Please input a valid number!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Weight:"
            rules={[
              {
                required: true,
                message: "Please input the weight of the product!",
              },
              { type: "number", message: "Please input a valid number!" },
            ]}
          >
            <InputNumber
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
            name="priceProcessing"
            label="Price (Processing):"
            rules={[
              {
                required: true,
                message: "Please input the price of the product!",
              },
              { pattern: /^[0-9]+$/, message: "Please input a valid price!" },
            ]}
          >
            <Input placeholder="Input the price..." addonAfter=" VND" />
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
            ]}
          >
            <Input placeholder="Input the stone price..." addonAfter=" VND" />
          </Form.Item>

          <Form.Item name="description" label="Description:">
            <Input.TextArea placeholder="Input the description..." />
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
              onRemove={handleImageRemove}
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

export default UpdateProductModal;
