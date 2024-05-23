import React, { useState, useEffect } from "react";
import { Input, Col, Row, Table, Dropdown, Menu } from "antd";
import { RiAddLine, RiMoreFill, RiSearchLine } from "@remixicon/react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomModal from "../../components/modal/Modal";
import "./Category.css";

export default function Category() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false);

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

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
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
      title: "Category Name",
      dataIndex: "title",
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu style={{ width: "250px" }}>
              <Menu.Item key="1">View Detail</Menu.Item>
              <Menu.Item key="2">Update</Menu.Item>
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
      <div className="category_title">Category Page</div>
      <Row gutter={[16, 16]} className="table-controls">
        <Col>
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="medium"
            placeholder="Search by category name"
            prefix={<RiSearchLine />}
            value={searchValue}
            onChange={onChangeSearch}
          />
        </Col>
        <Col></Col>
        <Col style={{ marginLeft: "auto" }}></Col>
        <Col>
          <CustomButton
            icon={RiAddLine}
            text="Add Category"
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
            padding="10px 20px"
            onClick={() => setAddCategoryModalVisible(true)}
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredData} loading={loading} />

      {/* Modal */}
      <CustomModal
        visible={addCategoryModalVisible}
        onCancel={() => setAddCategoryModalVisible(false)}
        title="Add Category"
        content={[
          {
            label: "Category Name",
            type: "input",
            placeholder: "Name of category...",
            name: "categoryName",
            inputType: "text",
          },
        ]}
        onOk={(inputValues) => {
          console.log("Input values:", inputValues);
          setAddCategoryModalVisible(false);
        }}
        okText="Create"
        cancelText="Cancel"
      />
    </div>
  );
}
