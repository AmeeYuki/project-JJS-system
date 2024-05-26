import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectToken } from "../slices/auth.slice";

const AuthGuard = ({ allowedRoles, children }) => {
  const token = useSelector(selectToken);
  const location = useLocation();
  const navigate = useNavigate();

  // If no token exists, redirect to login page
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  // If token exists and user is not trying to access restricted routes, allow access
  return <Outlet />;
};

export default AuthGuard;
