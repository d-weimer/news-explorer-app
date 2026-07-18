import React from "react";
import "./Preloader.css";

function Preloader() {
  return (
    <div className="main-content__status-container">
      <div className="circle-preloader"></div>
      <p className="main-content__status-text">Searching for news...</p>
    </div>
  );
}

export default Preloader;
