import React, { useState } from "react";
import "./Policy.css";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, ConfigProvider } from "antd";
import PolicyList from "./PolicyList";
import { useGetAllPolicyQuery } from "../../services/customerAPI";
import { useEffect } from "react";

export default function Policy() {
  const { data: policies, isLoading, refetch } = useGetAllPolicyQuery();
  const [filteredPolicies, setFilteredPolicies] = useState(null);

  useEffect(() => {
    if (policies) {
      // Sort policies by createdDate
      const sortedPolicies = [...policies].sort((a, b) => a.id - b.id);
      setFilteredPolicies(sortedPolicies);
    }
  }, [policies]);

  const handleRefetch = () => {
    refetch();
  };

  const handleSearch = (value) => {
    if (!value) {
      setFilteredPolicies(policies); // Reset filtered policies if search value is empty
      return;
    }

    const lowerCaseValue = value.toLowerCase();
    const filtered = policies.filter((policy) =>
      policy.customer.fullName.toLowerCase().includes(lowerCaseValue)
    );

    // Sort filtered policies by createdDate
    const sortedFiltered = [...filtered].sort((a, b) => a.id - b.id);
    setFilteredPolicies(sortedFiltered);
  };

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
                  Search by name
                </i>
              }
              optionLabelProp="text"
              onSearch={handleSearch}
            />
          </ConfigProvider>
        </div>
        <div className="action-right"></div>
      </div>
      <div className="policy-list">
        <PolicyList
          policyData={filteredPolicies || policies}
          isLoading={isLoading}
          handleRefetch={handleRefetch}
        />
      </div>
    </div>
  );
}
