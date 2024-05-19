import React from "react";
import "./User.css";
import { Button, Input, Space, Table, Tag } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
import ButtonCreate from "../../components/ButtonFilter/ButtonCreate";
import UserList from "./UserList";
export default function User() {
  //Fuction

  //Data Table ----------------------------------------------------
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  //Data Table-------------------------------------------------

  return (
    <div className="user-manage-page">
      <div className="header">
        <h1 className="title">User Management</h1>
      </div>
      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name or phone number "
            prefix={<SearchOutlined />}
          />
          <ButtonFilter contentBtn={"Filter"} />
        </div>
        <div className="action-right">
          <ButtonCreate contentBtn={"Create User"} />
        </div>
      </div>
      <div className="user-list">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}
