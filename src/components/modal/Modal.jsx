// Trong file CustomModal.js

import React, { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Radio,
  Row,
  Col,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CustomModal = ({ visible, onCancel, title, content, footerButtons }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [selectValue, setSelectValue] = useState(null);
  const [fileList, setFileList] = useState([]);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setInputError(""); 
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleSelectChange = (value) => {
    setSelectValue(value);
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleOk = () => {
    if (!inputValue.trim()) {
      setInputError("This field is required");
      return;
    }

    console.log("Input value:", inputValue);
    console.log("Radio value:", radioValue);
    console.log("Select value:", selectValue);
    console.log("File list:", fileList);
    onCancel();
  };

  const uploadProps = {
    fileList,
    onChange: handleFileChange,
  };

  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onCancel}
      footer={footerButtons}
    >
      <Row gutter={[16, 16]}>
        {content.map((item, index) => (
          <Col key={index} span={24}>
            <div
              style={{
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  flex: "0 0 auto",
                  width: "100px",
                  marginRight: "15px",
                }}
              >
                {item.label}
              </div>
              <div style={{ flex: "1" }}>
                {item.type === "title" && <h3>{item.text}</h3>}
                {item.type === "input" && (
                  <>
                    <Input
                      placeholder={item.placeholder}
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                    <div style={{ color: "red", fontSize: "10px" }}>
                      {inputError}
                    </div>
                  </>
                )}
                {item.type === "radio" && (
                  <Radio.Group
                    options={item.options}
                    onChange={handleRadioChange}
                    value={radioValue}
                  />
                )}
                {item.type === "select" && (
                  <Select
                    value={selectValue}
                    onChange={handleSelectChange}
                    style={{ width: "100%" }}
                  >
                    {item.options.map((option, index) => (
                      <Option key={index} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                )}
                {item.type === "file" && (
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Import File</Button>
                  </Upload>
                )}
                {item.type === "link" && <a href={item.href}>{item.text}</a>}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default CustomModal;

// example how to use: Product.jsx
