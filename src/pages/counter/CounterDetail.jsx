import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React from "react";
import { useParams } from "react-router-dom";

export default function CounterDetail() {
  const { id, counterName, location } = useParams();
  return (
    <div>
      <h1>Counter Information</h1>
      <p>Counter ID: {id}</p>
      <p>Counter Name: {counterName}</p>
      <p>Location: {location}</p>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Product" key="1"></TabPane>
        <TabPane tab="Staff" key="2"></TabPane>
      </Tabs>
    </div>
  );
}
