import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth.jsx";

const ProtectedRoute = ({ children, isAllowed }) => {
  const { user } = useAuth();

  if (!user.isAuthenticated || !isAllowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
