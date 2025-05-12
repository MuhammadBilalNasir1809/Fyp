import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginIn.css";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies
import { FormField } from "../Form/FormFieldEmail";
import { PasswordFormField } from "../Form/PasswordFormField";
import { AlertBasic } from "../../Components/Alert/AlertBasic"; // Import AlertBasic

const LoginIn = ({ setIsLoggedIn, IsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [submitted, setSubmitted] = useState(false); // Track if form is submitted
  const navigate = useNavigate();

  const checkAuthStatus = async () => {
    try {
      // The HttpOnly cookie will be automatically sent with this request
      const response = await axios.get("http://localhost:4000/api/verify-session", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/features");
        console.log(response.status);
      }
    } catch (error) {
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");

      // Handle error - redirect to login if needed
      navigate("/login");
    }
  };

  // Use this in useEffect or wherever you need to check auth status
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleInputChange = (field, eventTarget) => {
    const { value } = eventTarget;

    // Update the state for the respective field
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }

    // Clear the error for the field when the user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Set submitted to true

    if (!email || !password) {
      setErrorMessage("Both fields are required");
      return;
    }

    setErrorMessage("");
    setSuccessMessage(""); // Clear success message before submission

    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        { email, password },
        {
          withCredentials: true,
          // Add specific axios configuration for credentials
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Update application state
        setIsLoggedIn(true);
        setSuccessMessage("Login successful! Redirecting..."); // Set success message
        localStorage.setItem("isLoggedIn", "true");

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate("/signup"); // Navigate to the signup page
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/forgot-password"); // Navigate to the Forgot Password page
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title ">Welcome Back</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <FormField
              id="email"
              label="Email"
              value={email}
              error={errorMessage && !email ? "Email is required" : ""} // Pass error message if email is empty
              submitted={submitted} // Pass submitted state
              onChange={handleInputChange} // Use handleInputChange
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <PasswordFormField
              id="password"
              label="Password"
              value={password}
              error={errorMessage && !password ? "Password is required" : ""} // Pass error message if password is empty
              submitted={submitted} // Pass submitted state
              onChange={handleInputChange} // Use handleInputChange
            />
          </div>
          <button type="submit" className="login-button btn-dark-green">
            Login
          </button>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <a onClick={handleSignUpClick} href="#">
              Sign up
            </a>
          </p>
          <p>
            <a onClick={handleForgotPasswordClick} href="#">
              Forgot Password?
            </a>
          </p>
        </div>

        {/* Display success or error messages at the bottom */}
        {successMessage && (
          <AlertBasic
            heading="Success!"
            text={successMessage}
            className="alert-success"
          />
        )}
        {errorMessage && (
          <AlertBasic
            heading="Error!"
            text={errorMessage}
            className="alert-danger"
          />
        )}
      </div>
    </div>
  );
};

export default LoginIn;