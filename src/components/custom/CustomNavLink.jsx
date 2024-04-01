import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className="flex  justify-center text-white font-bold text-sm dancing mr-4 my-3 hover:text-blue-500 shadow-blueHover hover:shadow-lg "
      style={({ isActive }) => ({
        background: isActive ? "black" : "", // Apply background color when link is active
      })}
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
