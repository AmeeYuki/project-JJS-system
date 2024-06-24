import React from "react";
import "./Policy.css";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, ConfigProvider } from "antd";
import PolicyList from "./PolicyList";
import { useGetAllPolicyQuery } from "../../services/customerAPI";

export default function Policy() {
  const { data: policys, isLoading, refetch } = useGetAllPolicyQuery();
  console.log(policys);
  return (
    <div className="policy-page">
      <div className="header">
        <h3 className="title">Customer Policy</h3>
      </div>
      <div className="action">
        <div className="action-left">
          <ConfigProvider
            theme={{
              token: {
                borderRadius: 20,
              },
            }}
          >
            <AutoComplete
              style={{ width: 300 }}
              placeholder={
                <i
                  style={{
                    color: "#2D3748",
                    fontWeight: "500",
                    fontSize: "12px",
                  }}
                >
                  <SearchOutlined
                    style={{
                      marginRight: "0.5rem",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  />{" "}
                  Search by name or phone....
                </i>
              }
              optionLabelProp="text"
            />
          </ConfigProvider>
        </div>
        <div className="action-right">aaaa</div>
      </div>
      <div className="policy-list">
        <PolicyList policyData={policys} isLoading={isLoading} />
      </div>
    </div>
  );
}
