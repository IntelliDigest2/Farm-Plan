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
    postcode:"",
    address: "",
    function: "",
    organisation: "none",
    city: "",
    country: ""
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
}

handleClick = (e) => {
  this.setState({
    function: e.target.value
  })
}

handleSubmit = (e) => {
    e.preventDefault();
   this.props.signUp(this.state);
}

render(){
  const { auth, authError } = this.props;
  if (auth.uid) return <Redirect to='/account'/>

  // console.log(this.state.function);
  return (
    <React.Fragment>
    <Row className="mr-0 ml-0 justify-content-center align-items-center signup">
            <Col className="d-block mt-5 pt-5 pb-5 mb-5 pb-lg-0 mb-lg-0 mt-lg-0 pt-lg-0" sm={12} md={12} lg={5}>
              <FormStyle>
                <div className="text-center">

              <i className="fa fa-user-circle-o signup-logo"></i>
                </div>
              <h1 className="text-center header">Sign Up to The Global Food Loss & Waste Tracker</h1>
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
              <div>
              <Form.Label>Building function</Form.Label>
              </div>
              {/* <Form.Control type="text" id="firstName" placeholder="Name" required onChange={this.handleChange}/> */}
              <select
                  required
                  name="product"
                  id="product"
                  className="my-form"
                  defaultValue="choose"
                  onChange={this.handleClick}
                  style={{
                    border: "1px solid #62680a", 
                    display: "block",
                    width: "100%",
                    height: "calc(1.5em + .75rem + 2px)",
                    padding: ".375rem .75rem",
                    fontSize: "1rem",
                    fontWeight: "400",
                    lineHeight: "1.5",
                    color: "#495057",
                    backgroundColor: "#fff",
                    backgroundClip: "padding-box",
                    // border: "1px solid #ced4da",
                    borderRadius: ".25rem",
                    transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
              }}
                >
                   <option value="choose" disabled>Choose a building function</option>
                  <option value="Households">Households</option>
                  <option value="Hospitals">Hospitals</option>
                  <option value="Schools">Schools</option>
                  <option value="Hotels">Hotels</option>
                  <option value="Offices">Offices</option>
                  <option value="Restraunts">Restraunts</option>
                  <option value="Shop/Supermarket">Shop/Supermarket</option>
                  <option value="Farm">Farm</option>
                  <option value="Recreational Centers">Recreational Centers</option>
                  <option value="Other">Other</option>
                </select>
            </Form.Group>
            {this.state.function === "Households" ?
               <div></div> : 
               this.state.function === "" ? 
               <div></div> 
               :
               this.state.function === "Other" ?
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Name of organisation</Form.Label>
                    <Form.Control type="text" id="organisation" placeholder="Organisation" required onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Name of building function</Form.Label>
                    <Form.Control type="text" id="function" placeholder="Building Function" required onChange={this.handleChange}/>
                  </Form.Group>
                </Form.Row>
            :
            <div>
                <Form.Group >
                  <Form.Label>Name of organisation</Form.Label>
                  <Form.Control type="text" id="organisation" placeholder="Organisation" required onChange={this.handleChange}/>
                </Form.Group>
              </div>
            }
            <Form.Row>
            <Form.Group as={Col}>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" id="address" placeholder="Address" required onChange={this.handleChange}/>
                
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Postcode</Form.Label>
                <Form.Control type="text" id="postcode" placeholder="Postcode" required onChange={this.handleChange}/>
              </Form.Group>
              </Form.Row>
              <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" id="city" placeholder="City" required onChange={this.handleChange}/>
                
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" id="country" placeholder="Country" required onChange={this.handleChange}/>
              </Form.Group>
              </Form.Row>

              <Form.Group >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" id="email" placeholder="Email" required onChange={this.handleChange}/>
              </Form.Group>


              <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" id="password" placeholder="Password" required onChange={this.handleChange}/>
              </Form.Group>

              <p className="text-center terms">By creating an account you agree to our <a className="terms-link" href="https://intellidigest.com/terms-conditions/?doing_wp_cron=1624534322.2405810356140136718750" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>, and <a className="privacy-link" href="https://intellidigest.com/privacy-policy/?doing_wp_cron=1624534455.5444190502166748046875" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>

              <Form.Group controlId="formActions"  style={{display: "flex", justifyContent: "center"}}>
              <Button variant="dark" type="submit">
                Sign Up
              </Button>
              </Form.Group>
              </Form>
              <p className="text-center terms">Already a member? <Link to="/login" className="register">Login</Link> to your account.</p>
              <div className="auth-error">{authError ? <p> {authError}</p> : null}</div>
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