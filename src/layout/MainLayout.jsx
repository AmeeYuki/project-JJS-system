import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, ConfigProvider } from "antd";
import useSider from "@/hooks/useSider";
import { Link, useLocation } from "react-router-dom";
import HeaderPage from "../components/headerVsFooter/HeaderPage";
import FooterPage from "../components/headerVsFooter/FooterPage";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import "./MainLayout.css";

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
        <Sider width="20%" trigger={null} collapsible collapsed={collapsed}>
          <div
            style={{
              height: "100%",
              background: "#ffffff",
              flex: 1,
            }}
          >
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    iconSize: "20px",
                    itemHeight: "55px",
                    itemSelectedColor: "#ffffff",
                    itemSelectedBg: "#333333",
                    collapsedIconSize: "20px",
                  },
                },
                token: {
                  /* here is your global tokens */
                  motionDurationSlow: "0.1s",
                  // fontSize: "20px",
                  // collapsedIconSize: "20px",
                },
              }}
            >
              <Menu
                className="navigate"
                style={{
                  // borderRadius: borderRadiusLG,
                  height: "100%",
                  // boxShadow: other.boxShadow,
                  // borderRadius: "20px",
                  background: "#ffffff",
                  color: "#333333",
                  fontSize: "15px",

                  boxShadow: "box-shadow: 0px 3px 0px 3px rgba(0, 0, 0, 0.2);",
                }}
                theme="light"
                mode="inline"
                selectedKeys={[location.pathname.substring(1)]}
              >
                <div>
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 50,
                      height: 64,
                      color: "#333333",
                      marginLeft: "12px",
                    }}
                  />
                </div>
                {/* <div> */}
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
                            <Link
                              style={{ fontFamily: "Inter" }}
                              to={child.href}
                            >
                              {child.label}
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu.SubMenu>
                    );
                  } else {
                    return (
                      <Menu.Item key={item.href} icon={item.icon}>
                        <Link style={{ fontFamily: "Inter" }} to={item.href}>
                          {item.label}
                        </Link>
                      </Menu.Item>
                    );
                  }
                })}

                {!collapsed && ( // chỉ hiển thị khi không collapsed
                  <div className="menu-footer">
                    <Menu.ItemGroup style={{ textAlign: "center" }}>
                      Hello, Zane Pham
                    </Menu.ItemGroup>
                    <Menu.ItemGroup style={{ textAlign: "center" }}>
                      <LogoutButton />
                    </Menu.ItemGroup>
                    <Menu.ItemGroup style={{ textAlign: "center" }}>
                      <Link to={"/login"}>
                        <button>Login page (để tạm)</button>
                      </Link>
                    </Menu.ItemGroup>
                  </div>
                )}
              </Menu>
            </ConfigProvider>
          </div>
        </Sider>
        <Layout>
          <Content
            style={{
              width: "100%",
              // padding: "0 20px",
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
