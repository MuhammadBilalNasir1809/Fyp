import React, { useState } from "react";
import axios from "axios";
import { AuthCard } from "../../Components/auth/AuthCard";
import { AuthCardHeader } from "../../Components/auth/AuthCardHeader";
import { AuthCardBody } from "../../Components/auth/AuthCardBody";
import { AuthCardFooter } from "../../Components/auth/AuthCardFooter";
import { AlertBasic } from "../../Components/Alert/AlertBasic";
import { ButtonBasic } from "../../Components/buttons/ButtonBasic";
import { FormField } from "../Form/FormFieldEmail";
import { useParams } from "react-router-dom";
import '../../global.css'
import { PasswordFormField } from "../Form/PasswordFormField";
export default function ResetPassword() {
  const [formDisabled, setFormDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const { token } = useParams(); // Extract token from the URL
  console.log(token);
  const handleInputChange = (field, eventTarget) => {
    setValues((prevValues) => ({ ...prevValues, [field]: eventTarget.value }));
  };
  const handleSubmit = () => {
    setErrors({});
    const newErrors = {};

    // Validation
    if (!values.password) newErrors.password = "Password is required.";
    if (values.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long.";
    if (!values.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required.";
    if (values.password !== values.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      newErrors.message = "Please fix the errors and try again.";
      setErrors(newErrors);
      return;
    }

    setFormDisabled(true); // Disable form during submission

    // API Request
    axios
      .post(`http://localhost:4000/api/reset-password/${token}`, {
        password: values.password,
      })

      .then((response) => {
        if (response.status === 200) {
          setErrors({
            message:
              "Password has been reset successfully! You can now log in.",
          });
        }
      })
      .catch((error) => {
        let message = "Something went wrong! Please try again.";
        if (error.response && error.response.status === 400) {
          message = error.response.data.message || "Invalid reset token.";
        }
        setErrors({ message });
        setFormDisabled(false); // Re-enable form if error occurs
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100 w-md-50">
        <AuthCard>
          <AuthCardHeader title="Reset Password" />
          <AuthCardBody>
            <PasswordFormField
              id="password"
              label="New Password"
              type="password"
              value={values.password}
              icon="icon-lock"
              disabled={formDisabled}
              onChange={handleInputChange}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
            <PasswordFormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              icon="icon-lock"
              disabled={formDisabled}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
            <ButtonBasic
              type="button"
              className={`${
                !formDisabled ? "btn-primary" : "btn-light"
              } btn-md btn-block my-2`}
              title="Reset Password"
              disabled={formDisabled}
              onClick={handleSubmit}
            />
            {/* Displaying error or success messages */}
            {errors.message && (
              <AlertBasic
                heading={
                  errors.message.includes("successfully")
                    ? "Success!"
                    : "Error!"
                }
                text={errors.message}
                className={
                  errors.message.includes("successfully")
                    ? "alert-success"
                    : "alert-danger"
                }
              />
            )}
          </AuthCardBody>
          <AuthCardFooter
            navLinks={[
              {
                title: "Back to Login",
                href: "/login",
                className: "float-sm-left",
              },
            ]}
          />
        </AuthCard>
      </div>
    </div>
  );
}
