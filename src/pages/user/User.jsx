// import React, { useEffect, useState } from "react";
// import "./User.css";
// import {
//   AutoComplete,
//   ConfigProvider,
//   Input,
//   message,
//   notification,
// } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import ButtonCreate from "../../components/ButtonFilter/ButtonCreate";
// import {
//   useActiveUserMutation,
//   useCreateUserMutation,
//   useDeleteUserMutation,
//   useEditUserMutation,
//   useGetAllUserQuery,
//   useInactiveUserMutation,
// } from "../../services/userAPI";
// import UserList from "./UserManage/UserList";
// import CreateUserModal from "./UserManage/CreateUserModal";
// import UpdateUserModal from "./UserManage/UpdateUserModal";
// import { CircularProgress } from "@mui/material";
// import CustomButton from "../../components/CustomButton/CustomButton";
// import { RiAddLine } from "@remixicon/react";
// import dayjs from "dayjs";

// export default function User() {
//   const { data: users, isLoading, refetch } = useGetAllUserQuery();
//   const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
//   const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [searchValue, setSearchValue] = useState("");
//   const [createUser, { isLoading: isLoadindCreate }] = useCreateUserMutation();
//   const [editUserMutation, { isLoading: isLoadingEdit }] =
//     useEditUserMutation();
//   const [deleteUserMutation, { isLoading: isLoadingDelete }] =
//     useDeleteUserMutation();
//   const [activeUserMutation, { isLoading: isLoadingActive }] =
//     useActiveUserMutation();
//   const [inactiveUserMutation, { isLoading: isLoadingInactive }] =
//     useInactiveUserMutation();

//   const handleCreateUser = async (values) => {
//     console.log(values);
//     const phoneNumber = values.phone;
//     if (phoneNumber.charAt(0) !== "0") {
//       notification.error({
//         message: "Phone number not valid",
//       });
//       return;
//     }
//     const dob = values.dob;
//     const eighteenYearsAgo = dayjs().subtract(18, "years").unix();
//     // console.log(dob);
//     // console.log(eighteenYearsAgo);
//     if (dob > eighteenYearsAgo) {
//       notification.error({
//         message: "The user is under 18 years old.",
//       });
//       return; // Kết thúc hàm nếu người dùng chưa đủ 18 tuổi
//     }

//     try {
//       const response = await createUser(values);
//       console.log(response);
//       if (response.data) {
//         setIsCreateModalVisible(false);
//         notification.success({
//           message: response.data.message,
//         });
//         refetch(); // Refetch the user data
//       } else {
//         notification.error({
//           message: "Failed to create user",
//           description: response.error.data,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       notification.error({
//         message: "Failed to create user",
//         // description: error,
//       });
//     }
//   };

//   const handleUpdateUser = async (values) => {
//     try {
//       const response = editUserMutation(values);
//       setIsCreateModalVisible(false);
//       notification.success({
//         message: "Update user successfully",
//       });
//       setIsUpdateModalVisible(false);
//       refetch(); // Refetch the user data
//     } catch (error) {
//       console.error("Error creating user: ", error);
//       notification.error({
//         message: "Update user unsuccessfully",
//         description: error,
//       });
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     const result = await deleteUserMutation(userId);
//     console.log(result);

//     if (result.error.originalStatus == 200) {
//       refetch();
//       notification.success({
//         message: "Delete user successfully",
//       });
//     } else {
//       notification.error({
//         message: "Delete user unsuccessfully",
//       });
//     }
//   };

//   const handleActiveUser = async (userId) => {
//     const result = await activeUserMutation(userId);

//     if (result.error.originalStatus == 200) {
//       refetch();
//       notification.success({
//         message: "User activated successfully",
//       });
//     } else {
//       notification.error({
//         message: "User activated unsuccessfully",
//       });
//     }
//   };

//   const handleInactiveUser = async (userId) => {
//     const result = await inactiveUserMutation(userId);
//     if (result.error.originalStatus == 200) {
//       refetch();
//       notification.success({
//         message: "User inactivated successfully",
//       });
//     } else {
//       notification.error({
//         message: "User inactivated unsuccessfully",
//       });
//     }
//   };

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     setIsUpdateModalVisible(true);
//   };

//   const handleSearch = (value) => {
//     setSearchValue(value);
//     console.log(value);
//   };

//   return (
//     <div className="user-manage-page">
//       <div className="header">
//         <h1 className="title">User Management</h1>
//       </div>
//       <div className="action">
//         <div className="action-left">
//           <ConfigProvider
//             theme={{
//               token: {
//                 borderRadius: 20,
//               },
//             }}
//           >
//             <AutoComplete
//               style={{ width: 300 }}
//               value={searchValue}
//               onSearch={handleSearch}
//               placeholder={
//                 <i
//                   style={{
//                     color: "#2D3748",
//                     fontWeight: "500",
//                     fontSize: "12px",
//                   }}
//                 >
//                   <SearchOutlined
//                     style={{
//                       marginRight: "0.5rem",
//                       fontSize: "15px",
//                       fontWeight: "500",
//                     }}
//                   />{" "}
//                   Search by name or phone....
//                 </i>
//               }
//               optionLabelProp="text"
//             />
//           </ConfigProvider>
//         </div>
//         <div className="action-right">
//           <div>
//             <CustomButton
//               icon={RiAddLine}
//               text="Create User"
//               iconSize="20px"
//               iconColor="white"
//               textColor="white"
//               containerStyle={{
//                 backgroundColor: "#000000",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//               }}
//               iconPosition="left"
//               loading={isLoadindCreate}
//               fontSize="16px"
//               padding="10px 10px"
//               onClick={() => setIsCreateModalVisible(true)}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="user-list">
//         {isLoading ? (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//             }}
//           >
//             <CircularProgress />
//           </div>
//         ) : (
//           <UserList
//             rawUserData={users}
//             onEditUser={handleEditUser}
//             handleDeleteUser={handleDeleteUser}
//             handleActiveUser={handleActiveUser}
//             handleInactiveUser={handleInactiveUser}
//             searchValue={searchValue}
//           />
//         )}
//       </div>
//       <CreateUserModal
//         visible={isCreateModalVisible}
//         onCreate={handleCreateUser}
//         loading={isLoadindCreate}
//         onCancel={() => setIsCreateModalVisible(false)}
//       />
//       {selectedUser && (
//         <UpdateUserModal
//           visible={isUpdateModalVisible}
//           onUpdate={handleUpdateUser}
//           onCancel={() => setIsUpdateModalVisible(false)}
//           loading={isLoadingEdit}
//           user={selectedUser}
//         />
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import "./User.css";
import { AutoComplete, ConfigProvider, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  useActiveUserMutation,
  useCreateUserMutation,
  useEditUserMutation,
  useGetAllUserQuery,
  useInactiveUserMutation,
} from "../../services/userAPI";
import UserList from "./UserManage/UserList";
import CreateUserModal from "./UserManage/CreateUserModal";
import UpdateUserModal from "./UserManage/UpdateUserModal";
import { CircularProgress } from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButton";
import { RiAddLine } from "@remixicon/react";
import dayjs from "dayjs";

export default function User() {
  const { data: users, isLoading, refetch } = useGetAllUserQuery();

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [createUser, { isLoading: isLoadingCreate }] = useCreateUserMutation();
  const [editUserMutation, { isLoading: isLoadingEdit }] =
    useEditUserMutation();
  const [activeUserMutation, { isLoading: isLoadingActive }] =
    useActiveUserMutation();
  const [inactiveUserMutation, { isLoading: isLoadingInactive }] =
    useInactiveUserMutation();

  const handleCreateUser = async (values) => {
    const phoneNumber = values.phone;
    if (phoneNumber.charAt(0) !== "0") {
      notification.error({
        message: "Phone number not valid",
      });
      return;
    }

    const dob = values.dob;
    const eighteenYearsAgo = dayjs().subtract(18, "years").unix();
    if (dob > eighteenYearsAgo) {
      notification.error({
        message: "The user is under 18 years old.",
      });
      return;
    }

    try {
      const response = await createUser(values);
      if (response.data) {
        setIsCreateModalVisible(false);
        notification.success({
          message: response.data.message,
        });
        refetch();
      } else {
        notification.error({
          message: "Failed to create user",
          description: response.error.data,
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Failed to create user",
      });
    }
  };

  const handleUpdateUser = async (values) => {
    try {
      const response = await editUserMutation(values);
      if (response.data) {
        notification.success({
          message: "Update user successfully",
        });
        setIsUpdateModalVisible(false);
        refetch();
      } else {
        notification.error({
          message: "Update user unsuccessfully",
          description: response.error.data,
        });
      }
    } catch (error) {
      console.error("Error updating user: ", error);
      notification.error({
        message: "Update user unsuccessfully",
        description: error.message,
      });
    }
  };

  const handleActiveUser = async (userId) => {
    try {
      const result = await activeUserMutation(userId);
      if (result.data) {
        refetch();
        notification.success({
          message: "User activated successfully",
        });
      } else {
        notification.error({
          message: "User activation unsuccessful",
          description: result.error.data,
        });
      }
    } catch (error) {
      console.error("Error activating user: ", error);
      notification.error({
        message: "User activation unsuccessful",
      });
    }
  };

  const handleInactiveUser = async (userId) => {
    try {
      const result = await inactiveUserMutation(userId);
      if (result.data) {
        refetch();
        notification.success({
          message: "User inactivated successfully",
        });
      } else {
        notification.error({
          message: "User inactivation unsuccessful",
          description: result.error.data,
        });
      }
    } catch (error) {
      console.error("Error inactivating user: ", error);
      notification.error({
        message: "User inactivation unsuccessful",
      });
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsUpdateModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="user-manage-page">
      <div className="header">
        <h1 className="title">User Management</h1>
      </div>
      <div className="action">
        <div className="action-left">
          <ConfigProvider
            theme={{
              token: {
                borderRadius: 20,
              },
            }}
          >
            <AutoComplete
              style={{ width: 300 }}
              value={searchValue}
              onSearch={handleSearch}
              placeholder={
                <i
                  style={{
                    color: "#2D3748",
                    fontWeight: "500",
                    fontSize: "12px",
                  }}
                >
                  <SearchOutlined
                    style={{
                      marginRight: "0.5rem",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  />{" "}
                  Search by name or phone...
                </i>
              }
              optionLabelProp="text"
            />
          </ConfigProvider>
        </div>
        <div className="action-right">
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
            loading={isLoadingCreate}
            fontSize="16px"
            padding="10px 10px"
            onClick={() => setIsCreateModalVisible(true)}
          />
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
            rawUserData={users}
            onEditUser={handleEditUser}
            handleActiveUser={handleActiveUser}
            handleInactiveUser={handleInactiveUser}
            searchValue={searchValue}
          />
        )}
      </div>
      <CreateUserModal
        visible={isCreateModalVisible}
        onCreate={handleCreateUser}
        loading={isLoadingCreate}
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
