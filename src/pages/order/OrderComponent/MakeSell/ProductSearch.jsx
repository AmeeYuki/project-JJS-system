import React from "react";
import { ConfigProvider, Input } from "antd";

const { Search } = Input;

const ProductSearch = ({ setSearchTerm }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: "6px",
        },
      }}
    >
      <Search
        style={{ width: "400px" }}
        placeholder="Search by product name"
        onSearch={(value) => setSearchTerm(value)}
        enterButton
      />
    </ConfigProvider>
  );
};

export default ProductSearch;
