// components/auth/AuthCardHeader.js
import React from "react";

export const AuthCardHeader = ({ title }) => {
  return (
    <div style ={{color:"#006400"}} className="card-header text-center">
      <h4>{title}</h4>
    </div>
  );
};
