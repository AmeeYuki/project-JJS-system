import { Col, ConfigProvider, Row, Spin, notification } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import { useLazyGetCustomerByPhoneQuery } from "../../../../services/customerAPI";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../slices/auth.slice";

export default function CustomerSpace({
  onCustomerInfoChange,
  handleGetCustomerInfo,
  onCustomerData,
}) {
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const auth = useSelector(selectAuth);
  const [getCustomerByPhone, { isLoading }] = useLazyGetCustomerByPhoneQuery();

  const onSearch = (value) => {
    setPhone(value);
    getCustomerByPhone(value)
      .then((result) => {
        if (result.data) {
          onCustomerData(result.data);
          setCustomer(result.data);
          onCustomerInfoChange(result.data); // Truyền thông tin khách hàng ra ngoài
          notification.success({
            message: "Success",
            description: "Customer found successfully!",
          });
          handleGetCustomerInfo();
        } else {
          setCustomer(null);
          notification.error({
            message: "Error",
            description: "Failed to find customer. Please try again.",
          });
        }
      })
      .catch((error) => {
        setCustomer(null);
        console.error(error);
        notification.error({
          message: "Error",
          description:
            "An error occurred while fetching customer data. Please try again later.",
        });
      });
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <h1 className="title">Information:</h1>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: "6px 6px 6px 6px",
          },
        }}
      >
        <Search
          style={{ width: "400px" }}
          placeholder="Input phone customer"
          onSearch={onSearch}
          enterButton
        />
      </ConfigProvider>
      <div className="information-detail">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Row>
            <Col span={12}>
              <Row>
                <Col span={8} offset={0}>
                  <p>Customer Name:</p>
                </Col>
                <Col span={15}>
                  <p>{customer ? customer.fullName : null}</p>
                </Col>
                <Col span={8} offset={0}>
                  <p>Email:</p>
                </Col>
                <Col span={15}>
                  <p>{customer ? customer.email : null}</p>
                </Col>
                <Col span={8} offset={0}>
                  <p>Phone:</p>
                </Col>
                <Col span={15}>
                  <p>{customer ? customer.phone : null}</p>
                </Col>
                <Col span={8} offset={0}>
                  <p>Address:</p>
                </Col>
                <Col span={15}>
                  <p>{customer ? customer.address : null}</p>
                </Col>
                <Col span={8} offset={0}>
                  <p>Point:</p>
                </Col>
                <Col span={15}>
                  <p>{customer ? customer.accumulated_point : null}</p>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={8} offset={0}>
                  <p>Create by:</p>
                </Col>
                <Col span={15}>
                  <p>{auth.name}</p>
                </Col>
                <Col span={8} offset={0}>
                  <p>Create Date:</p>
                </Col>
                <Col span={15}>
                  <p>{getCurrentDate()}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
}
