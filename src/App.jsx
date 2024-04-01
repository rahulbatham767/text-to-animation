import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import DemoPage from "./components/DemoPage";
import { useAuth } from "./components/AuthProvider";
import DragAndDropTextFile from "./components/features/DragAndDropTextFile";
import { TextForm } from "./components/features/TextFrom";
import { Toaster } from "react-hot-toast";
import ErrorPage from "./components/ErrorPage";
import LogoRemover from "./components/features/LogoRemover";
function App() {
  const { login, logout, user } = useAuth();

  return (
    <>
      <Router>
        <Navbar />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <Routes>
          <Route exact Component={DemoPage} path="/" />
          <Route Component={ErrorPage} path="*" />
          <Route
            exact
            path="/text-form"
            element={<ProtectedRoute element={TextForm} />}
          />
          <Route
            exact
            path="/home"
            element={<ProtectedRoute element={Home} />}
          />
          <Route
            exact
            path="/logo-remover"
            element={<ProtectedRoute element={LogoRemover} />}
          />
          <Route
            exact
            path="/dragable"
            element={<ProtectedRoute element={DragAndDropTextFile} />}
          />
          <Route exact Component={Register} path="/register" />
          {user ? (
            <Route
              exact
              path="/login"
              element={<Navigate to="/home" replace />}
            />
          ) : (
            <Route exact element={<Login />} path="/login" />
          )}{" "}
        </Routes>
      </Router>
    </>
  );
}

export default App;
