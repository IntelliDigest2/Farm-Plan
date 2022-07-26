import React from 'react'
import "./login.css"

import { Form, Button } from "react-bootstrap";
import {  Link } from "react-router-dom";


const FirstPage = () => {
  return (
    <div className='login-contanier'>
        <section  className='login-main'>
            <header className='logo-header'>
        <img src='Green.png' alt='logo' className='logo1-btn'/>
        <p>Become a Consultant with us.</p>
        </header>
{/* bootstrap form */}
<Form className='default-form'>
<Form.Group controlId="formBasicName" className='form-group' >
                <Form.Label className='form-label'>1. Username</Form.Label>
                <Form.Control type="text"placeholder="username" required className='form-control'  ></Form.Control>
              </Form.Group>
              

              <Form.Group controlId="formBasicEmail" className='form-group'>
            <Form.Label className='form-label'>2. Password</Form.Label>
            <Form.Control type="email" placeholder="email" className='form-control' required></Form.Control>
           </Form.Group>

           <div style={{marginTop:"30px"}} className="">
          <Link to="/" style={{ color: "#AFBA15" }}>
            Forgot your password?
          </Link>
        </div>
           </Form>

        
           <Button
        style={{ fontWeight: "700",marginTop:"30px" }}
        variant="default"
        className="signup-confirm"
        onClick={(e) => {
          e.preventDefault();
         
        }}
      >
       Submit
      </Button>
          
</section>
</div>
  )
}

export default FirstPage;

