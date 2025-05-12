// components/auth/AuthCard.js
import React from "react";

export const AuthCard = ({ children }) => {
  return (
    <div className="card shadow-lg" style={{ maxWidth: "400px", margin: "auto" }}>
      {children}
    </div>
  );
};
