import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavbarDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="dropdown lg:hidden">
      <div
        tabIndex="0"
        role="button"
        className="btn btn-ghost"
        onClick={toggleDropdown}
      >
        <FaBars />
      </div>
      {isDropdownOpen && (
        <ul className="menu dropdown-content shadow-lg bg-base-100 rounded-box w-48  absolute">
          <li>
            <NavLink
              to="/home"
              className="text-base-content hover:bg-base-200 px-3 py-2 rounded-md block"
              onClick={closeDropdown}
            >
              Text To Image
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/text-to-animation"
              className="text-base-content hover:bg-base-200 px-3 py-2 rounded-md block"
              onClick={closeDropdown}
            >
              Text To Animation
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dragable"
              className="text-base-content hover:bg-base-200 px-3 py-2 rounded-md block"
              onClick={closeDropdown}
            >
              File To Text
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/text-form"
              className="text-base-content hover:bg-base-200 px-3 py-2 rounded-md block"
              onClick={closeDropdown}
            >
              Text Style
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/background-remover"
              className="text-base-content hover:bg-base-200 px-3 py-2 rounded-md block"
              onClick={closeDropdown}
            >
              Background Remover
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feedback"
              className="text-base-content hover:bg-base-200 px-3 py-2 rounded-md block"
              onClick={closeDropdown}
            >
              Feedback
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavbarDropdown;
