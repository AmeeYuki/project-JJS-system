import React, { useState } from "react"; // Import React if not already imported

// Import the image file
import "./LoginFirstTime.css";
import { Alert, Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdatePasswordMutation } from "../../services/authAPI";
import { logout, selectAuth } from "../../slices/auth.slice";

function Login() {
  const [form] = Form.useForm(); // Sử dụng hook Form của Ant Design
  const [error, setError] = useState(null); // Khai báo state error
  // const [oldPassword, setOldPassword] = useState("");
  const auth = useSelector(selectAuth);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isLoadingUPdate }] = useUpdatePasswordMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [loginUser, { isLoading }] = useLoginUserMutation();

  // const handleSubmit = async (values) => {
  //   try {
  //     const result = await loginUser({
  //       email: values.email,
  //       password: values.password,
  //     });

  //     if (result.data && result.data.token) {
  //       dispatch(setUser(result.data));
  //       dispatch(setToken(result.data.token));
  //       localStorage.setItem("token", result.data.token);

  //       navigate("/");
  //       notification.success({
  //         message: "Login successfully",
  //         description: "Welcome to FAMS !",
  //       });
  //     } else {
  //       notification.error({
  //         message: "Login error",
  //         description: "Invalid email or password. Try again!",
  //       });
  //       form.resetFields(); // Xóa dữ liệu trong các ô input
  //     }
  //   } catch (error) {
  //     setError("An error occurred while attempting to log in");
  //   }
  // };

  const handleSubmit = async () => {
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    if (!confirmPassword.trim()) {
      setError("Confirm Password is required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Confirm Password does not match");
      return;
    }

    try {
      const response = await updatePassword({
        id: auth.id,
        password: password,
        retypePassword: confirmPassword,
      });
      console.log(response);

      if (response.error.originalStatus === 200) {
        setError("");
        form.resetFields();
        notification.success({
          message: "Update successfully",
          description: "Please try login",
        });
        dispatch(logout());
        navigate("/login");
      } else {
        // update không thành công

        form.resetFields();

        setError(response.error.data);
        notification.error({
          message: "Update unsuccessfully",
          description: "Please try again",
        });
      }
    } catch (error) {
      setError(error.message || "Failed to update password");
      notification.error({
        message: "Update error",
        description: "Failed to update password. Please try again!",
      });
    }

    // navigate("/");
  };

  return (
    <div className="login-first-time">
      <div className="login-space">
        <h1 className="title"> Luminary</h1>
        <h3 className="sub-title">
          Welcome Luminary, this is your first login. <br />
          Please change your password
        </h3>
        {/* <Form form={form} onFinish={handleSubmit}> */}
        <Form form={form} className="login-form" onFinish={handleSubmit}>
          {error && (
            <>
              <Alert message={error} type="error" showIcon />
              <br />
            </>
          )}
          {/* Hiển thị thông báo lỗi */}
          {/* <p>Old Password</p>
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please input your old password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter old password"
              className="form-input"
              value={oldPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item> */}
          <p>New Password</p>
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <p>Confirm Password</p>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter confirm password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              // loading={isLoading}
              className="submit-btn"
            >
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
