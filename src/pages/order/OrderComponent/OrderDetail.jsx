import React from "react";
import "../Order.css";
import { useParams } from "react-router-dom";

export default function OrderDetail() {
  const params = useParams();
  console.log(params.id);
  return (
    <div className="order-page">
      <div className="header">
        <h1 className="title">Order Detail</h1>
        <hr />
      </div>
      <div className="information">
        <h3>Information</h3>
      </div>
    </div>
  );
}
