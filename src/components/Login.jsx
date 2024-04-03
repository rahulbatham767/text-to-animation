// Login.js

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { User_Login } from "../app/features/AnimationSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { success, error, LoggedIn } = useSelector(
    (state) => state.TextAnimation
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you can add your logic to handle form submission
    console.log(formData);

    dispatch(User_Login(formData))
      .then((result) => {
        // Check if the login was successful
        if (result.payload && result.payload.success) {
          navigate("/home");
          console.log("login successful");
          toast.success("User logged in successfully");
        } else {
          console.log("login failed");
          toast.error("Please enter with correct credentials");
        }
      })
      .catch((error) => {
        console.error("Error occurred during login:", error);
        // Handle error if needed
      });
    // Reset the form
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container mx-auto mt-8 bg-gray-100 bg-opacity-50 p-8 rounded-lg sm:w-1/2">
      <h2 className="text-3xl font-bold text-white mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-6">
          <label
            className="block text-gray-800 text-lg font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-800 text-lg font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={8}
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
