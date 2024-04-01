// Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthProvider";
import toast from "react-hot-toast";
const Login = ({ getLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, logout } = useAuth();

  const navigate = useNavigate();

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
    // Reset the form
    setFormData({
      email: "",
      password: "",
    });

    axios
      .post("http://localhost:8080/api/v1/user/login", formData)
      .then((Response) => {
        localStorage.setItem("user", Response.data);
        localStorage.setItem("login", Response.data.authtoken);
        if (Response.data.success) {
          login();
          navigate("/home");
          toast.success("Login Successful");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
        // return err.message;
      });
  };

  return (
    <div className="container mx-auto mt-8 bg-gray-100 bg-opacity-50 p-8 rounded-lg w-6/12">
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
            minLength={"8"}
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
