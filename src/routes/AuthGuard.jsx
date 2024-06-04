import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { selectAuth, selectToken } from "../slices/auth.slice";

const AuthGuard = ({ allowedRoles, children }) => {
  const token = useSelector(selectToken);
  const auth = useSelector(selectAuth);
  const location = useLocation();
  const navigate = useNavigate();
  // If no token exists, redirect to login page
  if (auth?.first_login !== null && auth?.first_login === true) {
    return <Navigate to="/login-first-time" />;
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists and user is not trying to access restricted routes, allow access
  return <Outlet />;
};

export default AuthGuard;
