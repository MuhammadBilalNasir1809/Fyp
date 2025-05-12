// components/buttons/ButtonBasic.js
import React from "react";

export const ButtonBasic = ({ type, className, title, onClick, disabled }) => {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{ width: "100%" , color:"white" ,backgroundColor:"#006400"}}
    >
      {title}
    </button>
  );
};
