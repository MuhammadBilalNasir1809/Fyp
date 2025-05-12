
import React, { useState } from 'react';

export const PasswordFormField = ({ id, label, value, error, onChange, disabled }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">{label}</label>
      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          className="form-control"
          value={value}
          onChange={e => onChange(id, e.target)}
          disabled={disabled}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setShowPassword(!showPassword)}
        >
          <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
        </button>
      </div>
      {error && <div className="text-danger small mt-1">{error}</div>}
    </div>
  );
};