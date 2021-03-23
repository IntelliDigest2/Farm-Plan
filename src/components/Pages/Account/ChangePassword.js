import React,  { useRef, useState } from "react";
import { Link, useHistory} from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "../Pages.css"
import styled from "styled-components";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

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
    <React.Fragment>
  <Row className="mr-0 ml-0 mt-0 pt-0 mt-lg-5 pt-lg-5 justify-content-center align-items-center d-flex change-password">
  <Col className="mt-0 pt-0 mb-0 pb-0 mt-lg-2 pt-lg-2" xs={12}></Col>
  <Col className="mt-5 pt-5" xs={12}></Col>
    <Col className="" xs={12} lg={4}></Col>
      <Col className=" justify-content-center align-items-center d-block mt-5 pt-5 mt-lg-0 pt-lg-0" xs={12} lg={4}>
        <CardStyle>

      <Card>
    <Card.Body>
       <Card.Text>
      
       <FormStyle>
                <div className="text-center">
                </div>
              <h1 className="text-center">Change Password</h1>

              {<h1 className="warning">{error}</h1>}
              <Form onSubmit={handleSubmit}>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
              </Form.Group>

              <Form.Group controlId="formBasicRepeatPassword">
                <Form.Label>Repeat New Password</Form.Label>
                <Form.Control type="password" placeholder="Repeat Password" ref={repeatPasswordRef} required/>
              </Form.Group>

              <Form.Group controlId="formActions">
              <Button variant="dark" type="submit" disabled={loading}>
                Change Password
              </Button>
              </Form.Group>
              </Form>
              <p className="text-center back-to-acc"><Link to="/account" className="cancel">Cancel</Link></p>
              </FormStyle>
       </Card.Text>
      </Card.Body>
  </Card>
        </CardStyle>

      </Col>
      <Col className="mt-5 pt-5" xs={12} lg={4}></Col>
      <Col className="mt-5 pt-5" xs={12}></Col>
      <Col className="mt-5 pt-5" xs={12}></Col>
  </Row>
</React.Fragment>


);
}


const FormStyle = styled.div`
form{
margin:auto;
  padding:10px;
width:100%;

}

input{
border: 1px solid #62680a;
}

.btn-dark{
background-color:#071850;
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

const CardStyle = styled.div`
.card{
color: rgb(59, 59, 59);
background-color: rgb(238, 238, 238);
border: none;
border-radius:5px;
padding:10px 0 10px 0;
}

`

export default ChangePassword;
