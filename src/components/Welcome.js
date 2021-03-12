import React from "react";
import "../App.css";

function WelcomeMessage({title,message}) {
  return (
    <div className="welcome-div-layout">
      <div className="welcome-heading">
            <h1>{title}</h1>
            <i className="fa fa-recycle recycle-logo"></i>
        </div>
        <div className="welcome-text">
            <p>{message}</p>
        </div>
        <form action="#" className="alerts-form">
        <label htmlFor="email">You can also sign up for email alerts about our website below:</label>
        <input className="form-layout" type="email" id="email" name="email" placeholder="example@example.com" required/>
        <button className="form-layout btn" type="submit">Sign Up</button>
      </form> 

    </div>
  );
}

export default WelcomeMessage;
