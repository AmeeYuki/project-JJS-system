import React, { useEffect, useState } from "react"; // Import React
import "./Login.css";
import { Alert, Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../slices/auth.slice";
import {
  useChangePasswordByEmailMutation,
  useVerifyMailMutation,
  useVerifyOtpMutation,
} from "../../services/authAPI";

function Login() {
  const [form] = Form.useForm(); // Sử dụng hook Form của Ant Design
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null); // Khai báo state error
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyEmail, setVerifyEmail] = useState(false); // Khai báo state error
  const [verifyOTP, setVerifyOTP] = useState(false); // Khai báo state error
  const [verifyMail, { isLoading: isVerifyingMail }] = useVerifyMailMutation();
  const [verifyOTPByMail, { isLoading: isVerifyOTPByMail }] =
    useVerifyOtpMutation();
  const [changePasswordByEmail, { isLoading: isChangePasswordByEmail }] =
    useChangePasswordByEmailMutation();

  const [isLoading, setIsLoading] = useState(false);

  // const handleVerifyEmail = () => {
  //   // console.log(email);
  //   setVerifyEmail(true);
  // };

  const handleVerifyEmail = async () => {
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setIsLoading(true); // Đặt trạng thái loading thành true khi bắt đầu gửi email

      const response = await verifyMail({ email });
      if (response.error.originalStatus === 200) {
        setError(null);
        notification.success({
          message: "Send mail successfully",
          description: "Please check your mail and input your OTP",
        });
        setVerifyEmail(true);
      } else {
        // Xác minh email không thành công
        setError("Failed to send mail, try again in 2 minutes");
      }
    } catch (error) {
      // Lỗi khi gửi yêu cầu API
      setError("Failed to send mail: " + error.message);
    } finally {
      setIsLoading(false); // Đặt trạng thái loading thành false sau khi hoàn thành
    }
  };

  const handleVerifyOTP = async () => {
    // setVerifyOTP(true);
    console.log("OTP submitted:", otp); // This will be a number

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }
    try {
      setIsLoading(true); // Đặt trạng thái loading thành true khi bắt đầu gửi email

      const response = await verifyOTPByMail({ email, otp });
      if (response.error.originalStatus === 200) {
        setError(null);
        notification.success({
          message: "Send OTP successfully",
          description: "Please change your new password",
        });
        setVerifyOTP(true);
      } else {
        // Xác minh email không thành công
        setError("Failed to send OTP, try again");
        // setVerifyEmail(false);
      }
    } catch (error) {
      // Lỗi khi gửi yêu cầu API
      setError("Failed to send OTP: " + error.message);
    } finally {
      setIsLoading(false); // Đặt trạng thái loading thành false sau khi hoàn thành
    }
  };

  const handleChangePassword = async (e) => {
    // e.preventDefault();
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
      setIsLoading(true); // Đặt trạng thái loading thành true khi bắt đầu gửi email

      const response = await changePasswordByEmail({
        email,
        password,
        confirmPassword,
      });
      if (response.error.originalStatus === 200) {
        setError(null);
        notification.success({
          message: "Change password successful",
          description: "Please login!",
        });
        setVerifyEmail(false);
        setVerifyOTP(false);
        navigate("/login");
      } else {
        // Xác minh email không thành công
        setError("Failed to change, try again");
        // setVerifyEmail(false);
      }
    } catch (error) {
      // Lỗi khi gửi yêu cầu API
      setError("Failed to change: " + error.message);
    } finally {
      setIsLoading(false); // Đặt trạng thái loading thành false sau khi hoàn thành
    }
  };

  return (
    <div className="login-page">
      <div className="img-background"></div>

      <div className="login-space">
        <h1 className="title"> Luminary</h1>
        <h3 className="sub-title">Forgotten Password</h3>

        {!verifyEmail && (
          <Form form={form} className="login-form" onFinish={handleVerifyEmail}>
            {error && (
              <>
                <Alert message={error} type="error" showIcon />
                <br />
              </>
            )}
            <p>Email Address</p>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  pattern: /^[\w-]+(\.[\w-]+)*@(gmail\.com|fpt\.edu\.vn)$/,
                  message: "Please input valid Email!",
                },
              ]}
            >
              <Input
                type=""
                placeholder="your@email.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-btn"
                loading={isLoading}
              >
                Verify Email
              </Button>
            </Form.Item>
          </Form>
        )}
        {verifyEmail && !verifyOTP && (
          <Form form={form} className="login-form" onFinish={handleVerifyOTP}>
            {error && (
              <>
                <Alert message={error} type="error" showIcon />
                <br />
              </>
            )}
            <p>OTP</p>
            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please input OTP!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="your OTP"
                className="form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-btn"
                loading={isLoading}
              >
                Verify OTP
              </Button>
            </Form.Item>
          </Form>
        )}

        {verifyEmail && verifyOTP && (
          <Form
            form={form}
            className="login-form"
            onFinish={handleChangePassword}
          >
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
            {error && (
              <>
                <Alert message={error} type="error" showIcon />
                <br />
              </>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-btn"
                loading={isLoading}
              >
                Change your password
              </Button>
            </Form.Item>
          </Form>
        )}

        <div className="back-to-login">
          <p>
            <Link to={"/login"}>Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
