import React, { useState } from "react";
import axios from "axios";
import { AuthCard } from "../../Components/auth/AuthCard";
import { AuthCardHeader } from "../../Components/auth/AuthCardHeader";
import { AuthCardBody } from "../../Components/auth/AuthCardBody";
import { AuthCardFooter } from "../../Components/auth/AuthCardFooter";
import { AlertBasic } from "../../Components/Alert/AlertBasic";
import { ButtonBasic } from "../../Components/buttons/ButtonBasic";
import { FormField } from "../Form/FormFieldEmail";

export default function ForgotPassword() {
  const [formDisabled, setFormDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [values, setValues] = useState({ email: "" });
  const [submitted, setSubmitted] = useState(false); // Track if form is submitted

  const handleInputChange = (field, eventTarget) => {
    const { value } = eventTarget;
    setValues((prevValues) => ({ ...prevValues, [field]: value }));

    // Clear the error for the field when the user starts typing
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true); // Set submitted to true
    setErrors({});
    setSuccessMessage("");

    const newErrors = {};

    // Validation for email field
    if (!values.email) newErrors.email = "Email is required"; // Use specific field error

    // If errors exist, set them and prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Disable form and send API request
    setFormDisabled(true);
    axios
      .post("http://localhost:4000/api/forgot-password", {
        email: values.email,
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage("Password reset instructions sent to your email!");
        }
      })
      .catch((error) => {
        let message = "Something went wrong! Please try again later.";
        if (error.response && error.response.status === 400) {
          message = "Invalid email or user not found.";
        }
        setErrors({ email: message }); // Set specific field error
      })
      .finally(() => {
        setFormDisabled(false);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-70px" }}
    >
      <div className="w-100 w-md-50">
        <AuthCard>
          <AuthCardHeader title="Forgot Password"/>
          <AuthCardBody>
            <FormField
              id="email"
              label="Email Address"
              value={values.email}
              icon="icon-envelope"
              error={errors.email} // Pass specific field error
              submitted={submitted} // Pass submitted state
              disabled={formDisabled}
              onChange={handleInputChange}
            />
            <ButtonBasic
              type="button"
              className={`${
                !formDisabled ? "btn-secondary" : "btn-light"
              } btn-md btn-block my-2`}
              title="Submit"
              disabled={formDisabled}
              onClick={handleSubmit}
            />
            {successMessage && (
              <AlertBasic
                heading="Success!"
                text={successMessage}
                className="alert-success"
              />
            )}
            {errors.email && (
              <AlertBasic
                heading="Error!"
                text={errors.email}
                className="alert-danger"
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