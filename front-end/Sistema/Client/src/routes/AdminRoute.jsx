import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // Importe Outlet
import { useAuth } from "../Auth.jsx";
import Header from "../Components/Header/Header.jsx";

const AdminRoute = () => {
  // Remova o children prop
  const { user } = useAuth();

  if (!user.isAuthenticated || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AdminRoute;
