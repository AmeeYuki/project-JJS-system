import React, { useState, useEffect } from "react";
import { Input, Col, Row, Table, Button, Dropdown, Menu, Modal } from "antd";
import {
  RiAddLine,
  RiFilter3Line,
  RiMoreFill,
  RiSearchLine,
} from "@remixicon/react";
import "./Product.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomModal from "../../components/modal/Modal";

export default function Product() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedProductForUpdate, setSelectedProductForUpdate] =
    useState(null);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const responseData = await response.json();
      const formattedData = responseData.map((item, index) => ({
        ...item,
        key: index + 1,
        material: "Material Details",
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name) => (e) => {
    let value = e.target.value;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSelectChange = (value) => {
    setInputValues({ ...inputValues, category: value });
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleModalOk = (inputValues, selectValues, fileList) => {
    console.log("Input values:", inputValues);
    console.log("Select values:", selectValues);
    console.log("File list:", fileList);
    setModalVisible(false);
  };

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleViewDetail = (record) => {
    setSelectedProduct(record);
    setDetailModalVisible(true);
  };

  const handleUpdateProduct = (record) => {
    setSelectedProductForUpdate(record);
    setUpdateModalVisible(true);
  };

  const filteredData = searchValue
    ? data.filter(
        (item) =>
          (item.title &&
            item.title.toLowerCase().includes(searchValue.toLowerCase())) ||
          (item.barcode &&
            item.barcode.toLowerCase().includes(searchValue.toLowerCase())) ||
          (item.category &&
            item.category.toLowerCase().includes(searchValue.toLowerCase()))
      )
    : data;

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Product Name",
      dataIndex: "title",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Weight",
      dataIndex: "weight",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu style={{ width: "250px" }}>
              <Menu.Item key="1" onClick={() => handleViewDetail(record)}>
                View Detail
              </Menu.Item>
              <Menu.Item key="2" onClick={() => handleUpdateProduct(record)}>
                Update
              </Menu.Item>
              <Menu.Item key="3">Delete</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <RiMoreFill style={{ cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div className="product_title">Product Page</div>
      <Row gutter={[16, 16]} className="table-controls">
        <Col>
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="medium"
            placeholder="Search by name, barcode or category"
            prefix={<RiSearchLine />}
            value={searchValue}
            onChange={onChangeSearch}
          />
        </Col>
        <Col>
          <CustomButton
            icon={RiFilter3Line}
            text="Filter"
            iconSize="16px"
            iconColor="white"
            textColor="white"
            containerStyle={{
              backgroundColor: "#333333",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
            }}
            iconPosition="left"
            fontSize="14px"
            padding="5px 10px"
            onClick={() => setFilterModalVisible(true)}
          />
        </Col>
        <Col style={{ marginLeft: "auto" }}>
          <CustomButton
            icon={RiAddLine}
            text="Add Product"
            iconSize="16px"
            iconColor="white"
            textColor="white"
            containerStyle={{
              backgroundColor: "#333333",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
            }}
            iconPosition="left"
            fontSize="16px"
            padding="5px 20px"
            onClick={() => setAddModalVisible(true)}
          />
        </Col>
        <Col>
          <CustomButton
            text="View Category"
            iconSize="16px"
            iconColor="white"
            textColor="white"
            containerStyle={{
              backgroundColor: "#333333",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
            }}
            iconPosition="left"
            fontSize="16px"
            padding="5px 15px"
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredData} loading={loading} />

      {/* Modal */}
      <CustomModal
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        title="Add Product"
        content={[
          {
            label: "Product Name",
            type: "input",
            placeholder: "Name of product...",
            name: "productName",
            inputType: "text",
          },
          {
            label: "Category",
            type: "select",
            name: "category",
            placeholder: "Category of product..",
            options: [
              { value: "gold", label: "Gold" },
              { value: "silver", label: "Silver" },
              { value: "diamond", label: "Diamond" },
            ],
          },
          {
            label: "Barcode",
            type: "input",
            placeholder: "Barcode of product...",
            name: "barcode",
            inputType: "text",
          },
          {
            label: "Weight",
            type: "input",
            placeholder: "Weight of product...",
            name: "weight",
            inputType: "number",
          },
          {
            label: "Price",
            type: "input",
            placeholder: "Price of product...",
            name: "price",
            inputType: "number",
          },
          {
            label: "Image (png,jpg)",
            type: "file",
            name: "importFile",
          },
        ]}
        onOk={handleModalOk}
        okText="Create"
        cancelText="Cancel"
      />

      <CustomModal
        visible={filterModalVisible}
        onCancel={() => setFilterModalVisible(false)}
        title="Filter Products"
        content={[
          {
            label: "Category",
            type: "checkboxGroup",
            name: "category",
            options: [
              { label: "Gold", value: "gold" },
              { label: "Silver", value: "silver" },
              { label: "Diamond", value: "diamond" },
            ],
          },
          {
            label: "Price Range",
            type: "slider",
            name: "priceRange",
            min: 0,
            max: 1000000000,
            defaultValue: [0, 1000000000],
          },
        ]}
        onOk={handleModalOk}
        okText="Apply"
        cancelText="Cancel"
      />

      <Modal
        title={
          <div
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333333",
            }}
          >
            View Detail
          </div>
        }
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button
            key="back"
            onClick={() => setDetailModalVisible(false)}
            style={{
              backgroundColor: "#555555",
              color: "white",
              padding: "5px 40px",
            }}
          >
            Back
          </Button>,
        ]}
      >
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Col span={24} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              {selectedProduct ? selectedProduct.title : ""}
            </div>
          </Col>
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{
            padding: "10px 20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Col span={10}>
            <img
              src={selectedProduct ? selectedProduct.image : ""}
              alt={selectedProduct ? selectedProduct.title : ""}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Col>
          <Col span={14} style={{ paddingLeft: "20px" }}>
            <p style={{ marginBottom: "10px" }}>
              <strong>Material:</strong>{" "}
              {selectedProduct ? selectedProduct.material : ""}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Barcode:</strong>{" "}
              {selectedProduct ? selectedProduct.barcode : ""}
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Weight:</strong>{" "}
              {selectedProduct ? selectedProduct.weight : ""}
            </p>
            <p style={{ marginBottom: "0" }}>
              <strong>Price:</strong>{" "}
              {selectedProduct ? selectedProduct.price : ""}
            </p>
          </Col>
        </Row>
      </Modal>
      <CustomModal
        visible={updateModalVisible}
        onCancel={() => {
          setUpdateModalVisible(false);
          setSelectedProductForUpdate(null); 
        }}
        title="Update Product"
        content={[
          {
            label: "Product Name",
            type: "input",
            placeholder: "Name of product...",
            name: "productName",
            inputType: "text",
            initialValue: selectedProductForUpdate
              ? selectedProductForUpdate.title
              : "",
          },
          {
            label: "Category",
            type: "select",
            placeholder: "Select category...",
            name: "category",
            options: [
              { value: "gold", label: "Gold" },
              { value: "silver", label: "Silver" },
              { value: "diamond", label: "Diamond" },
            ],
            initialValue: selectedProductForUpdate
              ? selectedProductForUpdate.category
              : "",
          },
          {
            label: "Barcode",
            type: "input",
            placeholder: "Barcode of product...",
            name: "barcode",
            inputType: "text",
            initialValue: selectedProductForUpdate
              ? selectedProductForUpdate.barcode
              : "",
          },
          {
            label: "Weight",
            type: "input",
            placeholder: "Weight of product...",
            name: "weight",
            inputType: "number",
            initialValue: selectedProductForUpdate
              ? selectedProductForUpdate.weight
              : "",
          },
          {
            label: "Price",
            type: "input",
            placeholder: "Price of product...",
            name: "price",
            inputType: "number",
            initialValue: selectedProductForUpdate
              ? selectedProductForUpdate.price
              : "",
          },
          {
            label: "Image (png,jpg)",
            type: "file",
            name: "importFile",
          },
        ]}
        onOk={(inputValues, selectValues, fileList) => {
          console.log("Updated input values:", inputValues);
          console.log("Updated select values:", selectValues);
          console.log("Updated file list:", fileList);
          setUpdateModalVisible(false);
          setSelectedProductForUpdate(null);
        }}
        okText="Save"
        cancelText="Cancel"
      />
    </div>
  );
}
