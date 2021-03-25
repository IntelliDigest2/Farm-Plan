import React, { Component } from "react";
import { connect } from 'react-redux';
import { signIn } from '../../../store/actions/authActions';
import { Redirect, Link} from 'react-router-dom';
import "../Pages.css"
import styled from "styled-components";
import { Row, Col, Form, Button } from "react-bootstrap";

class Login extends Component{

  state ={
    email: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
}

handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
}

  render() {
    const {authError, auth} = this.props;
    if(auth.uid) return <Redirect to='/account'/>

    return(
      <React.Fragment>
        <Row className="mr-0 ml-0 justify-content-center align-items-center login">
            <Col className="d-block mt-5 pt-5 mt-lg-0 pt-lg-0" sm={12} md={12} lg={5}>
              <FormStyle>
              <h1 className="text-center">Login to your account</h1>
              
              <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" id="email" placeholder="Email" required onChange={this.handleChange}/>
              </Form.Group>

              <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" placeholder="Password"  required  onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formActions">
              <Button variant="dark" type="submit">
                Login
              </Button>
              <Link to="/forgot-password" className="forgot-password">Forgot your password?</Link>
              </Form.Group>
              </Form>
              <p className="text-center">Not got an account? <Link to="/signup" className="register">Click here</Link> to sign up today!</p>
              <div className="auth-error">{authError ? <p> {authError}</p> : null}</div>
              </FormStyle>
            </Col>
            <Col className="bg-image login-graphic d-none d-sm-none d-md-none d-lg-block" sm={12} md={12} lg={7}></Col>
        </Row>
    </React.Fragment>

);
}
}

const FormStyle = styled.div`
    form{
      width:55%;
      margin:auto;
      padding:10px;
    }

    input{
      border: 1px solid #62680a;
    }

    .btn-dark{
      background-color:#071850;
      color:whitesmoke;
      border: 1px solid #03091d;

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
      authError: state.auth.authError,
      auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
      signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);