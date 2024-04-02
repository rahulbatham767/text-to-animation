import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const { login, logout, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Here you can add your logic to handle form submission
    console.log(formData);
    // Reset the form
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });

    axios
      .post(
        "https://text-to-animation-backend.vercel.app/api/v1/user/register",
        formData
      )
      .then((Response) => {
        localStorage.setItem("user", JSON.stringify(Response.data));
        localStorage.setItem("login", JSON.stringify(Response.data.authtoken));
        if (Response.data.success) {
          navigate("/home");
          login();
          toast.success("Registration Successful");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration Failed because  " + err.response.data);
        return err.message;
      });
    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-8 bg-gray-100 bg-opacity-50 p-4 rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-white">Register Student</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-800  text-lg font-semibold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            minLength={"3"}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-lg font-semibold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastname"
            minLength={"3"}
            value={formData.lastname}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
