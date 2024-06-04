import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";

export default function SearchInput({ placeholder }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: "#000000",
          colorPrimaryHover: "#000000",
        },
      }}
    >
      <Input
        style={{ borderRadius: 20, width: "350px" }}
        size="large"
        placeholder={placeholder}
        prefix={<SearchOutlined />}
      />
    </ConfigProvider>
  );
}
