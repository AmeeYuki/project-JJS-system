import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectAuth, selectToken } from "../slices/auth.slice";

const AuthGuard = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const auth = useSelector(selectAuth);
  const location = useLocation();

  if (auth?.first_login !== null && auth?.first_login === true) {
    return <Navigate to="/login-first-time" />;
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.some((role) => auth.roles.includes(role))) {
    return <Navigate to="/unauthorised" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
