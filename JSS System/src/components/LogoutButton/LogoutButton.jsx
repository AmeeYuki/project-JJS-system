import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, ConfigProvider, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
export default function LogoutButton() {
  return (
    <div className="logout-btn">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#a6a6a6",
            colorTextLightSolid: "#000000",
          },
        }}
      >
        <Button style={{}} type="primary" icon={<LogoutIcon fontSize="15px" />}>
          Logout
        </Button>
      </ConfigProvider>
    </div>
  );
}
