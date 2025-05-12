import React from "react";

export const FormFieldText = ({ id, label, icon, value, error, submitted, disabled, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="input-group">
        <input
          type="text"
          id={id}
          className={`form-control ${submitted && error ? "is-invalid" : ""}`} // Apply is-invalid only if submitted and error exists
          value={value}
          onChange={(e) => onChange(id, e.target)}
          disabled={disabled}
        />
      </div>
      {/* Render the error message if it exists and form is submitted
      {submitted && error && (
        <div className="text-danger mt-2">{error}</div>
      )} */}
    </div>
  );
};