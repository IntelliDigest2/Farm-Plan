
import React,  { useRef, useState } from "react";
import { Link, useHistory} from "react-router-dom";
import "../App.css";
import { useAuth } from "../contexts/AuthContext";

function ChangePassword() {
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const {updatePassword} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== repeatPasswordRef.current.value){
        console.log("checking passwords")
        return setError("Passwords do not match! Please retype your password.");
      }
      
      const promises = []
      setLoading(true)
      setError("")

    if(passwordRef.current.value){
        promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() =>{
        history.push("/account")
    }).catch(() => {
        setError("Failed to update account")
    }).finally(() =>{
        setLoading(false)
    })
  }

  return (
      <div className="change-password-page-container">
        <div className="change-password-container">
          <div className="change-password-header">
          <h1 className="text-h1">Change Password</h1>
          {<h1 className="warning">{error}</h1>}
          </div>
          <div className="change-password-form-content">
          <form onSubmit={handleSubmit} className="change-password-form">
          <label htmlFor="password">New Password</label>
        <input type="password" id="password" name="password" placeholder="New Password" ref={passwordRef} required/>

        <label htmlFor="repeat">Repeat New Password</label>
        <input type="password" id="repeat" name="repeat" placeholder="Repeat New Password" ref={repeatPasswordRef} required/>
                  <button disabled={loading} className="btn frg-password" type="submit">Change Password</button>
                  <p className="back-to-acc"><Link to="/account" className="back-to-acc">Cancel</Link></p>
                </form>
          </div>
        </div>                                                          
      </div>
  );
}

export default ChangePassword;
