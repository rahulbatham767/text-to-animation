import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { User_Register } from "../app/features/AnimationSlice";
const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const { error, success } = useSelector((state) => state.TextAnimation);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(User_Register(formData))
      .unwrap()
      .then((Response) => {
        // Check if registration was successful
        console.log(Response);
        if (Response.success) {
          navigate("/home");
          toast.success("User registered successfully");
        } else {
          toast.error(error); // Assuming result.message contains the error message
        }
      })
      .catch((error) => {
        console.error("Error occurred during registration:", error.Response);
        // Handle error if needed
        if ((error = "Request failed with status code 409")) {
          toast.error("Email is already registered");
        }
      });

    // Here you can add your logic to handle form submission
    console.log(formData);
    // Reset the form
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
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
            autoComplete="true"
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
