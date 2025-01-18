import React from "react";
import "./style/index.css";
import { useLocation } from "react-router-dom";

const titleMap = {
  "/": "Home",
  "/reservation-history": "장부 조회",
  "/reservation": "예약",
  "/seat-search": "OTT 검색",
  "/my": "마이페이지",
  "/my/code-input": "코드 입력",
};

function AppBar() {
  const loc = useLocation();

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/green_logo.png" alt="Logo" className="logo-img" />
        <span className="page-name">{titleMap[loc.pathname]}</span>
      </div>
    </div>
  );
}

export { AppBar };
