import React, { useEffect, useState } from "react";
import "./User.css";
import { Input, Button, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
import ButtonCreate from "../../components/ButtonFilter/ButtonCreate";
import { useGetUsersQuery } from "../../services/userAPI";
import UserList from "./UserManage/UserList";
import CreateUserModal from "./UserManage/CreateUserModal";

export default function User() {
  const { data: users, isLoading, refetch } = useGetUsersQuery();
  const [userData, setUserData] = useState([]);
  const [originalUserData, setOriginalUserData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (users) {
      const indexedUsers = users.map((user, index) => ({
        ...user,
        index: index + 1,
      }));
      setUserData(indexedUsers);
      setOriginalUserData(indexedUsers);
    }
  }, [users]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (value) => {
    setSearchValue(value);
    const filteredData = originalUserData.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.phone.toLowerCase().includes(value.toLowerCase())
    );
    setUserData(
      filteredData.map((user, index) => ({ ...user, index: index + 1 }))
    );
  };

  // Hàm xử lý thay đổi giá trị của ô tìm kiếm
  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value === "") {
      setUserData(
        originalUserData.map((user, index) => ({ ...user, index: index + 1 }))
      );
    }
  };

  const handleCreateUser = (values) => {
    // Logic to create a user goes here
    console.log("New User Data: ", values);

    // Assuming an API call or other logic is used here to create the user
    // After successful creation, refetch or update the user list

    setUserData([
      ...userData,
      { ...values, index: userData.length + 1, id: new Date().getTime() },
    ]);
    setOriginalUserData([
      ...originalUserData,
      {
        ...values,
        index: originalUserData.length + 1,
        id: new Date().getTime(),
      },
    ]);
    setIsModalVisible(false);
  };

  return (
    <div className="user-manage-page">
      <div className="header">
        <h1 className="title">User Management</h1>
      </div>
      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name or phone number"
            prefix={<SearchOutlined />}
            value={searchValue}
            onChange={onChangeSearch}
            onPressEnter={() => handleSearch(searchValue)}
          />
          <ButtonFilter contentBtn={"Filter"} />
        </div>
        <div className="action-right">
          <div onClick={() => setIsModalVisible(true)}>
            <ButtonCreate contentBtn={"Create User"}></ButtonCreate>
          </div>
        </div>
      </div>
      <div className="user-list">
        <UserList userData={userData} />
      </div>
      <CreateUserModal
        visible={isModalVisible}
        onCreate={handleCreateUser}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
}
