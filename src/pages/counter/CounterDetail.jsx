import React, { useState } from "react";
import { ConfigProvider, Tabs, notification } from "antd";
import { useLocation, useParams } from "react-router-dom";
import ProductListCounter from "../product/ProductManage/ProductListCounter";
import UserListByCounterAndRole from "./CounterManage/UserListByCounterAndRole";
import UpdateProductModal from "../product/ProductManage/UpdateProductModal";
import ViewDetailProductModal from "../product/ProductManage/ViewDetailProductModal";
import UpdateUserModal from "../user/UserManage/UpdateUserModal";
import {
  useGetProductsByCounterIdQuery,
  useEditProductMutation,
  useDeleteProductMutation,
} from "../../services/productAPI";
import {
  useEditUserMutation,
  useDeleteUserMutation,
  useActiveUserMutation,
  useInactiveUserMutation,
  useGetUsersByRoleAndCounterQuery,
} from "../../services/userAPI";
import "./CounterDetail.css";

const { TabPane } = Tabs;

const CounterDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { counterName, location: counterLocation } = location.state || {};

  const { data: products, refetch: refetchProducts } =
    useGetProductsByCounterIdQuery(id);
  const { data: users, refetch: refetchUsers } =
    useGetUsersByRoleAndCounterQuery({ roleId: 3, counterId: id });

  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isUpdateProductModalVisible, setIsUpdateProductModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);

  const [editProductMutation, { isLoading: isLoadingEditProduct }] =
    useEditProductMutation();
  const [deleteProductMutation, { isLoading: isLoadingDeleteProduct }] =
    useDeleteProductMutation();

  const [activeUserMutation, { isLoading: isLoadingActiveUser }] =
    useActiveUserMutation();
  const [inactiveUserMutation, { isLoading: isLoadingInactiveUser }] =
    useInactiveUserMutation();

  React.useEffect(() => {
    if (Array.isArray(products)) {
      const indexedProducts = products.map((product, index) => ({
        ...product,
        index: index + 1,
      }));
      setProductData(indexedProducts);
    }
  }, [products]);

  React.useEffect(() => {
    if (Array.isArray(users)) {
      const indexedUsers = users.map((user, index) => ({
        ...user,
        index: index + 1,
      }));
      setUserData(indexedUsers);
    }
  }, [users]);

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
      await deleteProductMutation(productId);
      localStorage.setItem(`deleted_product_${productId}`, "true");
      setProductData((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, deleted: true } : product
        )
      );
      notification.success({
        message: "Delete product successfully",
      });
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
              productData={productData.filter(
                (product) =>
                  !product.deleted &&
                  !localStorage.getItem(`deleted_product_${product.id}`)
              )}
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
            <UserListByCounterAndRole
              userData={userData}
              roleId={3}
              counterId={id}
              handleActiveUser={handleActiveUser}
              handleInactiveUser={handleInactiveUser}
            />

          </TabPane>
        </Tabs>
      </ConfigProvider>
    </div>
  );
};

export default CounterDetail;
