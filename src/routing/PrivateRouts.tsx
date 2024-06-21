import React from "react";
import useAuth from "./hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouts = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRouts;
