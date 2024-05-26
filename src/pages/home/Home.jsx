import React from "react";
import { selectToken, selectAuth } from "../../slices/auth.slice";
import { useSelector } from "react-redux";

export default function Home() {
  const auth = useSelector(selectAuth);
  const token = useSelector(selectToken);
  return (
    <div>
      <div>Username: {auth?.name ? auth?.name : "null"}</div>
      <div>Email: {auth?.email ? auth?.email : "null"}</div>
      <div>Role: {auth?.roles ? auth?.roles : "null"}</div>

      <div>Token: {token ? token : "Null"}</div>
    </div>
  );
}
