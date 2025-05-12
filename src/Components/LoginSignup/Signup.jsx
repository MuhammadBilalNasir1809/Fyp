import React, { useState } from "react";
import axios from "axios";
import { AuthCard } from "../../Components/auth/AuthCard";
import { AuthCardHeader } from "../../Components/auth/AuthCardHeader";
import { AuthCardBody } from "../../Components/auth/AuthCardBody";
import { AuthCardFooter } from "../../Components/auth/AuthCardFooter";
import { AlertBasic } from "../../Components/Alert/AlertBasic";
import { ButtonBasic } from "../../Components/buttons/ButtonBasic";
import { FormField } from "../Form/FormFieldEmail";
import { PasswordFormField } from "../Form/PasswordFormField";
import { FormFieldText } from "../Form/FormFieldText";
import signupimage from "../../assets/signup_img.jpg";
export default function Signup({ setIsLoggedIn }) {
  const [formDisabled, setFormDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [hasDisease, setHasDisease] = useState(false); // Set as boolean
  const [submitted, setSubmitted] = useState(false); // Track if form is submitted
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "Male",
    hasDisease: false, // Change default to false (boolean)
    diseaseName: "",
    chronicDisease: false,
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, eventTarget) => {
    const { value, type } = eventTarget;

    // Update the state values based on field
    setValues((prevValues) => ({
      ...prevValues,
      [field]: type === "radio" ? value === "true" : value,
    }));

    // Clear the error for the field when the user starts typing
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }

    // Handle visibility of "Disease Name" field based on chronicDisease
    if (field === "hasDisease") {
      const diseaseStatus = value === "Yes";
      setHasDisease(diseaseStatus);
      setValues((prevValues) => ({ ...prevValues, hasDisease: diseaseStatus }));
    }

    if (field === "chronicDisease" && value === "true") {
      setValues((prevValues) => ({ ...prevValues, chronicDisease: true }));
    } else {
      setValues((prevValues) => ({ ...prevValues, chronicDisease: false }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true); // Set submitted to true
    setErrors({});
    setSuccessMessage("");

    const newErrors = {};

    const requiredFields = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "email",
      "password",
      "confirmPassword",
    ];
    const emptyFields = requiredFields.filter((field) => !values[field]);
    if (emptyFields.length > 0) {
      newErrors.message = "Please Fill All Mandatory Fields.";
    } else if (isNaN(values.age) || values.age < 1) {
      newErrors.age = "Please enter a valid age.";
    } else if (!values.gender) {
      newErrors.gender = "Please select your gender.";
    } else if (values.hasDisease && !values.diseaseName) {
      newErrors.diseaseName = "Please enter the disease name.";
    } else if (!values.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormDisabled(true);

    axios
      .post("http://localhost:4000/api/signup", values, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 201) {
          setSuccessMessage("Signup successful! Redirecting to login...");
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      })
      .catch((error) => {
        setErrors({
          message:
            error.response?.data?.message || "Signup failed. Please try again.",
        });
      })
      .finally(() => {
        setFormDisabled(false);
      });
  };

  return (
    <div className="d-flex vh-100">
      <div
        className="d-none d-md-flex flex-column justify-content-center align-items-center w-50"
        style={{ marginLeft: "130px", marginBottom: "40px" }}
      >
        <img
          src={signupimage}
          alt="Sign Up Illustration"
          className="img-fluid"
          style={{ maxWidth: "105%" }}
        />
      </div>

      <div
        className="d-flex justify-content-center align-items-center w-100 w-md-50 p-4"
        style={{ marginBottom: "50px" }}
      >
        <AuthCard className="w-100" style={{ maxHeight: "700px", overflowY: "auto" }}>
          <AuthCardHeader title="Sign Up" />
          <AuthCardBody>
            <div className="row">
              <div className="col-md-6">
                <FormFieldText
                  id="firstName"
                  label="First Name"
                  value={values.firstName}
                  error={errors.firstName} // Pass field-specific error
                  submitted={submitted} // Pass submitted state
                  onChange={handleInputChange}
                  disabled={formDisabled}
                />
              </div>
              <div className="col-md-6">
                <FormFieldText
                  id="lastName"
                  label="Last Name"
                  value={values.lastName}
                  error={errors.lastName} // Pass field-specific error
                  submitted={submitted} // Pass submitted state
                  onChange={handleInputChange}
                  disabled={formDisabled}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <FormFieldText
                  id="age"
                  label="Age"
                  type="number"
                  value={values.age}
                  error={errors.age} // Pass field-specific error
                  submitted={submitted} // Pass submitted state
                  onChange={handleInputChange}
                  disabled={formDisabled}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="genderMale"
                      value="Male"
                      checked={values.gender === "Male"}
                      onChange={handleInputChange}
                      disabled={formDisabled}
                    />
                    <label className="form-check-label" htmlFor="genderMale">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="genderFemale"
                      value="Female"
                      checked={values.gender === "Female"}
                      onChange={handleInputChange}
                      disabled={formDisabled}
                    />
                    <label className="form-check-label" htmlFor="genderFemale">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  error={errors.email} // Pass field-specific error
                  submitted={submitted} // Pass submitted state
                  onChange={handleInputChange}
                  disabled={formDisabled}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <PasswordFormField
                  id="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  error={errors.password} // Pass field-specific error
                  submitted={submitted} // Pass submitted state
                  onChange={handleInputChange}
                  disabled={formDisabled}
                />
              </div>
              <div className="col-md-6">
                <PasswordFormField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  error={errors.confirmPassword} // Pass field-specific error
                  submitted={submitted} // Pass submitted state
                  onChange={handleInputChange}
                  disabled={formDisabled}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <label className="form-label">Do you have any disease?</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="hasDisease"
                      id="hasDiseaseYes"
                      value="Yes"
                      checked={values.hasDisease === true}
                      onChange={(e) => handleInputChange("hasDisease", e.target)}
                      disabled={formDisabled}
                    />
                    <label className="form-check-label" htmlFor="hasDiseaseYes">
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="hasDisease"
                      id="hasDiseaseNo"
                      value="No"
                      checked={values.hasDisease === false}
                      onChange={(e) => handleInputChange("hasDisease", e.target)}
                      disabled={formDisabled}
                    />
                    <label className="form-check-label" htmlFor="hasDiseaseNo">
                      No
                    </label>
                  </div>
                </div>
              </div>
              {hasDisease && (
                <>
                  <div className="col-md-6">
                    <FormFieldText
                      id="diseaseName"
                      label="Disease Name"
                      value={values.diseaseName}
                      error={errors.diseaseName} // Pass field-specific error
                      submitted={submitted} // Pass submitted state
                      onChange={handleInputChange}
                      disabled={formDisabled}
                    />
                  </div>
                </>
              )}
            </div>

            <ButtonBasic
              type="button"
              className={`${
                !formDisabled ? "btn-primary" : "btn-light"
              } btn-md btn-block my-2`}
              title="Sign Up"
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
            {errors.message && (
              <AlertBasic
                heading="Error!"
                text={errors.message}
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