import React,{useState} from 'react'
import "./Question.css"
import { useHistory } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import {connect} from "react-redux"

import { createExample } from "../../../../../store/actions/consultingActions"



const Question2 = (props) => {
const[completed,setCompleted] =useState(false)
const [user, setUser] =useState({
  fullName: "",
  email :"",
  urlLink :"",
  experience :"",
  expertise :"",
  phoneCall:"",
  onlineMeeting:"",
  writtenFeedback:"",
  inPersonVisit :"",
  consultantVisit:"",
  summary:""
})
const history = useHistory();



// for the form
function handleSubmit(){
 var data ={
    user : user,
  }
  props.createExample(data);
  setCompleted(true)
  }



    function handleNext(){
      if(!completed){
       history.push(`/consultants/onboard`)
      }
      else{
        history.push(``)
      }
    }



  return (
   
    <div className='question-contanier'>
        <section style={{height:"auto"}} className="question-main">
            <header className='logo-header'>
        <img src='Green.png' alt='logo' className='logo1-btn'/>
        <p>Become a Consultant with us.</p>
        </header>
{/* bootstrap form */}
<Form style={{marginTop:"180px"}} 
  onSubmit= {(e) =>{
    
    e.preventDefault();
    handleSubmit();
   handleNext();
  }}
>
  
              <Form.Group controlId="formBasicName" className='form-group' >
                <Form.Label className='form-label'>1. Full Name<span style={{color:"red"}}>*</span></Form.Label>
                <Form.Control type="text"  onChange ={(e)=> setUser({...user, fullName: e.target.value})}  className='form-control' required ></Form.Control>
              </Form.Group>
              

              <Form.Group controlId="formBasicEmail" className='form-group'>
            <Form.Label className='form-label'>2. Email<span style={{color:"red"}}>*</span></Form.Label>
            <Form.Control type="email"  className='form-control'  onChange ={(e)=> setUser({...user, email: e.target.value})} required></Form.Control>
           </Form.Group>


           <Form.Group controlId="formBasicUrl" className='form-group'>
           <Form.Label className='form-label'>3. Website Url(social media link)<span style={{color:"red"}}>*</span></Form.Label>
           <Form.Control type="text"  className='form-control'  onChange ={(e)=> setUser({...user, urlLink: e.target.value})} required></Form.Control>
      </Form.Group>

           <Form.Group controlId="formBasicText" className='form-group'>
           <Form.Label className='form-label1'> 4. How Long have you been in business?<span style={{color:"red"}}>*</span></Form.Label>
          <Form.Control type="text"  className='form-control'  onChange ={(e)=> setUser({...user, experience: e.target.value})} required></Form.Control>
         </Form.Group>

         <Form.Group className='form-group'>
<Form.Label className='form-label'>5. Field of Expertise<span style={{color:"red"}}>*</span></Form.Label>
<Form.Control as ="select"  className='form-control'  onChange ={(e)=> setUser({...user, expertise: e.target.value})}required>
<option>Select</option>
<option>Dietician</option>
<option>Nutrition</option>
<option>Food and Beverage</option>
<option>Aquaculture</option>
<option>Horticulture</option>
<option>Agro-Feed</option>
</Form.Control>
</Form.Group>


<Form.Group className='form-group'>
<Form.Label>6. Service Charge (hourly rate)<span style={{color:"red"}}>*</span></Form.Label>
<Form.Control as ="select"  className='form-control'  onChange ={(e)=> setUser({...user, phoneCall: e.target.value})} required>
<option>Phone Call</option>
<option>$20</option>
<option>$25</option>
<option>$30</option>
<option>$35</option>
<option>$50</option>
<option>$65</option>
<option>$70</option>
<option>$75</option>
<option>$80</option>
<option>$90</option>
<option>$95</option>
<option>$100</option>
<option>$120</option>
<option>$125</option>
<option>other</option>
</Form.Control>



<Form.Control as ="select"  className='form-control'  onChange ={(e)=> setUser({...user, onlineMeeting: e.target.value})} required>
<option>Online Meeting</option>
<option>$20</option>
<option>$25</option>
<option>$30</option>
<option>$35</option>
<option>$50</option>
<option>$65</option>
<option>$70</option>
<option>$75</option>
<option>$80</option>
<option>$90</option>
<option>$95</option>
<option>$100</option>
<option>$120</option>
<option>$125</option>
<option>other</option>
</Form.Control>

<Form.Control as ="select"  className='form-control' onChange ={(e)=> setUser({...user, writtenFeedback: e.target.value})} required>
<option>Written Feedback</option>
<option>$20</option>
<option>$25</option>
<option>$30</option>
<option>$35</option>
<option>$50</option>
<option>$65</option>
<option>$70</option>
<option>$75</option>
<option>$80</option>
<option>$90</option>
<option>$95</option>
<option>$100</option>
<option>$120</option>
<option>$125</option>
<option>other</option>
</Form.Control>

<Form.Control as ="select"  className='form-control'  onChange ={(e)=> setUser({...user, inPersonVisit: e.target.value})} required>
<option>In-person visit to Consultant</option>
<option>$20</option>
<option>$25</option>
<option>$30</option>
<option>$35</option>
<option>$50</option>
<option>$65</option>
<option>$70</option>
<option>$75</option>
<option>$80</option>
<option>$90</option>
<option>$95</option>
<option>$100</option>
<option>$120</option>
<option>$125</option>
<option>other</option>
</Form.Control>

<Form.Control type="text" placeholder="Consultant Visit to Client"  className='form-control'  onChange ={(e)=> setUser({...user, consultantVisit: e.target.value})}required ></Form.Control>
</Form.Group>



        
              <Form.Group controlId="formBasicName" className='form-group'>
                <Form.Label className='form-label'>8. Brief Summary of your Expertise/Key areas in the Food System.<span style={{color:"red"}}>*</span></Form.Label>
             <Form.Control as="textarea" rows ={4} type="text" onChange ={(e)=> setUser({...user, summary: e.target.value})}   required></Form.Control>
              </Form.Group>


              <Form.Group controlId="formBasicName" className='form-group'>
                <Form.Label  className='form-label'>9. Any other thing you would like to share with us ?(optional)</Form.Label>
                <Form.Control as="textarea" rows ={4} type="text"  ></Form.Control>
              </Form.Group>

              <button className='question2-btn' type="submit" value="submit" >Submit</button> 

              
</Form>


 </section>
 </div>
 )
}

const mapDispatchToProps =(dispatch) =>{
  return {
    createExample:(data) =>dispatch(createExample(data))
  }
}

export default connect(null, mapDispatchToProps)(Question2);


 


