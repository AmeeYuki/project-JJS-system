import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import useSider from "@/hooks/useSider";
import { Link, useLocation } from "react-router-dom";
import HeaderPage from "../components/header/HeaderPage";
import FooterPage from "../components/header/FooterPage";

const { Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const dispatcher = useAppDispatch();

  const location = useLocation();

  const siderList = useSider();
  return (
    <>
      <HeaderPage />
      <Layout
        style={{
          background: "#ffffff",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <Sider width="18%" trigger={null} collapsible collapsed={collapsed}>
          <div
            style={{
              height: "100%",
              background: "#ffffff",
              flex: 1,
            }}
          >
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 50,
                  height: 64,
                  color: "#285D9A",
                  marginLeft: "10px",
                }}
              />
            </div>
            <Menu
              className="navigate"
              style={{
                // borderRadius: borderRadiusLG,
                // height: "90%",
                // boxShadow: other.boxShadow,
                borderRadius: "20px",

                background: "#cccccc",
                // color: "#285D9A",
              }}
              theme="light"
              mode="inline"
              selectedKeys={[location.pathname.substring(1)]}
            >
              {siderList.map((item) => {
                if (item.children && item.children.length > 0) {
                  return (
                    <Menu.SubMenu
                      key={item.label}
                      icon={item.icon}
                      title={item.label}
                    >
                      {item.children.map((child) => (
                        <Menu.Item key={child.href}>
                          <Link to={child.href}>{child.label}</Link>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  );
                } else {
                  return (
                    <Menu.Item key={item.href} icon={item.icon}>
                      <Link to={item.href}>{item.label}</Link>
                    </Menu.Item>
                  );
                }
              })}
            </Menu>
          </div>
        </Sider>
        <Layout>
          <Content
            style={{
              width: "100%",
              padding: "0 20px",
              background: "#ffffff",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <FooterPage />
    </>
  );
};

export default MainLayout;
