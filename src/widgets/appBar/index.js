import React from "react";
import "./style/index.css";

function Navbar({ pageName }) {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/green_logo.png" alt="Logo" className="logo-img" />
        <span className="page-name">{pageName}</span>
      </div>
    </div>
  );
}

export { Navbar };
