import React, { useState, useEffect } from "react";
import { ConfigProvider, Tabs, notification, Spin } from "antd";
import { useLocation, useParams } from "react-router-dom";
import ProductListCounter from "../product/ProductManage/ProductListCounter";
import UserListByCounterAndRole from "./CounterManage/UserListByCounterAndRole";
import UpdateProductModal from "../product/ProductManage/UpdateProductModal";
import ViewDetailProductModal from "../product/ProductManage/ViewDetailProductModal";
import {
  useGetProductsByCounterIdQuery,
  useEditProductMutation,
} from "../../services/productAPI";
import {
  useActiveUserMutation,
  useInactiveUserMutation,
  useGetUsersByRoleAndCounterQuery,
} from "../../services/userAPI";
import { useGetOrderByCounterIdQuery } from "../../services/orderAPI";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./CounterDetail.css";
import { formatCurrency } from "../product/ProductUtil";

const { TabPane } = Tabs;

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CounterDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { counterName, location: counterLocation } = location.state || {};

  const {
    data: products,
    refetch: refetchProducts,
    isLoading: isLoadingProducts,
  } = useGetProductsByCounterIdQuery(id);
  const {
    data: users,
    refetch: refetchUsers,
    isLoading: isLoadingUsers,
  } = useGetUsersByRoleAndCounterQuery({ roleId: 3, counterId: id });
  const {
    data: orderData,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
  } = useGetOrderByCounterIdQuery(id);

  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isUpdateProductModalVisible, setIsUpdateProductModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productQuantities, setProductQuantities] = useState({});
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  const [editProductMutation] = useEditProductMutation();
  const [activeUserMutation] = useActiveUserMutation();
  const [inactiveUserMutation] = useInactiveUserMutation();

  useEffect(() => {
    if (Array.isArray(products)) {
      setProductData(
        products.map((product, index) => ({
          ...product,
          index: index + 1,
        }))
      );
    }
  }, [products]);

  useEffect(() => {
    if (Array.isArray(users)) {
      setUserData(
        users.map((user, index) => ({
          ...user,
          index: index + 1,
        }))
      );
    }
  }, [users]);

  useEffect(() => {
    if (orderData && orderData.orders) {
      const { totalRevenue, productQuantities, chartData } = calculateSalesData(
        orderData.orders
      );
      setTotalRevenue(totalRevenue);
      setProductQuantities(productQuantities);
      setChartData(chartData);
    }
  }, [orderData]);

  const calculateSalesData = (orders) => {
    if (!Array.isArray(orders)) {
      return {
        totalRevenue: 0,
        productQuantities: {},
        chartData: { labels: [], values: [] },
      };
    }

    let totalRevenue = 0;
    const productQuantities = {};
    const chartData = { labels: [], values: [] };

    orders.forEach((order) => {
      if (Array.isArray(order.orderDetailsList)) {
        order.orderDetailsList.forEach(({ product, quantity, unitPrice }) => {
          const orderTotal = quantity * unitPrice;
          totalRevenue += orderTotal;
          if (!productQuantities[product.id]) { 
            productQuantities[product.id] = {
              name: product.productName,
              quantity: 0,
            };
          }
          productQuantities[product.id].quantity += quantity;
        });
      }
    });

    chartData.labels = Object.values(productQuantities).map((p) => p.name);
    chartData.values = Object.values(productQuantities).map((p) => p.quantity);

    return { totalRevenue, productQuantities, chartData };
  };

  const handleUpdateProduct = (values) => {
    editProductMutation(values)
      .unwrap()
      .then(() => {
        setIsUpdateProductModalVisible(false);
        refetchProducts();
        notification.success({ message: "Product updated successfully" });
      })
      .catch((error) => {
        console.error("Error updating product: ", error);
        notification.error({ message: "Failed to update product" });
      });
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsUpdateProductModalVisible(true);
  };

  const handleViewProductDetail = (product) => {
    setSelectedProductDetail(product);
  };

  const handleActiveUser = async (userId) => {
    try {
      await activeUserMutation(userId).unwrap();
      refetchUsers();
      notification.success({ message: "User activated successfully" });
    } catch (error) {
      console.error("Error activating user: ", error);
      notification.error({ message: "Failed to activate user" });
    }
  };

  const handleInactiveUser = async (userId) => {
    try {
      await inactiveUserMutation(userId).unwrap();
      refetchUsers();
      notification.success({ message: "User deactivated successfully" });
    } catch (error) {
      console.error("Error deactivating user: ", error);
      notification.error({ message: "Failed to deactivate user" });
    }
  };

  if (isLoadingProducts || isLoadingUsers || isLoadingOrders) {
    return <Spin size="large" />;
  }

  if (isErrorOrders) {
    return <div>Error loading orders data</div>;
  }

  return (
    <div className="counter_detail_page">
      <h1 className="counter_title">Counter Information</h1>
      <div className="counter_info_wrapper">
        <p className="counter_info_title">Counter Name:</p>
        <p>{counterName}</p>
      </div>
      <div className="counter_info_wrapper">
        <p className="counter_info_title">Location:</p>
        <p>{counterLocation}</p>
      </div>
      <ConfigProvider
        theme={{ components: { Tabs: { inkBarColor: "black" } } }}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span className="tab-title">Product</span>} key="1">
            <ProductListCounter
              productData={productData}
              onEditProduct={handleEditProduct}
              onViewProductDetail={handleViewProductDetail}
            />
            {selectedProduct && (
              <UpdateProductModal
                visible={isUpdateProductModalVisible}
                onUpdate={handleUpdateProduct}
                onCancel={() => setIsUpdateProductModalVisible(false)}
                product={selectedProduct}
              />
            )}
            {selectedProductDetail && (
              <ViewDetailProductModal
                visible={true}
                product={selectedProductDetail}
                onClose={() => setSelectedProductDetail(null)}
              />
            )}
          </TabPane>
          <TabPane tab={<span className="tab-title">Staff</span>} key="2">
            <UserListByCounterAndRole
              userData={userData}
              roleId={3}
              counterId={id}
              handleActiveUser={handleActiveUser}
              handleInactiveUser={handleInactiveUser}
            />
          </TabPane>
          <TabPane tab={<span className="tab-title">Revenue</span>} key="3">
            <div className="counter_info_wrapper">
              <p className="counter_info_title">Total Revenue:</p>
              <p>{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="counter_info_wrapper">
              <p className="counter_info_title">Product Quantities Sold:</p>
              <ul>
                {Object.entries(productQuantities).map(
                  ([productId, { name, quantity }]) => (
                    <li key={productId}>
                      {name} - {quantity}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="chart-container">
              <Bar
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      label: "Product Quantities",
                      data: chartData.values,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return `${context.label}: ${context.raw}`;
                        },
                      },
                    },
                  },
                }}
                width={500}
                height={300}
              />
            </div>
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default CounterDetail;
