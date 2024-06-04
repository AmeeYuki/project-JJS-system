import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectToken } from "../slices/auth.slice";

const GuestGuard = () => {
  const token = useSelector(selectToken);

  // If token exists, redirect to homepage or another appropriate page
  if (token) {
    return <Navigate to="/" replace />;
  }

  // If no token, allow access to the route (e.g., login page)
  return <Outlet />;
};

export default GuestGuard;
