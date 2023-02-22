import React from "react";
import { PathRouteProps, Outlet } from "react-router";

interface Props extends PathRouteProps {
  isEmployee: boolean;
}

const ProtectedRoute = ({ isEmployee, ...routeProps }: Props) => {
  console.log(isEmployee);
  if (isEmployee) {
    return <Outlet />;
  }
  return <div>ONLY EMPLOYEES CAN SEE THIS</div>;
};

export default ProtectedRoute;
