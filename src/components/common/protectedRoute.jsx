import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ children }) => {
  const user = auth.getCurrentUser();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children; // Renders child components if the user is authenticated
};

export default ProtectedRoute;
