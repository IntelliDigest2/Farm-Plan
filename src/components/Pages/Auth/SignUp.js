import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../../store/actions/authActions';
import "../Pages.css"
import styled from "styled-components";
import { Row, Col, Form, Button } from "react-bootstrap";


class SignUp extends Component {
  
  state ={
    email: "",
    password: "",
    firstName:"",
    lastName:"",
    postcode:""
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
}

handleSubmit = (e) => {
    e.preventDefault();
   this.props.signUp(this.state);
}

render(){
  const { auth, authError } = this.props;
  if (auth.uid) return <Redirect to='/account'/>

  
  return (
    <React.Fragment>
    <Row className="mr-0 ml-0 justify-content-center align-items-center signup">
            <Col className="d-block mt-5 pt-5 pb-5 mb-5 pb-lg-0 mb-lg-0 mt-lg-0 pt-lg-0" sm={12} md={12} lg={5}>
              <FormStyle>
                <div className="text-center">

              <i className="fa fa-user-circle-o signup-logo"></i>
                </div>
              <h1 className="text-center header">Sign Up to iTracker</h1>
              <Form onSubmit={this.handleSubmit}>

              <Form.Row>
              <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
                <Form.Control type="text" id="firstName" placeholder="Name" required onChange={this.handleChange}/>
              </Form.Group>
          
              <Form.Group as={Col}>
              <Form.Label>Surname</Form.Label>
                <Form.Control type="text" id="lastName" placeholder="Surname" required onChange={this.handleChange}/>
              </Form.Group>
            </Form.Row>

            <Form.Group>
                <Form.Label>Postcode</Form.Label>
                <Form.Control type="text" id="postcode" placeholder="Postcode" required onChange={this.handleChange}/>
              </Form.Group>
              

              <Form.Group >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" id="email" placeholder="Email" required onChange={this.handleChange}/>
              </Form.Group>


              <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" placeholder="Password" required onChange={this.handleChange}/>
              </Form.Group>

              <p className="text-center terms">By creating an account you agree to our <Link to="/terms-and-privacy" className="termcond">Terms and Conditions</Link>, and <Link to="/terms-and-privacy" className="termcond">Privacy Policy</Link>.</p>

              <Form.Group controlId="formActions">
              <Button variant="dark" type="submit" >
                Sign Up
              </Button>
              </Form.Group>
              </Form>
              <p className="text-center terms">Already a member? <Link to="/login" className="register">Login</Link> to your account.</p>
              <p>{ authError? <h5 variant='blue'> <strong>{authError}</strong> </h5> : null} </p>
              </FormStyle>
            </Col>
            <Col className="bg-image signup-graphic d-none d-sm-none d-md-none d-lg-block" sm={12} md={12} lg={7}></Col>
        </Row>
</React.Fragment>
  );
}
}

const FormStyle = styled.div`
    form{
      width:80%;
      margin:auto;
      padding:10px;
    }

    input{
      border: 1px solid #62680a;
    }
    
    .btn-dark{
      background-color:  #071850;
      color:whitesmoke;
      border: 1px solid #03091d;
      float:right;

      &:hover{
        background-color: #030d2b;
        border: 1px solid #03091d;
      }

      &:active{
        background-color: #030d2b;
        border: 1px solid #03091d;
      }
    }

`
const mapStateToProps = (state) => {
  return{
      auth: state.firebase.auth,
      authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);