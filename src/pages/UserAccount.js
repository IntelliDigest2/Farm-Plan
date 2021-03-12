import React, { useState } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Account() {
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const history = useHistory();

    async function handleLogout(){
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }
  
    return (
      <div className="user-account-page-container">
        <h1 className="user-acc-title">My Account</h1>
        {<h1 className="warning">{error}</h1>}
        <h1 className="user-acc-details">Account email: <span className="email-colour">{currentUser.email}</span></h1>
        <div className="user-acc-options">
          <p className="user-acc-opt"><Link to="/change-password">Change Password</Link></p>
          <p className="user-acc-opt"><Link to="#">SMART Bin Details</Link></p>
          <p className="user-acc-opt"><Link to="#">View Food Waste</Link></p>
        </div>
        <button className="user-acc-logout-btn" type="submit" onClick={handleLogout}>Logout</button>
      </div>
  );
}

export default Account;
