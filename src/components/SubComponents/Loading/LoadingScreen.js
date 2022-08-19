import React from "react";
import WheatIcon from "../../../images/WheatIcon.png";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading">
      <div className="icon">
        <img src={WheatIcon} alt="loading" className="wheat" />
      </div>
    </div>
  );
}
