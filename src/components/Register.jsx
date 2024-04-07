import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User_Register } from "../app/features/AnimationSlice";
import toast from "react-hot-toast";

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

  const { darkmode } = useSelector((state) => state.TextAnimation);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(User_Register(formData))
      .unwrap()
      .then((Response) => {
        if (Response.success) {
          navigate("/home");
          toast.success("User registered successfully");
        }
      })
      .catch((error) => {
        console.error("Error occurred during registration:", error);
        if (error === "Request failed with status code 409") {
          toast.error("Email is already registered");
        } else {
          toast.error("An error occurred during registration");
        }
      });

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };

  return (
    <div
      className={`container mx-auto space-x-5 pb-8 mt-6 flex items-center justify-center  ${
        darkmode ? "dark" : ""
      }`}
    >
      {/* Registration Form */}
      <div className="max-w-md w-full rounded-lg  shadow-lg bg-white dark:bg-gray-800 p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-black">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm text-black font-semibold mb-2"
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className={`input input-bordered w-full ${
                darkmode ? "text-black" : "text-black"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm text-black font-semibold mb-2"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className={`input input-bordered w-full ${
                darkmode ? "text-black" : "text-black"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm text-black font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`input input-bordered w-full ${
                darkmode ? "text-black" : "text-black"
              }`}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-black text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              placeholder="Password"
              className={`input input-bordered w-full ${
                darkmode ? "text-black" : "text-black"
              }`}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
      </div>
      {/* Image */}
    </div>
  );
};

export default Register;
