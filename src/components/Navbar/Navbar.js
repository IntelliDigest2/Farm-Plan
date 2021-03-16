import React, {useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import "./Navbar.css"
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
const [open, setOpen] = useState(false);

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
    <nav>
        <h3 className="logo">IntelliDigest - iTracker</h3>
        <ul className="nav-items" style={{transform: open ? "translateX(0px)" : ""}}>
            <NavLink to="/" activeClassName="active" exact={true}><li>Home</li></NavLink>
            <NavLink to="/about" activeClassName="active" exact={true}><li >About</li></NavLink>
            {currentUser ? 
              <>
                <NavLink to="/account" activeClassName="active" exact={true}><li >My Account</li></NavLink>
                <NavLink to="/" className="logout" onClick={handleLogout}><li>Logout</li></NavLink>
              </>
              :
              <NavLink to="/login" activeClassName="active" exact={true}><li >Login</li></NavLink>
            }
            <NavLink to="/contact" activeClassName="active" exact={true}><li className="last-item">Contact Us</li></NavLink>
        </ul>
        <i onClick={() => setOpen(!open)}  style={{color: open ? "#AFBA15" : "whitesmoke"}} className="fa fa-bars menu"></i>
    </nav>
  );
}

export default Navbar;
