import { Flex } from "antd";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home({ auth }) {
  const navigate = useNavigate();
  const handleUpdatePage = () => {
    navigate("/update-password");
  };
  return (
    <div>
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Flex align="center" justify="space-between">
                <Card.Title>User Information</Card.Title>
                <Button
                  style={{ backgroundColor: "#333", fontWeight: "bold" }}
                  type="primary"
                  className="action-button"
                  onClick={handleUpdatePage}
                >
                  Update password
                </Button>
              </Flex>
              <hr />
              <p>Email: {auth?.email || "null"}</p>
              <p>Name: {auth?.name || "null"}</p>
              <p>Role: {auth?.roles || "null"}</p>
              {auth?.counter?.counterName && (
                <p>Counter: {auth?.counter?.counterName || "null"}</p>
              )}
              {/* <div className="buttons-container">
                <Button type="primary" className="action-button">
                  Make Order
                </Button>
                <Button type="primary" className="action-button">
                  Make Sell
                </Button>
                <Button type="primary" className="action-button">
                  View TypePrice
                </Button>
              </div> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
