import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import "./Dashboard.css";

const Dashboard = ({ productsData, userData, orderData, customerData }) => {
  // Sample data for product sales
  const productSalesData = [
    { name: "Gold Ring", quantity: 50 },
    { name: "Silver Necklace", quantity: 30 },
    { name: "Diamond Bracelet", quantity: 20 },
    { name: "Pearl Earrings", quantity: 40 },
  ];

  const returnPolicy = {
    title: "Chính sách đổi trả trang sức",
    details: (
      <ul>
        <li>
          Thời gian đổi trả: Khách hàng có thể đổi trả sản phẩm trong vòng 30
          ngày kể từ ngày mua hàng, với điều kiện sản phẩm còn nguyên mới và
          chưa qua sử dụng.
        </li>
        <li>
          Điều kiện đổi trả: Sản phẩm phải được trả lại cùng với hóa đơn mua
          hàng và tem bảo hành còn nguyên vẹn.
        </li>
        <li>
          Loại trả hàng: Chúng tôi chỉ chấp nhận trả lại hoặc đổi sản phẩm,
          không hoàn tiền mặt.
        </li>
        <li>
          Trường hợp đặc biệt: Đối với sản phẩm bị lỗi do sản xuất, chúng tôi sẽ
          chịu trách nhiệm sửa chữa hoặc đổi mới sản phẩm cho khách hàng.
        </li>
        <li>
          Đổi trả trực tiếp tại cửa hàng: Khách hàng có thể đến cửa hàng để đổi
          trả sản phẩm một cách nhanh chóng và thuận tiện.
        </li>
        <li>
          Chính sách không áp dụng: Chính sách đổi trả không áp dụng cho các
          trường hợp sản phẩm đã qua sử dụng hoặc bị hư hỏng do sử dụng không
          đúng cách.
        </li>
        <li>
          Thời gian xử lý: Chúng tôi cam kết xử lý yêu cầu đổi trả của khách
          hàng trong vòng 7 ngày làm việc kể từ khi nhận được sản phẩm trả lại.
        </li>
      </ul>
    ),
  };

  return (
    <>
      <Row className="mb-4">
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>{productsData?.products.length || 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Employees</Card.Title>
              <Card.Text>{userData?.users.length - 1 || 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>{orderData?.orders.length || 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Customers</Card.Title>
              <Card.Text>{customerData?.length || 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>{returnPolicy.title}</Card.Title>
              <Card.Text>{returnPolicy.details}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Product Sales</Card.Title>
              <BarChart width={800} height={300} data={productSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#8884d8" />
              </BarChart>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </>
  );
};

export default Dashboard;
