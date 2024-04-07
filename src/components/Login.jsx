import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User_Login } from "../app/features/AnimationSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { darkmode } = useSelector((state) => state.TextAnimation);
  const dispatch = useDispatch();
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
    console.log(formData);
    dispatch(User_Login(formData));

    // Reset the form
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className={`hero min-h-screen ${darkmode ? "dark" : ""}`}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left mb-8 lg:mb-0">
          <h1
            className={`text-4xl font-bold ${
              darkmode ? "text-white" : "text-black"
            }`}
          >
            Welcome to Dream To Reality
          </h1>
          <p className={`py-6 ${darkmode ? "text-gray-300" : "text-gray-600"}`}>
            Please login to access your account and get ready to turn your
            dreams into reality!
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-base-300">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label
                className={`label ${darkmode ? "text-white" : "text-black"}`}
              >
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered text-black"
                required
              />
            </div>
            <div className="form-control">
              <label
                className={`label ${darkmode ? "text-white" : "text-black"}`}
              >
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered text-black"
                required
              />
              <label
                className={`label ${
                  darkmode ? "text-gray-200" : "text-gray-700"
                }`}
              ></label>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn ${darkmode ? "btn-primary" : "btn-secondary"}`}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
