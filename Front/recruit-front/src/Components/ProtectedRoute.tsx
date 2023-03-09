import React from "react";
import { Navigate, Outlet } from "react-router";
import { useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();

  const token = localStorage.getItem("accessToken");
  const isAuthent = !(token === null);
  console.log(isAuthent);

  const redirectToLogin = () => (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  console.log(isAuthent);
  if (isAuthent) {
    return <Outlet />;
  }
  return redirectToLogin();
};

export default ProtectedRoute;
