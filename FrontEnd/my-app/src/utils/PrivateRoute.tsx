import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/loginaccount" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
