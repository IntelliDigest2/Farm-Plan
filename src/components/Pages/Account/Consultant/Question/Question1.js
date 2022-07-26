import React, { useState} from 'react'

import "./Question.css"
import Form from "react-bootstrap/Form"
import {connect} from 'react-redux'
import { useHistory } from 'react-router-dom'


const Question1 = (props) => {
const [answer,setAnswer] = useState("")
 const [message, setMessage] = useState(false)
 const history =useHistory();
                                                                           

function handleClick(){
  
      if (answer === "Freelancer" && props.auth !== null) {
         history.push( "/consultants/question2")
     }
      else if (answer === "Business" && props.profile.buildingFunction === "Offices" ){
        history.push( "/consultants/question2")
    }
    else if (answer === "Business" && props.profile  !== "Offices" ){
      setMessage("You need to have your business registered under world food tracker")
    }
    else return null
}

function subSignup(){
 history.push( "/sub-signup")

}

   
    
  
  return (
    <div className='question-contanier'>
        <div className='question-subcontanier'>
          <header className='logo-header'>
            <img src='Green.png' alt='logo' className='logo1-btn'/>
             <p>Become a Consultant with us.</p>
        </header>

        <Form>

        <Form.Group className='form-group1'>
        <Form.Label className='label-text'> 1.  Are you a Freelancer or part of an Organization?</Form.Label>
        <Form.Control as ="select"  
        value ={answer}
        onChange={(e) => setAnswer(e.target.value)}
         className='form-control'>
           <option>Select</option>
          <option >Freelancer</option>
          <option>Business</option>
        </Form.Control>
        </Form.Group>

       <Form.Group className='form-group1'>
        <Form.Label className='label-text'> 2.  Do you have a Business/Personal account on world food tracker?</Form.Label>
        <Form.Control as ="select"  className='form-control'>
           <option>Select</option>
          <option>Yes</option>
          <option>No</option>
        </Form.Control>
        </Form.Group>
       </Form>
       <button
       className='question-button'
         onClick={handleClick}
    >
         Auth to WFT</button>
         {message && (
          <div className='error-div-contanier'>
           <p>{message}</p>
           <button 
           onClick={subSignup}
           className="error-message-button">Sign up here</button>
       </div>
       )}
        </div>

    </div>
  )
}
const mapStateToProps =(state) =>{
  return{
    auth: state.firebase.auth.uid,
    profile: state.firebase.profile
    
  }
}
export default connect (mapStateToProps)(Question1);