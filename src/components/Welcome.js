import React from "react";
import "../App.css";

function WelcomeMessage({title,message}) {
  return (
    <div className="welcome-div-layout">
      <div className="welcome-heading">
            <h1 className="heading-title">{title}</h1>
            <i className="fa fa-recycle recycle-logo"></i>
        </div>
        <div className="welcome-text">
            <p>{message}</p>
        </div>
    </div>
  );
}

export default WelcomeMessage;
