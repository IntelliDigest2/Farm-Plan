import React from "react";
import "../App.css";

function Paragraph({title,message}) {
  return (
    <div className="textbox-div-layout paragraph">
        <div className="textbox-text">
            <p>{message}</p>
        </div>
    </div>
  );
}

export default Paragraph;