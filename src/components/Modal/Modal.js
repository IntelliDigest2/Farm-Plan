import React from "react";
import {Link} from "react-router-dom";
import "./Modal.css";

function Modal() {
  return (
      <div className="main-div">
              <div className="modal-container">
        <div className="modal-header">
        <p className="header-layout header-text">Login to your account</p>
            <span className="header-layout modal-close-btn"><i class="fa fa-times"></i></span>
        </div>
        <br/>
        <div className="modal-content">
            <div className="modal-body">
            <form action="#" className="">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Username"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password"/>
                <button className="btn frg-password" type="submit">Login</button>

                <Link to="#" className="frg-password password">Forgot your password?</Link>
                <br/>
                <p className="acc">Not got an account? <Link to="/signup" className="register">Click here</Link> to sign up today!</p>
            </form>
            </div>
            <div className="modal-footer">
                <button className="modal-close">Close</button>
            </div>
        </div>
    </div>
      </div>

  );
}

export default Modal;
