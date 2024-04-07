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
import DragAndDropTextFile from "./components/features/DragAndDropTextFile";
import { TextForm } from "./components/features/TextFrom";
import { Toaster, toast } from "react-hot-toast";
import ErrorPage from "./components/ErrorPage";
import LogoRemover from "./components/features/LogoRemover";
import FeedbackPage from "./components/FeedbackPage";
import Loader from "./components/custom/Loader";
import { useSelector, useDispatch } from "react-redux";
import { logoutStart, logoutSuccess } from "./app/features/AnimationSlice";
import TexToImage from "./components/features/TextToImage";
import CustomNavbar from "./components/custom/CustomNavbar";
function App() {
  const { LoggedIn, loading, darkmode } = useSelector(
    (state) => state.TextAnimation
  );

  const dispatch = useDispatch();

  let logoutTimer;
  useEffect(() => {
    localStorage.setItem("loading", JSON.stringify(loading));
  }, [loading]);
  useEffect(() => {
    const startLogoutTimer = () => {
      logoutTimer = setTimeout(() => {
        logoutUser();
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    };

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      startLogoutTimer();
    };

    const logoutUser = () => {
      // Perform logout action (e.g., redirect to logout page or send logout request to server)
      dispatch(logoutStart());
      dispatch(logoutSuccess());

      toast.success("User logged out due to inactivity");
    };

    // Event listeners to reset timer on LoggedIn activity
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

  4;

  useEffect(() => {
    if (darkmode) {
      document.getElementById("root").classList.remove("bg-gradient-light");
      document.getElementById("root").classList.add("bg-gradient-dark");
    } else {
      document.getElementById("root").classList.remove("bg-gradient-dark");
      document.getElementById("root").classList.add("bg-gradient-light");
    }
  }, [darkmode]);
  return (
    <div
      className={`${
        darkmode
          ? "bg-gradient-dark text-white"
          : "bg-gradient-light text-black"
      }`}
    >
      <Router>
        <CustomNavbar />
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
        {loading && <Loader display="hidden" />}
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
            path="/text-to-animation"
            element={<ProtectedRoute element={Home} />}
          />
          <Route
            exact
            path="/home"
            element={<ProtectedRoute element={TexToImage} />}
          />
          <Route
            exact
            path="/background-remover"
            element={<ProtectedRoute element={LogoRemover} />}
          />
          <Route
            exact
            path="/dragable"
            element={<ProtectedRoute element={DragAndDropTextFile} />}
          />
          {LoggedIn ? (
            <Route
              exact
              path="/login"
              element={<Navigate to="/home" replace />}
            />
          ) : (
            <Route exact Component={Register} path="/register" />
          )}
          {LoggedIn ? (
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
    </div>
  );
}

export default App;
