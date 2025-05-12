// components/auth/AuthCardFooter.js
import React from "react";

export const AuthCardFooter = ({ navLinks }) => {
  return (
    <div className="card-footer text-center">
      {navLinks.map((link, index) => (
        <a key={index} href={link.href} className={link.className} style={{color:' #006400'}}>
          {link.title}
        </a>
      ))}
    </div>
  );
};