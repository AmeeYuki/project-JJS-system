import React, { useEffect, useState } from "react"; // Import React if not already imported

// Import the image file
import "./Login.css";
import { Alert, Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginUserMutation } from "../../services/authAPI";
import { selectToken, setAuth, setToken } from "../../slices/auth.slice";

function Login() {
  const [form] = Form.useForm(); // Sử dụng hook Form của Ant Design
  const [error, setError] = useState(null); // Khai báo state error
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  //////////////////////////////////////// Dieu kien chuyen trang
  // useEffect(() => {
  // if (token) {
  // navigate("/");
  // }
  // }, [token, navigate]);

  const handleSubmit = async (values) => {
    try {
      const result = await loginUser({
        email: values.email,
        password: values.password,
      });

      if (result.data && result.data.token) {
        dispatch(setAuth(result.data));
        dispatch(setToken(result.data.token));
        // localStorage.setItem("token", result.data.token);
        console.log(result.data.first_login);
        if (result.data.first_login == true) {
          navigate("/login-first-time");
        } else {
          navigate("/");
        }

        notification.success({
          message: "Login successfully",
          description: "Welcome to FAMS !",
        });
      } else {
        notification.error({
          message: "Login error",
          description: "Invalid email or password. Try again!",
        });
        form.resetFields(); // Xóa dữ liệu trong các ô input
      }
    } catch (error) {
      setError("An error occurred while attempting to log in");
    }
  };

  return (
    <div className="login-page">
      <div className="img-background"></div>

      <div className="login-space">
        <h1 className="title"> Luminary</h1>
        <h3 className="sub-title">Hello, Let's Sign In</h3>
        <Form form={form} className="login-form" onFinish={handleSubmit}>
          {/* <Form form={form} className="login-form"> */}
          {error && (
            <>
              <Alert message={error} type="error" showIcon />
              <br />
            </>
          )}
          {/* Hiển thị thông báo lỗi */}
          <p>Email Address</p>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                // pattern: /^[\w-]+(\.[\w-]+)*@(gmail\.com|fpt\.edu\.vn)$/,
                message: "Please input valid Email!",
              },
            ]}
          >
            <Input
              type=""
              placeholder="your@email.com"
              className="form-input"
            />
          </Form.Item>
          <p>Password</p>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="form-input"
            />
          </Form.Item>
          <div className="forget-pass ">
            <p>
              <Link to={"/forget-password"}>Forget Password</Link>
            </p>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
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
