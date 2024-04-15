import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { FaBars } from "react-icons/fa";
import ThemeSwitch from "../ThemeSwitch";
import { useSelector, useDispatch } from "react-redux";
import { logoutStart, logoutSuccess } from "../../app/features/AnimationSlice";
import NavbarDropdown from "./DropDown";

const Navbar = () => {
  const { LoggedIn, darkmode } = useSelector((state) => state.TextAnimation);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const Logout = () => {
    dispatch(logoutStart());
    dispatch(logoutSuccess());
    toast.success("Logged out successfully");
  };

  return (
    <nav
      className={`${
        darkmode ? "bg-gray-800 text-white" : " text-black"
      }  p-4 text-lg`}
    >
      <div className=" mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {LoggedIn ? <div>{<NavbarDropdown />}</div> : ""}

            <NavLink to="/" className="btn btn-ghost btn-sm">
              Dreams To Reality
            </NavLink>
          </div>
          <div className={`lg:flex `}>
            {LoggedIn && (
              <>
                <div className="flex space-x-1  lg:flex hidden ">
                  <NavLink
                    to="/home"
                    className="btn btn-ghost btn-sm"
                    onClick={closeDropdown}
                  >
                    Text To Image
                  </NavLink>
                  <NavLink
                    to="/text-to-animation"
                    className="btn btn-ghost btn-sm"
                    onClick={closeDropdown}
                  >
                    Text To Animation
                  </NavLink>
                  <NavLink
                    to="/dragable"
                    className="btn btn-ghost btn-sm"
                    onClick={closeDropdown}
                  >
                    File To Text
                  </NavLink>
                  <NavLink
                    to="/text-form"
                    className="btn btn-ghost btn-sm"
                    onClick={closeDropdown}
                  >
                    Text Style
                  </NavLink>
                  <NavLink
                    to="/background-remover"
                    className="btn btn-ghost btn-sm"
                    onClick={closeDropdown}
                  >
                    Background Remover
                  </NavLink>
                  <NavLink
                    to="/feedback"
                    className="btn btn-ghost btn-sm"
                    onClick={closeDropdown}
                  >
                    Feedback
                  </NavLink>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <div>
              <ThemeSwitch />
            </div>
            {LoggedIn ? (
              <div>
                <button
                  className={` ${darkmode ? "btn " : "btn btn-ghost"}  ml-2`}
                  onClick={Logout}
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <div>
                <button
                  className={` btn-md  ${
                    darkmode ? "btn  " : "btn btn-ghost"
                  }  ml-2`}
                >
                  <NavLink to="/login">Login</NavLink>
                </button>
              </div>
            )}
            {!LoggedIn && (
              <div>
                <button
                  className={` btn-md  ${
                    darkmode ? "btn  " : "btn btn-ghost"
                  }  `}
                >
                  <NavLink to="/register">Register</NavLink>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
