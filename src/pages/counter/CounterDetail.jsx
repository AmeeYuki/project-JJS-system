import React, { useState, useEffect } from "react";
import { ConfigProvider, Tabs, notification } from "antd";
import { useLocation, useParams } from "react-router-dom";
import ProductListCounter from "../product/ProductManage/ProductListCounter";
import {
  useGetProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
} from "../../services/productAPI";
import UpdateProductModal from "../product/ProductManage/UpdateProductModal";
import ViewDetailProductModal from "../product/ProductManage/ViewDetailProductModal";
import UserList from "../user/UserManage/UserList";
import {
  useGetAllUserQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} from "../../services/userAPI";
import UpdateUserModal from "../user/UserManage/UpdateUserModal";
import "./CounterDetail.css";

const { TabPane } = Tabs;

export default function CounterDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { counterName, location: counterLocation } = location.state || {};

  const { data: products, refetch: refetchProducts } = useGetProductsQuery();
  const { data: users, refetch: refetchUsers } = useGetAllUserQuery();

  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isUpdateProductModalVisible, setIsUpdateProductModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  const [isUpdateUserModalVisible, setIsUpdateUserModalVisible] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [editProductMutation, { isLoading: isLoadingEditProduct }] =
    useEditProductMutation();
  const [deleteProductMutation, { isLoading: isLoadingDeleteProduct }] =
    useDeleteProductMutation();

  const [editUserMutation, { isLoading: isLoadingEditUser }] =
    useEditUserMutation();
  const [deleteUserMutation, { isLoading: isLoadingDeleteUser }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (products) {
      const filteredProducts = products.filter(
        (product) => product.counter === counterName
      );
      const indexedProducts = filteredProducts.map((product, index) => ({
        ...product,
        index: index + 1,
      }));
      setProductData(indexedProducts);
    }
  }, [products, counterName]);

  useEffect(() => {
    if (users) {
      const filteredUsers = users.filter(
        (user) => user.role.toLowerCase() === 3 && user.counter === counterName
      );
      const indexedUsers = filteredUsers.map((user, index) => ({
        ...user,
        index: index + 1,
      }));
      setUserData(indexedUsers);
    }
  }, [users, counterName]);

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

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductMutation(productId).unwrap();
      refetchProducts();
      notification.success({ message: "Delete product successfully" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsUpdateProductModalVisible(true);
  };

  const handleViewProductDetail = (product) => {
    setSelectedProductDetail(product);
  };

  const handleUpdateUser = (values) => {
    editUserMutation(values)
      .unwrap()
      .then(() => {
        setIsUpdateUserModalVisible(false);
        refetchUsers();
        notification.success({ message: "Update user successfully" });
      })
      .catch((error) => console.error("Error updating user: ", error));
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserMutation(userId).unwrap();
      refetchUsers();
      notification.success({ message: "Delete user successfully" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsUpdateUserModalVisible(true);
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
              handleDeleteProduct={handleDeleteProduct}
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
            <UserList
              userData={userData}
              onEditUser={handleEditUser}
              handleDeleteUser={handleDeleteUser}
            />
            {selectedUser && (
              <UpdateUserModal
                visible={isUpdateUserModalVisible}
                onUpdate={handleUpdateUser}
                onCancel={() => setIsUpdateUserModalVisible(false)}
                loading={isLoadingEditUser}
                user={selectedUser}
              />
            )}
          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
}
