import React, { useEffect, useState } from "react";
import "./User.css";
import { Input, message, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreate from "../../components/ButtonFilter/ButtonCreate";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAllUserQuery,
} from "../../services/userAPI";
import UserList from "./UserManage/UserList";
import CreateUserModal from "./UserManage/CreateUserModal";
import UpdateUserModal from "./UserManage/UpdateUserModal";
import { CircularProgress } from "@mui/material";

export default function User() {
  const { data: users, isLoading, refetch } = useGetAllUserQuery();
  const [userData, setUserData] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [editUserMutation, { isLoading: isLoadingEdit }] =
    useEditUserMutation();
  const [addUserMutation, { isLoading: isLoadingAdd }] = useAddUserMutation();
  const [deleteUserMutation, { isLoading: isLoadingDelete }] =
    useDeleteUserMutation();

  const usersData = users?.users;
  console.log(usersData);
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
          user.phone.includes(searchValue)
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

  const handleCreateUser = (values) => {
    addUserMutation(values)
      .unwrap()
      .then((data) => {
        setIsCreateModalVisible(false);
        refetch();
        notification.success({
          message: "Create user successfully",
        });
      })

      .catch((error) => {
        console.error("Error creating user: ", error);
      });
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
      refetch();
      notification.success({
        message: "Delete user successfully",
      });
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
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name or phone number"
            prefix={<SearchOutlined />}
            value={searchValue}
            onChange={onChangeSearch}
            onPressEnter={() => handleSearch(searchValue)}
          />
        </div>
        <div className="action-right">
          <div onClick={() => setIsCreateModalVisible(true)}>
            <ButtonCreate contentBtn={"Create User"} loading={isLoadingAdd} />
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
        loading={isLoadingAdd}
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
