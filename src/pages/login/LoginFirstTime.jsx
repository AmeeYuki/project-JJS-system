import React, { useState } from "react"; // Import React if not already imported

// Import the image file
import "./LoginFirstTime.css";
import { Alert, Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  const [form] = Form.useForm(); // Sử dụng hook Form của Ant Design
  const [error, setError] = useState(null); // Khai báo state error
  const [oldPassword, setOldPassword] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = () => {
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

    navigate("/");
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
          <p>Old Password</p>
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
          </Form.Item>
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
              placeholder="Enter password"
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
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
