import React, {Component} from "react";
import "../../App.css";
import "./Pages.css"
import { Row, Col, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import {BrowserView, MobileView} from 'react-device-detect';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { auth } from "../../config/fbConfig"
// import googleplaylogo from '../../images/google-play-logo.png'
// import buttonDesign from '../../images/button-design-6.png';
// import buttonDesign2 from "../../images/button-home-3.png"
import buttonDesign3 from "../../images/pts-button-2.png"

class Home extends Component {

  state = {
    uid: this.props.auth.uid,
    isLoggedIn: false
  }

  componentDidMount(){
    if (this.state.uid){
      this.setState({isLoggedIn: true})
    } else {
      this.setState({isLoggedIn: false})
    }
  }

  render(){

    const {auth} = this.props;

    return (
        <React.Fragment>

<BrowserView><Row className="mr-0 ml-0 mt-0 pt-0 justify-content-center align-items-center d-flex home">
  <Col className="mt-0 pt-0 mb-0 pb-0 mt-lg-3 pt-lg-3" xs={12}></Col>
  <Col className="" xs={12}></Col>
    <Col className="" xs={12} lg={4}></Col>
          <Col className="mt-2 pt-2" xs={12}></Col>
                <Col className="justify-content-center align-items-center d-flex mt-5 pt-5" xs={12}>
            <p className="home-welcome text-center " style={{marginBottom: "4.5%"}}>The Global Food Loss & Waste Tracker</p>
                </Col>
                <Col className="mt-0 pt-0 d-block justify-content-center align-items-center" xs={12}>

                  {!this.state.isLoggedIn ?

                    <Link to="/signup"><img style={{position: "absolute", left: "50%", right: "50%", transform: "translate(-50%, -50%)", width: "30%"}} src={buttonDesign3}/></Link>

                  : <Link to="/reserve-items"><img style={{position: "absolute", left: "50%", right: "50%", transform: "translate(-50%, -50%)", width: "30%"}} src={buttonDesign3}/></Link> }

                <p className="text-center update-text" style={{marginTop: "6.5%", marginBottom: "-0.5%"}}> For updates, please sign up to the newsletter below.</p>

                <FormStyle>

                <Form>
                <Form.Row>

                <Form.Group as={Col} controlId="homeFormEmail">
        <Form.Control type="email" placeholder="Email" required/>

      </Form.Group>
      <Form.Group>
          
        <Button variant="dark" type="submit">
                Sign Up
              </Button>
      </Form.Group>
                </Form.Row>
              </Form>
                </FormStyle>

                <a href='https://play.google.com/store/apps/details?id=com.IntelliDigest.TheGlobalFoodLossandWasteTracker&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img style={{position: "absolute", left: "50%", right: "50%", transform: "translate(-50%, -50%)", marginTop: "9vh", width: "20%"}}  alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
                  



                </Col>
      <Col className="mt-5 pt-5" xs={12}></Col>
      <Col className="mt-5 pt-5" xs={12}></Col>
            </Row></BrowserView>

        <MobileView>
        <Row className="mr-0 ml-0 mt-0 pt-0 justify-content-center align-items-center d-flex home-mobile">
  <Col className="mt-0 pt-0 mb-0 pb-0 mt-lg-3 pt-lg-3" xs={12}></Col>
  <Col className="" xs={12}></Col>
    <Col className="" xs={12} lg={4}></Col>
          <Col className="mt-2 pt-2" xs={12}></Col>
                <Col className="justify-content-center align-items-center d-flex mt-5 pt-5" xs={12}>
            <p className="home-text-mobile text-center">The Global Food Loss & Waste Tracker</p>
                </Col>
                <Col className="mt-0 pt-0 d-block justify-content-center align-items-center" xs={12}>

                {!this.state.isLoggedIn ?

                <Link to="/signup"><img style={{position: "absolute", left: "50%", right: "50%", transform: "translate(-50%, -50%)", width: "75%", marginTop: "9vh"}} src={buttonDesign3}/></Link>

                :

                <Link to="/reserve-items"><img style={{position: "absolute", left: "50%", right: "50%", transform: "translate(-50%, -50%)", width: "30%"}} src={buttonDesign3}/></Link>

                }

                <p className="home-update-text-mobile text-center"  style={{marginTop: "45%", marginBottom: "-0.5%"}}> For updates, please sign up to the newsletter below.</p>

                <FormStyle>

                <Form>
                <Form.Row>

                <Form.Group as={Col} controlId="homeFormEmail">
        <Form.Control type="email" placeholder="Email" required/>

      </Form.Group>
      <Form.Group>
          
        <Button variant="dark" type="submit">
                Sign Up
              </Button>
      </Form.Group>
                </Form.Row>
              </Form>
                </FormStyle>

                </Col>
      <Col className="mt-5 pt-5" xs={12}></Col>
      <Col className="mt-5 pt-5" xs={12}></Col>
            </Row>
        </MobileView>

        </React.Fragment>
    );
  }
}

const FormStyle = styled.div`
form{
    width:30%;
    padding:10px;
    margin: auto;
  }

  form .col{
    background:none;
  }

  input, textarea{
    border: 1px solid #62680a;
  }
  
  .btn-dark{
    background-color:  #071850;
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

  
  @media (max-width: 576px) {

    form{
      width:100%;
      display:block;
    }
  }

  @media (max-width: 768px) { 
    form{
      width: 100%;
    }

  }
`

const mapStateToProps = (state) => { 
  return{
      auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps, null)(Home);
