import React, { useEffect, useState } from "react";
import "./User.css";
import { Input, message, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreate from "../../components/ButtonFilter/ButtonCreate";
import {
  useAddUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAllUserQuery,
} from "../../services/userAPI";
import UserList from "./UserManage/UserList";
import CreateUserModal from "./UserManage/CreateUserModal";
import UpdateUserModal from "./UserManage/UpdateUserModal";
import { CircularProgress } from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButton";
import { RiAddLine } from "@remixicon/react";
import SearchInput from "../../components/SearchInput/SearchInput";

export default function User() {
  const { data: users, isLoading, refetch } = useGetAllUserQuery();
  const [userData, setUserData] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [createUser, { isLoading: isLoadindCreate }] = useCreateUserMutation();

  const [editUserMutation, { isLoading: isLoadingEdit }] =
    useEditUserMutation();
  const [deleteUserMutation, { isLoading: isLoadingDelete }] =
    useDeleteUserMutation();

  const usersData = users?.users;
  useEffect(() => {
    if (users) {
      const indexedUsers = usersData?.map((user, index) => ({
        ...user,
        index: index + 1,
      }));
      setUserData(indexedUsers);
    }
  }, [users]);

  useEffect(() => {
    if (users) {
      const filteredUsers = usersData?.filter(
        (user) =>
          user.fullname.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.phone_number.includes(searchValue)
      );
      const indexedUsers = filteredUsers.map((user, index) => ({
        ...user,
        index: index + 1,
      }));
      setUserData(indexedUsers);
    }
  }, [searchValue, users]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleCreateUser = async (values) => {
    try {
      await createUser(values).unwrap();

      setIsCreateModalVisible(false);
      notification.success({
        message: "Create user successfully",
      });
      refetch(); // Refetch the user data
    } catch (error) {
      console.error("Error creating user: ", error);
      notification.error({
        message: "Failed to create user",
      });
    }
  };

  const handleUpdateUser = (values) => {
    editUserMutation(values)
      .unwrap()
      .then((data) => {
        setIsUpdateModalVisible(false);
        refetch();
        notification.success({
          message: "Update user successfully",
        });
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
      });
  };

  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUserMutation(userId);
      if (result.error.originalStatus == 200) {
        refetch();
        notification.success({
          message: "Delete user successfully",
        });
      } else {
        notification.error({
          message: "Delete user unsuccessfully",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsUpdateModalVisible(true);
  };

  return (
    <div className="user-manage-page">
      <div className="header">
        <h1 className="title">User Management</h1>
      </div>
      <div className="action">
        <div className="action-left">
          <SearchInput
            placeholder="Search by name or phone number"
            value={searchValue}
            onChange={onChangeSearch}
            onPressEnter={() => handleSearch(searchValue)}
          />
        </div>
        <div className="action-right">
          <div>
            <CustomButton
              icon={RiAddLine}
              text="Create User"
              iconSize="20px"
              iconColor="white"
              textColor="white"
              containerStyle={{
                backgroundColor: "#000000",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              iconPosition="left"
              loading={isLoadindCreate}
              fontSize="16px"
              padding="10px 10px"
              onClick={() => setIsCreateModalVisible(true)}
            />
          </div>
        </div>
      </div>
      <div className="user-list">
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
          <UserList
            userData={userData}
            onEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
          />
        )}
      </div>
      <CreateUserModal
        visible={isCreateModalVisible}
        onCreate={handleCreateUser}
        loading={isLoadindCreate}
        onCancel={() => setIsCreateModalVisible(false)}
      />
      {selectedUser && (
        <UpdateUserModal
          visible={isUpdateModalVisible}
          onUpdate={handleUpdateUser}
          onCancel={() => setIsUpdateModalVisible(false)}
          loading={isLoadingEdit}
          user={selectedUser}
        />
      )}
    </div>
  );
}
