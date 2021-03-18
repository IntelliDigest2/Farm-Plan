import { useAuth } from "../../contexts/AuthContext";
import React, { useState} from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";

function NavBar() {
// eslint-disable-next-line
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
    <NavStyle>
      <Navbar fixed="top" expand="md" className="mr-0 ml-0">
        <Container>
          <Navbar.Brand className="pl-sm-0 pl-0 pl-md-2 logo" href="/">IntelliDigest - iTracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className="pl-sm-0 pl-0 pl-md-5 navbar-items"><NavLink to="/" activeClassName="active" exact={true}>Home</NavLink></Nav.Link>
              <Nav.Link className="pl-sm-0 pl-0 pl-md-5 navbar-items"><NavLink to="/about" activeClassName="active" exact={true}>About</NavLink></Nav.Link>
              {currentUser ?
              <>
                <Nav.Link className="pl-sm-0 pl-0 pl-md-5 navbar-items"> <NavLink to="/account" activeClassName="active" exact={true}>My Account</NavLink></Nav.Link>
                <Nav.Link className="pl-sm-0 pl-0 pl-md-5 navbar-items"><NavLink to="/" className="logout" onClick={handleLogout}>Logout</NavLink></Nav.Link>
              </> 
            :
            <Nav.Link className="pl-sm-0 pl-0 pl-md-5 navbar-items"><NavLink to="/login" activeClassName="active" exact={true}>Login</NavLink></Nav.Link>
            }
              <Nav.Link className="pl-sm-0 pl-0 pl-md-5 navbar-items"><NavLink to="/contact" activeClassName="active" exact={true}>Contact</NavLink></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
    </NavStyle>
  );
}

const NavStyle = styled.div`
    .navbar{
      background-color:#030227;
      color: whitesmoke;
      box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.2);
      padding: .5rem;
    }

    .container .navbar-brand{
      font-weight: 700;
    color: #AFBA15;
    font-size: 20px;
    font-family: 'Rajdhani', sans-serif;

    &:hover{
      color: #AFBA15;
    }
    }

    .container a{
      font-size: 18px;
    color: whitesmoke;
    font-weight: 500;
    font-family: 'Source Sans Pro', sans-serif;
      text-decoration: none;
      justify-content: space-between;  


        &:hover{
          color:#c5d118;
        }
    }

    .container .active{
      color:#d8e61a;
  
  }
  .container .logout{
    color: whitesmoke;
  }
  .navbar-toggler{
    background-color: #AFBA15;
    padding: 5px 8px 5px 8px;
    color: white;
    size:10px;
  }
`;

export default NavBar;
