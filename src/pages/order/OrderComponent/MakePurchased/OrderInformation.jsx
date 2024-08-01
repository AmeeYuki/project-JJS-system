import { Card, Col, Row } from "antd";
import dayjs from "dayjs";

const OrderInformation = ({ order }) => (
  <Row gutter={[16, 16]}>
    <Col span={24}>
      <h6 className="sub-title">Order Information</h6>
      <hr />
      <p>Order ID: {order.id}</p>
      <p>Customer Name: {order.customer.fullName}</p>
      <p>Order Date: {dayjs(order.date).format("DD/MM/YYYY")}</p>
      <p>Create by: {order.created_by}</p>
    </Col>
  </Row>
);

export default OrderInformation;
