import React from "react";
import { useSelector } from "react-redux";
import { selectToken, selectAuth } from "../../slices/auth.slice";
import { Button, Card } from "antd";
import "./Home.css";

export default function Home() {
  const auth = useSelector(selectAuth);
  const token = useSelector(selectToken);

  return (
    <div className="home-container">
      <Card className="info-card" title="User Information">
        <p>Email: {auth?.email || "null"}</p>
        <p>Name: {auth?.name || "null"}</p>
        <p>Role ID: {auth?.roles || "null"}</p>
        {/* <p>Token: {token || "null"}</p> */}
      </Card>
      <div className="buttons-container">
        <Button type="primary" className="action-button">
          Make Order
        </Button>
        <Button type="primary" className="action-button">
          Make Sell
        </Button>
        <Button type="primary" className="action-button">
          View TypePrice
        </Button>
      </div>
    </div>
  );
}
