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
import FeedbackPage from "./components/FeedbackPage";
function App() {
  const { login, logout, user } = useAuth();

  let logoutTimer;

  useEffect(() => {
    const startLogoutTimer = () => {
      logoutTimer = setTimeout(() => {
        logoutUser();
      }, 1 * 60 * 1000); // 5 minutes in milliseconds
    };

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      startLogoutTimer();
    };

    const logoutUser = () => {
      // Perform logout action (e.g., redirect to logout page or send logout request to server)
      console.log("User logged out due to inactivity");
      logout();
    };

    // Event listeners to reset timer on user activity
    document.addEventListener("mousemove", resetLogoutTimer);
    document.addEventListener("keypress", resetLogoutTimer);
    document.addEventListener("click", resetLogoutTimer);

    // Start the logout timer initially
    startLogoutTimer();

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener("mousemove", resetLogoutTimer);
      document.removeEventListener("keypress", resetLogoutTimer);
      document.removeEventListener("click", resetLogoutTimer);
      clearTimeout(logoutTimer);
    };
  }, []); // Only run this effect once after the component mounts

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
            path="/feedback"
            element={<ProtectedRoute element={FeedbackPage} />}
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
