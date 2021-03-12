import React from "react";
import "../App.css";

function Text({title,message}) {
  return (
    <div className="textbox-div-layout">
      <div className="textbox-heading">
            <h1>{title}</h1>
            <i className="fa fa-recycle recycle-logo"></i>
        </div>
        <div className="textbox-text">
            <p>{message}</p>
        </div>
    </div>
  );
}

export default Text;
