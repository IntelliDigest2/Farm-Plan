import React, { useRef, useState } from "react";
import "../App.css";
import { Link, useHistory} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const {signup} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== repeatPasswordRef.current.value){
      console.log("checking passwords")
      return setError("Passwords do not match! Please retype your password.");
    }

    try{
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value )
      history.push("/account")
      console.log("sign up worked")
    }
    catch{
      setError("Failed to create an account, for example an account with this email already exists. Please also make sure that" +
      " your password is alphanumeric.")
    }

    setLoading(false)
  }

  return (
    <div className="signup-page-containter">
        <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
      <i className="fa fa-user-circle-o signup-logo"></i>
      <div className="">
        <h1 className="text-lg signup-header"> Sign Up to iTracker</h1>
        {<h1 className="warning">{error}</h1>}
       <br/>
      </div>

      {/*<div className="fullname-container">
      <div className="name">
        <label className="" htmlFor="fName">Name</label>
        <input className="" type="text" id="fName" name="fName" placeholder="Name"/>
        </div>

        <div className="surname">
        <label  className="" htmlFor="lName">Surname</label>
        <input className="" type="text" id="lName" name="lName" placeholder="Surname"/>
        </div>
        </div> */}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email" ref={emailRef} required/>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" ref={passwordRef} required/>

        <label htmlFor="repeat">Repeat Password</label>
        <input type="password" id="repeat" name="repeat" placeholder="Repeat Password" ref={repeatPasswordRef} required/>

        <p className="terms">By creating an account you agree to our <Link to="/termsandprivacy" className="termcond">Terms and Conditions</Link>, and <Link to="/termsandprivacy" className="termcond">Privacy Policy</Link>.</p>

        <button disabled={loading} className="btn" type="submit">Sign Up</button>

        <p className="terms member">Already a member? <Link to="/login" className="register">Login</Link> to your account.</p>

      </form> 


        </div>
        <div className="signup-graphic"></div>

    </div>
   
  );
}

export default SignUp;