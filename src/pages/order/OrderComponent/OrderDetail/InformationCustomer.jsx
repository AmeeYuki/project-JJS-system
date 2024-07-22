import { Col, Row } from "antd";
import React from "react";
import dayjs from "dayjs"; // Make sure dayjs is imported

export default function InformationCustomer({ order }) {
  return (
    <div>
      <h3 className="">Information:</h3>

      <div className="information-detail">
        <Row>
          <Col span={12}>
            <Row>
              <Col span={8} offset={0}>
                <p>Order Code:</p>
              </Col>
              <Col span={15}>{order?.id}</Col>
              <Col span={8} offset={0}>
                <p>Create by:</p>
              </Col>
              <Col span={15}>{order?.created_by}</Col>
              <Col span={8} offset={0}>
                <p>Create Date:</p>
              </Col>
              <Col span={15}>{dayjs(order?.date).format("DD/MM/YYYY")}</Col>
              <Col span={8} offset={0}>
                <p>Type:</p>
              </Col>
              <Col span={15}>{order?.type == "sell" ? "Sell" : "Buy"}</Col>{" "}
              <Col span={8} offset={0}>
                <p>Status:</p>
              </Col>
              <Col span={15}>
                {order?.order_status == 0
                  ? "Paying"
                  : order?.order_status == 1
                  ? "Complete"
                  : order?.order_status == 2
                  ? "Cancel"
                  : null}
              </Col>{" "}
              <Col span={8} offset={0}>
                <p>Payment method:</p>
              </Col>
              <Col span={15}>
                {order?.payment_method == 0 ? "Cash" : "Momo"}
              </Col>
              {/* <Col span={8} offset={0}>
                <p>Discount:</p>
              </Col> */}
              {/* <Col span={15}>
                {order?.discount.toLocaleString()}
                VNĐ
              </Col> */}
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8} offset={0}>
                <p>Customer Name:</p>
              </Col>
              <Col span={15}>
                <p>{order ? order?.customer.fullName : null}</p>
              </Col>
              <Col span={8} offset={0}>
                <p>Email:</p>
              </Col>
              <Col span={15}>
                <p>{order ? order?.customer.email : null}</p>
              </Col>
              <Col span={8} offset={0}>
                <p>Phone:</p>
              </Col>
              <Col span={15}>
                <p>{order ? order?.customer.phone : null}</p>
              </Col>
              <Col span={8} offset={0}>
                <p>Address:</p>
              </Col>
              <Col span={15}>
                <p>{order ? order?.customer.address : null}</p>
              </Col>
              {/* <Col span={8} offset={0}>
                <p>Point:</p>
              </Col>
              <Col span={15}>
                <p>{order ? order?.customer.accumulated_point : null}</p>
              </Col> */}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
