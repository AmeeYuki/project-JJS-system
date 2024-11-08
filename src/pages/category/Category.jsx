import React, { useEffect, useState } from "react";
import "./Category.css";
import { Input, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  useGetTypesQuery,
  useAddTypeMutation,
  useEditTypeMutation,
} from "../../services/typeAPI";
import CategoryList from "./CategoryManage/CategoryList";
import UpdateCategoryModal from "./CategoryManage/UpdateCategoryModal";
import CreateCategoryModal from "./CategoryManage/CreateCategoryModal";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { RiAddLine } from "@remixicon/react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";

export default function Category() {
  const { data: categories, isLoading, refetch } = useGetTypesQuery();
  const [categoryData, setCategoryData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const auth = useSelector(selectAuth);

  const [addTypeMutation, { isLoading: isLoadingAdd }] = useAddTypeMutation();
  const [editTypeMutation, { isLoading: isLoadingEdit }] =
    useEditTypeMutation();

  useEffect(() => {
    if (categories) {
      const indexedCategories = categories.map((category, index) => ({
        ...category,
        index: index + 1,
      }));
      setCategoryData(indexedCategories);
    }
  }, [categories]);

  useEffect(() => {
    if (categories) {
      let filteredCategories = [...categories];
      if (searchValue) {
        filteredCategories = categories.filter((category) =>
          category.type?.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      filteredCategories.sort((a, b) => a.id - b.id);
      const indexedCategories = filteredCategories.map((category, index) => ({
        ...category,
        index: index + 1,
      }));
      setCategoryData(indexedCategories);
    }
  }, [searchValue, categories]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleUpdateCategory = (values) => {
    editTypeMutation(values)
      .unwrap()
      .then((data) => {
        setIsUpdateModalVisible(false);
        refetch();
        notification.success({
          message: "Update category successfully",
        });
      })
      .catch((error) => {
        console.error("Error updating category: ", error);
      });
  };

  const handleAddCategory = (values) => {
    addTypeMutation(values)
      .unwrap()
      .then((data) => {
        setIsAddModalVisible(false);
        refetch();
      })
      .catch((error) => {
        console.error("Error adding category: ", error);
      });
  };

  const navigate = useNavigate();

  const changePageProduct = () => {
    navigate("/product");
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsUpdateModalVisible(true);
  };

  return (
    <div className="category-manage-page">
      <div className="header">
        <h1 className="title">Type Management</h1>
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
        </div>

        <div className="action-right">
          {auth?.roles?.some((role) => role === "ROLE_STAFF") ? null : (
            <>
              <CustomButton
                icon={RiAddLine}
                text="Add Type"
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
                onClick={() => setIsAddModalVisible(true)}
              />
            </>
          )}

          <CustomButton
            text="View Products"
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
            onClick={changePageProduct}
          />
        </div>
      </div>
      <div className="category-list">
        {!isLoading && categoryData.length > 0 ? (
          <CategoryList
            categoryData={categoryData}
            onEditCategory={handleEditCategory}
          />
        ) : (
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
        )}
      </div>
      {selectedCategory && (
        <UpdateCategoryModal
          visible={isUpdateModalVisible}
          onUpdate={handleUpdateCategory}
          onCancel={() => setIsUpdateModalVisible(false)}
          loading={isLoadingEdit}
          category={selectedCategory}
          existingCategories={categories}
        />
      )}
      <CreateCategoryModal
        visible={isAddModalVisible}
        onCreate={handleAddCategory}
        onCancel={() => setIsAddModalVisible(false)}
        loading={isLoadingAdd}
        categories={categories}
      />
    </div>
  );
}
