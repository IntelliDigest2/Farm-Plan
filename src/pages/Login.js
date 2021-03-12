import React,  { useRef, useState } from "react";
import { Link, useHistory} from "react-router-dom";
import "../App.css";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {login} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    try{
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value )
      history.push("/account")
      console.log("login worked")
    }
    catch{
      setError("Failed to login (e.g. an account with this email does not exist or username or password is wrong). Please try again.")
    }
    setLoading(false)
  }

  return (
      <div className="login-page-container">
        <div className="login-container">
          <div className="login-header">
          <h1 className="text-h1">Login to your account</h1>
          {<h1 className="warning">{error}</h1>}
          </div>
          <div className="login-form-content">
          <form onSubmit={handleSubmit} className="login-form">
                  <label htmlFor="username">Email</label>
                  <input type="text" id="username" name="username" placeholder="Email" ref={emailRef}  required/>
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" placeholder="Password" ref={passwordRef} required/>
                  <button disabled={loading} className="btn frg-password" type="submit">Login</button>

                  <Link to="/forgot-password" className="frg-password password">Forgot your password?</Link>
                  <br/>
                  <p className="text-p">Not got an account? <Link to="/signup" className="register">Click here</Link> to sign up today!</p>
                </form>
          </div>
        </div>
        <div className="login-graphic">
        </div>
      </div>
  );
}

export default Login;
