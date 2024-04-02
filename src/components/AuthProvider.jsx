// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedLoading = localStorage.getItem("loading");
    setLoading(storedLoading === "true");

    // Check if user is authenticated on page load
    const authenticatedUser = localStorage.getItem("user");
    if (authenticatedUser) {
      setUser(true);
    }
  }, []);

  const setLoader = () => {
    localStorage.setItem("loading", "true");
  };
  const removeLoader = () => {
    localStorage.setItem("loading", "false");
  };

  const login = () => {
    // Authenticate user and store user data in local storage
    setUser(true);
  };

  const logout = () => {
    // Clear user data from local storage
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    setUser(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, setLoader, removeLoader, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
