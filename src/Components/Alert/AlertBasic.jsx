// components/alerts/AlertBasic.js
import React from "react";

export const AlertBasic = ({ heading, text, className }) => {
  return (
    <div className={`alert ${className}`} role="alert">
      {heading && <strong>{heading}</strong>} {text}
    </div>
  );
};

