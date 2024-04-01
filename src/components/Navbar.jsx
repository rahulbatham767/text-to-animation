// Navbar.js

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import toast from "react-hot-toast";
import { FaTimes, FaBars } from "react-icons/fa";
import ThemeSwitch from "./ThemeSwitch";
import CustomNavLink from "./custom/CustomNavLink";
const Navbar = () => {
  const navigate = useNavigate();
  const { login, logout, user } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  console.log(isDarkMode);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const Logout = () => {
    toast.success("Logged out successfully");
    logout();
  };

  return (
    <nav
      className={`bg-transparent p-3 flex items-center poppins-regular  md:flex-row ${
        isNavOpen ? "flex-col" : "flex-row"
      } `}
    >
      <div
        className={`container mx-auto flex items-center  ${
          isNavOpen ? "flex-col" : "flex-row"
        } `}
      >
        <CustomNavLink to="/"> Dreams To Reality</CustomNavLink>
        <div
          className={`sm:flex ${isNavOpen ? "block" : "hidden"} lg:flex-row`}
        >
          {user && (
            <div
              className={` flex sm:my-3 items-center ${
                isNavOpen ? "flex-col" : "flex-row"
              } justify-center `}
            >
              <CustomNavLink to="/home"> Text To Image</CustomNavLink>
              <CustomNavLink to="/dragable">File To Text</CustomNavLink>
              <CustomNavLink to="/text-form"> Text Style</CustomNavLink>
              <CustomNavLink to="/logo-remover"> Logo Remover</CustomNavLink>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center ">
        <div
          className={`flex items-center ${
            isNavOpen ? "flex-col" : "flex-row"
          } `}
        >
          <div className="mr-7 items-center">
            <ThemeSwitch />
          </div>

          {user ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3 mt-3 text-sm mb-3"
              onClick={Logout}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 text-sm mb-3">
                Login
              </button>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/register">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  text-sm mb-2">
                Register
              </button>
            </NavLink>
          )}
        </div>
      </div>
      {user && (
        <div className="sm:hidden">
          <button
            onClick={toggleNav}
            className={`text-white ${
              isDarkMode ? "bg-transparent" : "bg-transparent"
            }`}
          >
            {isNavOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
