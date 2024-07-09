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
