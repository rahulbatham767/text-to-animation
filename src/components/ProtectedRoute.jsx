import React, { useEffect } from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  return user ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
