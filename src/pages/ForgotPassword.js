import React,  { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useAuth } from "../contexts/AuthContext";

function ForgotPassword() {
  const emailRef = useRef();
  const {resetPassword} = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()

    try{
      setError("")
      setMessage("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Password reset request successful, please check your email for further instructions.")
      console.log("reset password works")
    }
    catch{
      setError("Failed to reset password.")
    }

    setLoading(false)
  }

  return (
      <div className="frg-password-page-container">
        <div className="frg-password-container">
          <div className="frg-password-header">
          <h1 className="text-h1">Reset Password</h1>
          {<h1 className="warning">{error} {message}</h1>}
          </div>
          <div className="frg-password-form-content">
          <form onSubmit={handleSubmit} className="frg-password-form">
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" name="username" placeholder="Email" ref={emailRef}  required/>
                  <button disabled={loading} className="btn frg-password" type="submit">Reset Password</button>
                  <p className="frg-password-login"><Link to="/login" className="frg-login">I remember my password.</Link></p>
                  <br/>
                  <p className="no-acc">Not got an account? <Link to="/signup" className="register">Click here</Link> to sign up today!</p>
                </form>
          </div>
        </div>
      </div>
  );
}

export default ForgotPassword;
