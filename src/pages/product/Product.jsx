import React, { useEffect, useState } from "react";
import "./Product.css";
import { Input, message, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} from "../../services/productAPI";
import ProductList from "./ProductManage/ProductList";
import CreateProductModal from "./ProductManage/CreateProductModal";
import UpdateProductModal from "./ProductManage/UpdateProductModal";
import { CircularProgress } from "@mui/material";
import { RiAddLine, RiFilter3Line } from "@remixicon/react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Navigate, useNavigate } from "react-router-dom";
import FilterProductModal from "./ProductManage/FilterProductModal";
import ViewDetailProductModal from "./ProductManage/ViewDetailProductModal";

export default function Product() {
  const { data: productsData, isLoading, refetch } = useGetProductsQuery();
  const [productData, setProductData] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);

  const [editProductMutation, { isLoading: isLoadingEdit }] =
    useEditProductMutation();
  const [addProductMutation, { isLoading: isLoadingAdd }] =
    useAddProductMutation();
  const [deleteProductMutation, { isLoading: isLoadingDelete }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (productsData) {
      const { products } = productsData;
      const indexedProducts = products.map((product, index) => ({
        ...product,
        index: index + 1,
      }));
      setProductData(indexedProducts);
    }
  }, [productsData]);

  useEffect(() => {
    if (productsData) {
      const { products } = productsData;
      const filteredProducts = products.filter(
        (product) =>
          (product.product_name &&
            product.product_name
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (product.barcode && product.barcode.includes(searchValue))
      );
      const sortedProducts = filteredProducts.sort((a, b) => a.id - b.id);
      const indexedProducts = sortedProducts.map((product, index) => ({
        ...product,
        index: index + 1,
      }));
      setProductData(indexedProducts);
    }
  }, [searchValue, productsData]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleCreateProduct = (values) => {
    addProductMutation(values)
      .unwrap()
      .then(() => {
        setIsCreateModalVisible(false);
        refetch();
        notification.success({
          message: "Create product successfully",
        });
      })
      .catch((error) => {
        console.error("Error creating product: ", error);
        notification.error({
          message: "Create product unsuccessfully",
        });
      });
  };

  const handleUpdateProduct = (values) => {
    editProductMutation(values)
      .unwrap()
      .then(() => {
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
    setIsUpdateModalVisible(true);
  };

  const navigate = useNavigate();

  const changePageCategory = () => {
    navigate("/category");
  };

  const handleFilterModalCancel = () => {
    setIsFilterModalVisible(false);
  };

  const handleApplyFilter = (selectedTypes) => {
    if (selectedTypes.length === 0) {
      setProductData(productsData.products);
    } else {
      const filteredProducts = productsData.products.filter((product) => {
        return selectedTypes.includes(product.type.type);
      });
      setProductData(filteredProducts);
    }
    setIsFilterModalVisible(false);
  };

  const handleViewProductDetail = (product) => {
    setSelectedProductDetail(product);
  };

  const handleExportFile = () => {
    if (!productsData || !productsData.products) {
      console.error("Products data is null or undefined:", productsData);
      return;
    }

    const columns = [
      "Product Name",
      "Barcode",
      "Quantity",
      "Processing Price",
      "Stone Price",
      "Weight",
      "Weight Unit",
      "Description",
      "Buy Price per Gram",
      "Sell Price per Gram",
      "Type",
      "Image URL",
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [columns.join(",")]
        .concat(
          productsData.products.map((product) =>
            [
              product.product_name,
              product.barcode,
              product.quantity,
              product.price_processing,
              product.price_stone,
              product.weight,
              product.weight_unit,
              product.description,
              product.type.buy_price_per_gram,
              product.type.sell_price_per_gram,
              product.type.type,
              product.image_url,
            ].join(",")
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="product-manage-page">
      <div className="header">
        <h1 className="title">Product Management</h1>
      </div>
      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name"
            prefix={<SearchOutlined />}
            value={searchValue}
            onChange={onChangeSearch}
            onPressEnter={() => handleSearch(searchValue)}
          />
          <CustomButton
            icon={RiFilter3Line}
            text="Filter"
            iconSize="16px"
            iconColor="white"
            textColor="white"
            containerStyle={{
              backgroundColor: "#333333",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            hoverStyle={{
              opacity: 0.6,
            }}
            iconPosition="left"
            fontSize="14px"
            padding="10px 10px"
            onClick={() => setIsFilterModalVisible(true)}
          />
        </div>
        <div className="action-right">
          <CustomButton
            icon={RiAddLine}
            text="Import file"
            iconSize="16px"
            iconColor="white"
            textColor="white"
            containerStyle={{
              backgroundColor: "#333333",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            hoverStyle={{
              opacity: 0.6,
            }}
            iconPosition="left"
            fontSize="16px"
            padding="10px 20px"
          />
          <CustomButton
            icon={RiAddLine}
            text="Add Product"
            iconSize="16px"
            iconColor="white"
            textColor="white"
            containerStyle={{
              backgroundColor: "#333333",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            hoverStyle={{
              opacity: 0.6,
            }}
            iconPosition="left"
            fontSize="16px"
            padding="10px 20px"
            onClick={() => setIsCreateModalVisible(true)}
          />

          <CustomButton
            icon={RiAddLine}
            text="Export file"
            iconSize="16px"
            iconColor="white"
            textColor="white"
            containerStyle={{
              backgroundColor: "#333333",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            hoverStyle={{
              opacity: 0.6,
            }}
            iconPosition="left"
            fontSize="16px"
            padding="10px 20px"
            onClick={handleExportFile}
          />

          <CustomButton
            text="View Types"
            iconSize="16px"
            iconColor="white"
            textColor="white"
            containerStyle={{
              backgroundColor: "#333333",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            hoverStyle={{
              opacity: 0.6,
            }}
            iconPosition="left"
            fontSize="16px"
            padding="10px 15px"
            onClick={changePageCategory}
          />
        </div>
      </div>
      <div className="product-list">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <ProductList
            productData={productData.filter(
              (product) =>
                !product.deleted &&
                !localStorage.getItem(`deleted_product_${product.id}`)
            )}
            onEditProduct={handleEditProduct}
            handleDeleteProduct={handleDeleteProduct}
            onViewProductDetail={handleViewProductDetail}
          />
        )}
      </div>
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

      <FilterProductModal
        visible={isFilterModalVisible}
        onCancel={handleFilterModalCancel}
        onApply={handleApplyFilter}
      />
    </div>
  );
}
