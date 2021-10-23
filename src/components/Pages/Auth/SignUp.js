import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../../store/actions/authActions';
import "../Pages.css"
import styled from "styled-components";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Divider } from '@material-ui/core';


class SignUp extends Component {
  
  state ={
    email: "",
    password: "",
    firstName:"",
    lastName:"",
    postcode:"",
    address: "",
    function: "choose",
    organisation: "",
    schoolType: "choose",
    department: "",
    uniRole: "choose",
    city: "",
    country: "",
    // wasteMethod: "choose",
    isConfirming: false
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

  handleSchoolTypeClick = (e) => {
    this.setState({
      schoolType: e.target.value
    })
  }

  handleRoleClick = (e) => {
    this.setState({
      uniRole: e.target.value
    })
  }

  // handleMethodClick = (e) => {
  //   this.setState({
  //     wasteMethod: e.target.value
  //   })
  // }

  handleConfirmClick = (e) => {
    this.setState({
      isConfirming: !this.state.isConfirming
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
    // <div>{!this.state.isConfirming ?
      <React.Fragment>
        <Row className="mr-0 ml-0 justify-content-center align-items-center signup">
              <Col className="d-block mt-5 pt-5 pb-5 mb-5 pb-lg-0 mb-lg-0 mt-lg-0 pt-lg-0" sm={12} md={12} lg={5} style={{height: "100vh", overflowY: "scroll"}}>
                <FormStyle>
                  <div className="text-center" style={{marginTop: "10%"}}>

                <i className="fa fa-user-circle-o signup-logo"></i>
                  </div>
                <h1 className="text-center header">Sign Up to The Global Food Loss & Waste Tracker</h1>
                <div>{!this.state.isConfirming ? 
                 <Form > {/* onSubmit={this.handleSubmit} */}

                <Form.Row>
                <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                  <Form.Control type="text" id="firstName" placeholder="Name" required onChange={this.handleChange} defaultValue={this.state.firstName}/>
                </Form.Group>
            
                <Form.Group as={Col}>
                <Form.Label>Surname</Form.Label>
                  <Form.Control type="text" id="lastName" placeholder="Surname" required onChange={this.handleChange} defaultValue={this.state.lastName}/>
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
                    defaultValue={this.state.function}
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
                this.state.function === "choose" ? 
                <div></div> 
                :
                this.state.function === "Other" ?
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>Name of organisation</Form.Label>
                      <Form.Control type="text" id="organisation" placeholder="Organisation" required onChange={this.handleChange} defaultValue={this.state.organisation}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>Name of building function</Form.Label>
                      <Form.Control type="text" id="function" placeholder="Building Function" required onChange={this.handleChange}  defaultValue={this.state.function}/>
                    </Form.Group>
                  </Form.Row>

                : this.state.function === "Schools" ?
                <>
                
                <Divider style={{marginBottom: "15px"}}/>
                
                <Form.Group>
                  <div><Form.Label>School Type</Form.Label></div>
                  <select
                    required
                    name="product"
                    id="product"
                    className="my-form"
                    defaultValue={this.state.schoolType}
                    onChange={this.handleSchoolTypeClick}
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
                    <option value="choose" disabled>Choose a school type</option>
                    <option value="University">University</option>
                    <option value="College">College</option>
                    <option value="Secondary School">Secondary School</option>
                    <option value="Primary School">Primary School</option>
                  </select>
                </Form.Group>
                
                <div>{this.state.schoolType === "University" ?
                  <>

                    <Form.Group>
                      <Form.Label>Name of organisation</Form.Label>
                      <Form.Control type="text" id="organisation" placeholder="Organisation" required onChange={this.handleChange}  defaultValue={this.state.organisation}/>
                    </Form.Group>

                      <Form.Group>
                      <Form.Label>Department / Course</Form.Label>
                        <Form.Control type="text" id="department" placeholder="Department / Course" required onChange={this.handleChange} defaultValue={this.state.department}/>
                      </Form.Group>
                  
                      <Form.Group>
                      {/* <Form.Label>Role</Form.Label>
                        <Form.Control type="text" id="lastName" placeholder="Surname" required onChange={this.handleChange} defaultValue={this.state.lastName}/> */}

                  <div><Form.Label>Role</Form.Label></div>
                  <select
                    required
                    name="product"
                    id="product"
                    className="my-form"
                    defaultValue={this.state.uniRole}
                    onChange={this.handleRoleClick}
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
                    <option value="choose" disabled>Choose a role</option>
                    <option value="Admin / Dept Head">Admin / Dept Head</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Student">Student</option>
                  </select>

                      </Form.Group>

                    <Divider style={{marginBottom: "15px"}}/>
                  </>

                  : <>
                <Form.Group >
                  <Form.Label>Name of organisation</Form.Label>
                  <Form.Control type="text" id="organisation" placeholder="Organisation" required onChange={this.handleChange}  defaultValue={this.state.organisation}/>
                </Form.Group>

                <Divider style={{marginBottom: "15px"}}/>
                  </>

                }

                </div>
                
                </>

              :
              <div>
                  <Form.Group >
                    <Form.Label>Name of organisation</Form.Label>
                    <Form.Control type="text" id="organisation" placeholder="Organisation" required onChange={this.handleChange}  defaultValue={this.state.organisation}/>
                  </Form.Group>
                </div>
              }

            {/* <Form.Group>
                <div><Form.Label>Food Waste Management Method</Form.Label></div>
                <select
                  required
                  name="product"
                  id="product"
                  className="my-form"
                  defaultValue={this.state.wasteMethod}
                  onChange={this.handleMethodClick}
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
                  <option value="choose" disabled>Choose an option</option>
                  <option value="Landfill">Landfill</option>
                  <option value="Collection/Recycling">Collection/Recycling</option>
                  <option value="Compost">Compost</option>
                  {/* <option value="Pet Food">Pet Food</option> */}
                {/* </select>
              </Form.Group> */}

              <Form.Row>
              <Form.Group as={Col}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" id="address" placeholder="Address" required onChange={this.handleChange} defaultValue={this.state.address}/>
                  
              </Form.Group>

              <Form.Group as={Col}>
                  <Form.Label>Postcode</Form.Label>
                  <Form.Control type="text" id="postcode" placeholder="Postcode" required onChange={this.handleChange} defaultValue={this.state.postcode}/>
                </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" id="city" placeholder="City" required onChange={this.handleChange} defaultValue={this.state.city}/>
                  
              </Form.Group>

              <Form.Group as={Col}>
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" id="country" placeholder="Country" required onChange={this.handleChange} defaultValue={this.state.country}/>
                </Form.Group>
                </Form.Row>

                <Form.Group >
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" id="email" placeholder="Email" required onChange={this.handleChange} defaultValue={this.state.email}/>
                </Form.Group>


                <Form.Group >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" id="password" placeholder="Password" required onChange={this.handleChange}/>
                </Form.Group>

                <p className="text-center terms">By creating an account you agree to our <a className="terms-link" href="https://intellidigest.com/terms-conditions/?doing_wp_cron=1624534322.2405810356140136718750" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>, and <a className="privacy-link" href="https://intellidigest.com/privacy-policy/?doing_wp_cron=1624534455.5444190502166748046875" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</p>

                <Form.Group controlId="formActions"  style={{display: "flex", justifyContent: "center"}}>
                <Button variant="dark" type="button" onClick={(e) => this.handleConfirmClick(e)}>
                  Confirm Details
                </Button>
                </Form.Group>

                <Form.Group controlId="formActions"  style={{display: "flex", justifyContent: "center"}}>
                <Button variant="dark" type="button" onClick={(e) => this.handleSubmit(e)}>
                  Sign Up
                </Button>
                </Form.Group>
                </Form>
                :
                <div>
                  <div>
                    <h1 style={{marginTop: "25px", marginBottom: "20px", fontSize:"15px"}} className="text-center header">Confirm Sign-up Details</h1>

                    <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Email: {" "}</b><h7>{this.state.email}</h7></h6>

                    <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>First Name: {" "}</b><h7>{this.state.firstName}</h7></h6>

                    <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Second Name: {" "}</b><h7>{this.state.lastName}</h7></h6>

                    <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Postcode: {" "}</b><h7>{this.state.postcode}</h7></h6>

                    <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Address: {" "}</b><h7>{this.state.address}</h7></h6>

                    <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Building Function: {" "}</b><h7>{this.state.function}</h7></h6>

                    {/* <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Food Waste Management Method: {" "}</b><h7>{this.state.wasteMethod}</h7></h6> */}

                    {this.state.organisation !== "" ?  
                    <div>
                        <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Organisation: {" "}</b><h7>{this.state.organisation}</h7></h6>
                    </div> : <div></div> }

                    <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>City: {" "}</b><h7>{this.state.city}</h7></h6>

                    <h6 style={{marginTop: "15px", marginBottom: "30px"}} className="text-center p"><b>Country: {" "}</b><h7>{this.state.country}</h7></h6>

                    <div>
                        {/* <BrowserView>
                            <Container>
                                <Button onClick={this.back} type="button" className="signup confirm-btn" style={{position: 'absolute', left: '50%', right: '50%', bottom: '-30%', transform: 'translate(-50%, -50%)'}}>Back</Button>
                            </Container>

                            <Container>
                                <Button type="button" className="signup confirm-btn" style={{position: 'absolute', left: '50%', right: '50%', bottom: '-55%', transform: 'translate(-50%, -50%)'}}>Sign Up</Button>
                            </Container>
                        </BrowserView>

                        <MobileView>
                            <Container>
                                <Button onClick={this.back} type="button" className="signup confirm-btn" style={{position: 'absolute', left: '50%', right: '50%', top: '100%', transform: 'translate(-50%, -50%)', marginBottom: "5%"}}>Back</Button>
                            </Container>

                            <Container>
                                <Button type="button" className="signup confirm-btn" style={{position: 'absolute', left: '50%', right: '50%', top: '112.5%', transform: 'translate(-50%, -50%)', marginBottom: "5%"}}>Sign Up</Button>
                            </Container> 
                        </MobileView> */}
                      <Form.Group controlId="formActions"  style={{display: "flex", justifyContent: "center"}}>
                        <Button variant="dark" type="button" onClick={(e) => this.handleConfirmClick(e)}>
                          Back
                        </Button>
                      </Form.Group>
                    </div>
                  </div>
                </div> 
                }
                </div>
                <p style={{marginBottom: "10%"}} className="text-center terms">Already a member? <Link to="/login" className="register">Login</Link> to your account.</p>
                <div className="auth-error">{authError ? <p> {authError}</p> : null}</div>
                </FormStyle>
              </Col>
              <Col className="bg-image new-signup-graphic d-none d-sm-none d-md-none d-lg-block" sm={12} md={12} lg={7} style={{ height: "100vh"}}></Col>
        </Row>
      </React.Fragment>
        //   : 
        // <div></div>
      // <div>
      //   <Row className="mr-0 ml-0 justify-content-center align-items-center signup">
      //     <Col className="d-block mt-5 pt-5 pb-5 mb-5 pb-lg-0 mb-lg-0 mt-lg-0 pt-lg-0" sm={12} md={12} lg={5}>
      //         <div>
      //           <div style={{height: "100%"}}>
      //             <BrowserView><h1 style={{marginTop: "-30%", marginBottom: "10%"}} className="text-center header">Confirm Sign-up Details</h1></BrowserView>
      //             <MobileView><h1 style={{marginTop: "-10%", marginBottom: "10%"}} className="text-center header">Confirm Sign-up Details</h1></MobileView>

      //             <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Email: {" "}</b><h7>{email}</h7></h6>

      //             <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>First Name: {" "}</b><h7>{firstName}</h7></h6>

      //             <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Second Name: {" "}</b><h7>{lastName}</h7></h6>

      //             <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Postcode: {" "}</b><h7>{postcode}</h7></h6>

      //             <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Address: {" "}</b><h7>{address}</h7></h6>

      //             <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Building Function: {" "}</b><h7>{buildingFunction}</h7></h6>

      //             <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Food Waste Management Method: {" "}</b><h7>{wasteMethod}</h7></h6>

      //             {organisation !== "none" ?  
      //             <div>
      //                 <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>Organisation: {" "}</b><h7>{organisation}</h7></h6>
      //             </div> : <div></div> }

      //             <h6 style={{marginTop: "15px", marginBottom: "15px"}} className="text-center p"><b>City: {" "}</b><h7>{city}</h7></h6>

      //             <h6 style={{marginTop: "15px", marginBottom: "30px"}} className="text-center p"><b>Country: {" "}</b><h7>{country}</h7></h6>

      //             <div>
      //                 <BrowserView>
      //                     <Container>
      //                         <Button onClick={this.back} type="button" className="signup confirm-btn" style={{position: 'absolute', left: '50%', right: '50%', bottom: '-30%', transform: 'translate(-50%, -50%)'}}>Back</Button>
      //                     </Container>

      //                     <Container>
      //                         <Button type="button" className="signup confirm-btn" style={{position: 'absolute', left: '50%', right: '50%', bottom: '-55%', transform: 'translate(-50%, -50%)'}}>Sign Up</Button>
      //                     </Container>
      //                 </BrowserView>

      //                 <MobileView>
      //                     <Container>
      //                         <Button onClick={this.back} type="button" className="signup confirm-btn" style={{position: 'absolute', left: '50%', right: '50%', top: '100%', transform: 'translate(-50%, -50%)', marginBottom: "5%"}}>Back</Button>
      //                     </Container>

      //                     <Container>
      //                         <Button type="button" className="signup confirm-btn" style={{position: 'absolute', left: '50%', right: '50%', top: '112.5%', transform: 'translate(-50%, -50%)', marginBottom: "5%"}}>Sign Up</Button>
      //                     </Container> 
      //                 </MobileView>
      //             </div>
      //           </div>
      //         </div>
      //     </Col>
      //   </Row>
      // </div>
        // }</div>

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