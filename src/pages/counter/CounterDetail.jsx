import React, { useState, useEffect } from "react";
import { Tabs, notification } from "antd";
import { useLocation, useParams } from "react-router-dom";
import ProductListCounter from "../product/ProductManage/ProductListCounter";
import {
  useGetProductsQuery,
  useEditProductMutation,
  useAddProductMutation,
  useDeleteProductMutation,
} from "../../services/productAPI";
import UpdateProductModal from "../product/ProductManage/UpdateProductModal";
import ViewDetailProductModal from "../product/ProductManage/ViewDetailProductModal";
import CreateProductModal from "../product/ProductManage/CreateProductModal";
import "./CounterDetail.css";

const { TabPane } = Tabs;

export default function CounterDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { counterName, location: counterLocation } = location.state || {};
  const { data: products, isLoading, refetch } = useGetProductsQuery();
  const [productData, setProductData] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  const [editProductMutation, { isLoading: isLoadingEdit }] =
    useEditProductMutation();
  const [addProductMutation, { isLoading: isLoadingAdd }] =
    useAddProductMutation();
  const [deleteProductMutation, { isLoading: isLoadingDelete }] =
    useDeleteProductMutation();

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

  const handleCreateProduct = (values) => {
    addProductMutation(values)
      .unwrap()
      .then((data) => {
        setIsCreateModalVisible(false);
        refetch();
        notification.success({
          message: "Create product successfully",
        });
      })
      .catch((error) => {
        console.error("Error creating product: ", error);
      });
  };

  const handleUpdateProduct = (values) => {
    editProductMutation(values)
      .unwrap()
      .then((data) => {
        setIsUpdateModalVisible(false);
        refetch();
        notification.success({
          message: "Update product successfully",
        });
      })
      .catch((error) => {
        console.error("Error updating product: ", error);
      });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await deleteProductMutation(productId);
      refetch();
      notification.success({
        message: "Delete product successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalVisible(true);
  };

  const handleViewProductDetail = (product) => {
    setSelectedProductDetail(product);
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
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span className="tab-title">Product</span>} key="1">
          <ProductListCounter
            productData={productData}
            onEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
            onViewProductDetail={handleViewProductDetail}
          />
          <CreateProductModal
            visible={isCreateModalVisible}
            onCreate={handleCreateProduct}
            loading={isLoadingAdd}
            onCancel={() => setIsCreateModalVisible(false)}
          />
          {selectedProduct && (
            <UpdateProductModal
              visible={isUpdateModalVisible}
              onUpdate={handleUpdateProduct}
              onCancel={() => setIsUpdateModalVisible(false)}
              loading={isLoadingEdit}
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
        <TabPane
          tab={<span className="tab-title">Staff</span>}
          key="2"
        ></TabPane>
      </Tabs>
    </div>
  );
}
