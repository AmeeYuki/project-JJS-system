import React, { useState, useEffect } from "react";
import { ConfigProvider, Tabs, notification } from "antd";
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
import "./CounterDetail.css";
import { formatCurrency } from "../product/ProductUtil";

const { TabPane } = Tabs;

const CounterDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { counterName, location: counterLocation } = location.state || {};

  const { data: products, refetch: refetchProducts } =
    useGetProductsByCounterIdQuery(id);
  const { data: users, refetch: refetchUsers } =
    useGetUsersByRoleAndCounterQuery({ roleId: 3, counterId: id });
  const { data: orders } = useGetOrderByCounterIdQuery(id);

  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isUpdateProductModalVisible, setIsUpdateProductModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);

  const [editProductMutation, { isLoading: isLoadingEditProduct }] =
    useEditProductMutation();
  const [activeUserMutation, { isLoading: isLoadingActiveUser }] =
    useActiveUserMutation();
  const [inactiveUserMutation, { isLoading: isLoadingInactiveUser }] =
    useInactiveUserMutation();

  useEffect(() => {
    if (Array.isArray(products)) {
      const indexedProducts = products.map((product, index) => ({
        ...product,
        index: index + 1,
      }));
      setProductData(indexedProducts);
    }
  }, [products]);

  useEffect(() => {
    if (Array.isArray(users)) {
      const indexedUsers = users.map((user, index) => ({
        ...user,
        index: index + 1,
      }));
      setUserData(indexedUsers);
    }
  }, [users]);

  const calculateSalesData = (orders) => {
    if (!Array.isArray(orders))
      return { totalRevenue: 0, productQuantities: {} };

    let totalRevenue = 0;
    const productQuantities = {};

    orders.forEach((order) => {
      if (Array.isArray(order.items)) {
        order.items.forEach((item) => {
          const { productId, quantity, price } = item;
          totalRevenue += quantity * price;
          if (!productQuantities[productId]) {
            productQuantities[productId] = 0;
          }
          productQuantities[productId] += quantity;
        });
      }
    });

    return { totalRevenue, productQuantities };
  };

  const { totalRevenue, productQuantities } = calculateSalesData(orders);

  const handleUpdateProduct = (values) => {
    editProductMutation(values)
      .unwrap()
      .then(() => {
        setIsUpdateProductModalVisible(false);
        refetchProducts();
        notification.success({ message: "Update product successfully" });
      })
      .catch((error) => console.error("Error updating product: ", error));
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
      await activeUserMutation(userId);
      refetchUsers();
      notification.success({ message: "User activated successfully" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInactiveUser = async (userId) => {
    try {
      await inactiveUserMutation(userId);
      refetchUsers();
      notification.success({ message: "User inactivated successfully" });
    } catch (error) {
      console.error(error);
    }
  };

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
                loading={isLoadingEditProduct}
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
          <TabPane tab={<span className="tab-title">Sales</span>} key="3">
            <div className="counter_info_wrapper">
              <p className="counter_info_title">Total Revenue:</p>
              <p>{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="counter_info_wrapper">
              <p className="counter_info_title">Product Quantities Sold:</p>
              <ul>
                {Object.entries(productQuantities).map(
                  ([productId, quantity]) => (
                    <li key={productId}>
                      Product ID: {productId}, Quantity Sold: {quantity}
                    </li>
                  )
                )}
              </ul>
            </div>
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default CounterDetail;
