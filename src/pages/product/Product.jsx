import React, { useState, useEffect } from "react";
import { Input, Col, Row, Table, Button } from "antd";
import { RiAddLine, RiFilter3Line, RiSearchLine } from "@remixicon/react";
import "./Product.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomModal from "../../components/modal/Modal";

export default function Product() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    productName: "",
    category: "",
    barcode: "",
    weight: "",
    price: "",
  });
  const [fileList, setFileList] = useState([]);

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
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (fieldName) => (e) => {
    const { value } = e.target;
    setInputValues({ ...inputValues, [fieldName]: value });
  };

  const handleModalOk = () => {
    console.log("Input values:", inputValues);
    console.log("File list:", fileList);
    setModalVisible(false);
    setInputValues({
      productName: "",
      category: "",
      barcode: "",
      weight: "",
      price: "",
    });
    setFileList([]);
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const sharedOnCell = (_, index) => {
    return {};
  };

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const filteredData = searchValue
    ? data.filter(
        (item) =>
          (item.name &&
            item.name.toLowerCase().includes(searchValue.toLowerCase())) ||
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
      dataIndex: "name",
      onCell: sharedOnCell,
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      onCell: sharedOnCell,
    },
    {
      title: "Category",
      dataIndex: "category",
      onCell: sharedOnCell,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      onCell: sharedOnCell,
    },
    {
      title: "Price",
      dataIndex: "price",
      onCell: sharedOnCell,
    },
    {
      title: "Counter",
      dataIndex: "counter",
      onCell: sharedOnCell,
    },
    {
      title: "",
      dataIndex: "",
      onCell: sharedOnCell,
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
            onClick={() => setModalVisible(true)} // Mở modal khi click vào nút "Add Product"
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
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        title="Add Product"
        content={[
          {
            type: "input",
            name: "productName",
            label: "Product Name",
            placeholder: "Name of product...",
            value: inputValues.productName,
            onChange: handleInputChange("productName"),
          },
          {
            type: "input",
            name: "category",
            label: "Category",
            placeholder: "Category of product...",
            value: inputValues.category,
            onChange: handleInputChange("category"),
          },
          {
            type: "input",
            name: "barcode",
            label: "Barcode",
            placeholder: "Barcode of product...",
            value: inputValues.barcode,
            onChange: handleInputChange("barcode"),
          },
          {
            type: "input",
            name: "weight",
            label: "Weight",
            placeholder: "Weight of product...",
            value: inputValues.weight,
            onChange: handleInputChange("weight"),
          },
          {
            type: "input",
            name: "price",
            label: "Price",
            placeholder: "Price of product...",
            value: inputValues.price,
            onChange: handleInputChange("price"),
          },
          {
            type: "file",
            label: "Image (png,jpg)",
            onChange: handleFileChange,
          },
        ]}
        footerButtons={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="create" type="primary" onClick={handleModalOk}>
            Create
          </Button>,
        ]}
      />
    </div>
  );
}
