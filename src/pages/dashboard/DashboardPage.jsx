import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";

import "./Dashboard.css";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { useGetProductsQuery } from "../../services/productAPI";
import { useGetAllUserQuery } from "../../services/userAPI";
import { useGetOrdersQuery } from "../../services/orderAPI";
import { useGetAllCustomerQuery } from "../../services/customerAPI";

const DashboardPage = () => {
  const {
    data: productsData,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useGetProductsQuery();
  const {
    data: userData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetAllUserQuery();
  const {
    data: orderData,
    isLoading: ordersLoading,
    refetch: refetchOrders,
  } = useGetOrdersQuery();
  const {
    data: customerData,
    isLoading: customersLoading,
    refetch: refetchCustomers,
  } = useGetAllCustomerQuery();

  const auth = useSelector(selectAuth);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={12}>
          <h2>Welcome to Jewelry Selling System Dashboard, {auth?.name}!</h2>
        </Col>
      </Row>

      <Home auth={auth} />

      <Dashboard
        productsData={productsData}
        userData={userData}
        orderData={orderData}
        customerData={customerData}
      />
    </Container>
  );
};

export default DashboardPage;
