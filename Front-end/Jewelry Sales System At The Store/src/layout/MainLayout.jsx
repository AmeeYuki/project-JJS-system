import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Avatar,
  Badge,
  Dropdown,
  Space,
} from "antd";
import useSider from "@/hooks/useSider";
import { Link, useLocation } from "react-router-dom";
import HeaderComponent from "../components/header/HeaderComponent";
import { Header } from "antd/es/layout/layout";

const { Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const dispatcher = useAppDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG, ...other },
  } = theme.useToken();
  const location = useLocation();

  const siderList = useSider();
  return (
    <>
      <Layout
        style={{
          height: "100vh",
        }}
      >
        <Layout>
          <Header style={{ display: "flex", alignItems: "center" }}>
            <div className="demo-logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={[
                ...siderList.map((item) => {
                  return {
                    ...item,
                    key: item.href,
                    label: <Link to={item.href}>{item.label}</Link>,
                  };
                }),
              ]}
              style={{ flex: 1, minWidth: 0 }}
            />
          </Header>
          <Content
            style={{
              display: "flex",
              margin: "16px 16px",
              padding: 12,
              minHeight: 280,
              background: other.colorBorderSecondary,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
        {/* <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            style={{
              height: "100%",
              padding: "16px",
              flex: 1,
            }}
          >
            <Menu
              style={{
                borderRadius: borderRadiusLG,
                height: "100%",
                boxShadow: other.boxShadow,
                background: other.colorBgBlur,
                color: other.colorTextLightSolid,
              }}
              theme="light"
              mode="inline"
              selectedKeys={[location.pathname.substring(1)]}
              items={[
                ...siderList.map((item) => {
                  return {
                    ...item,
                    key: item.href,
                    label: <Link to={item.href}>{item.label}</Link>,
                  };
                }),
              ]}
            />
          </div>
        </Sider>
        <Layout>
          <Content
            style={{
              display: "flex",
              margin: "16px 16px",
              padding: 12,
              minHeight: 280,
              background: other.colorBorderSecondary,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout> */}
      </Layout>
    </>
  );
};

export default MainLayout;
