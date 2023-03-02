import React from "react";
import { PathRouteProps, Navigate, Outlet } from "react-router";
import ProtectedRouteMessage from "./ProtectedRouteMessage";

interface Props extends PathRouteProps {
  isEmployee: boolean;
}

const ProtectedRouteEmployee = ({ isEmployee, ...routeProps }: Props) => {
  if (isEmployee) {
    return <Outlet />;
  }
  return <ProtectedRouteMessage></ProtectedRouteMessage>;
};

export default ProtectedRouteEmployee;
