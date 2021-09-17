import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux'
import {signOut} from '../../store/actions/authActions'
import {MobileView, BrowserView} from 'react-device-detect'

const NavBar = (props) => {
  const { auth } = props;

  return (
    <NavStyle>
      <Navbar fixed="top" collapseOnSelect expand="md" className="mr-0 ml-0">
        <Container>

          <BrowserView>
            <Navbar.Brand className="pl-sm-0 pl-0 pl-md-2 logo" href="/home">IntelliDigest - The Global Food Loss & Waste Tracker</Navbar.Brand>
          </BrowserView>

          <MobileView>
            <Navbar.Brand className="navbar-brand-mobile" href="/home">IntelliDigest - The Global Food Loss & Waste Tracker</Navbar.Brand>
          </MobileView>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={NavLink} eventKey="1" className="pl-sm-0 pl-0 pl-md-4 pl-lg-5 nav-link" to="/home" activeClassName="active" exact={true}>Home</Nav.Link>
              <Nav.Link as={NavLink} eventKey="2" className="pl-sm-0 pl-0 pl-md-4 pl-lg-5 nav-link" to="/about" activeClassName="active" exact={true}>About</Nav.Link>
                {(auth.uid)? 
                <>
                <Nav.Link as={NavLink} eventKey="3" className="pl-sm-0 pl-0 pl-md-4 pl-lg-5 nav-link" to="/account" activeClassName="active" exact={true}>My Account</Nav.Link>
                <Nav.Link as={NavLink} eventKey="4" className="pl-sm-0 pl-0 pl-md-4 pl-lg-5 nav-link" to="/view-map" activeClassName="active" exact={true}>View Map</Nav.Link>
                <Nav.Link as={NavLink} eventKey="5" className="pl-sm-0 pl-0 pl-md-4 pl-lg-5 nav-link logout" to="/login" onClick={props.signOut}>Logout</Nav.Link>
                </>
               : 
                
                <Nav.Link as={NavLink} eventKey="6" className="pl-sm-0 pl-0 pl-md-4 pl-lg-5 nav-link" to="/login" activeClassName="active" exact={true}>Login</Nav.Link>
              }
              <Nav.Link as={NavLink} eventKey="7" className="pl-sm-0 pl-0 pl-md-4 pl-lg-5 nav-link" to="/contact" activeClassName="active" exact={true}>Contact Us</Nav.Link>
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
      padding: 6px;
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

    .container .navbar-brand-mobile{
      font-weight: 700;
      color: #AFBA15;
      font-size: 10.5px;
      font-family: 'Rajdhani', sans-serif;

      &:hover{
        color: #AFBA15;
      }
    }

    .container .nav-link {
    font-size: 14px;
    color: whitesmoke;
    font-weight: 500;
    font-family: 'Source Sans Pro', sans-serif;
      text-decoration: none;
      justify-content: space-between;  


        &:hover{
          color:#c5d118;
        }

    }

    .navbar-light .navbar-nav .nav-link.active{
      color:#d8e61a;

      &:hover{
        color:#c5d118;
      }
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

const mapDispatchToProps = (dispatch) => {
  return{
      signOut: () => dispatch(signOut())
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
      auth: state.firebase.auth
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)