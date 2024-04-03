import React, { useEffect } from "react";
import { Route, useNavigate, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
const ProtectedRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  const { LoggedIn } = useSelector((state) => state.TextAnimation);

  const navigate = useNavigate();

  return LoggedIn ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
