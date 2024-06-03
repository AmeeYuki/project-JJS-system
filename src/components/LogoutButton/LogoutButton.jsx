import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, ConfigProvider, notification } from "antd";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/auth.slice";
export default function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    notification.success({
      message: "Logout successfully",
      description: "See you again!",
    });
  };
  return (
    <div className="logout-btn" onClick={handleLogout}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#a6a6a6",
            colorTextLightSolid: "#000000",
          },
        }}
      >
        {/* <Button style={{}} type="primary" icon={<LogoutIcon fontSize="15px" />}> */}
        Logout
        {/* </Button> */}
      </ConfigProvider>
    </div>
  );
}
