import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
        price: product.price ? Number(product.price) : undefined,
      });
      // Initialize fileList with the existing image URL if available
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

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedProduct = {
          product_name: values.productName,
          barcode: values.barcode,
          quantity: values.quantity,
          price_processing: values.priceProcessing,
          price_stone: values.priceStone,
          weight: values.weight,
          weight_unit: values.weightUnit,
          description: values.description,
          image_url:
            fileList.length > 0 && fileList[0].status === "done"
              ? fileList[0].url
              : product.image,
          type_id: values.typeName,
          counter_id: values.counterName,
          id: product.id,
        };
        onUpdate(updatedProduct);
      })
      .catch((errorInfo) => {
        console.log("Validate Failed:", errorInfo);
      });
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
            name="typeName"
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
            <Input placeholder="Input the price..." addonAfter=".000 VND" />
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
            <Input
              placeholder="Input the stone price..."
              addonAfter=".000 VND"
            />
          </Form.Item>

          <Form.Item name="description" label="Description:">
            <Input.TextArea placeholder="Input the description..." />
          </Form.Item>

          {/* loi o day */}
          <Form.Item
            name="counterName"
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
                countersData.map((counter) => (
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
