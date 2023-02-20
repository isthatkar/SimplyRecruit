import React from "react";
import { PathRouteProps, Navigate, Outlet } from "react-router";

interface Props extends PathRouteProps {
  isAuth: boolean;
}

const ProtectedRoute = ({ isAuth, ...routeProps }: Props) => {
  console.log(isAuth);
  if (isAuth) {
    return <Outlet />;
  }
  return <Navigate to="/login"></Navigate>;
};

export default ProtectedRoute;
