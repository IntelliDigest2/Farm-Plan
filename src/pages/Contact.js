import React from "react";
import "../App.css";

function Contact() {
  return (
    <div className="main-div-layout contact-container">
      <div className="contact-header">
      <i className="fa fa-group contact-logo"></i>
      <h1 className="contact-title">Contact Us</h1>

      </div>
      <div className="contact-text-layout">
        <h1 className="text-lg">If you are interested in this scheme and would like to request a SMART bin or have any enquiries, please complete the contact form below. We aim to respond to you via e-mail as soon as possilbe.</h1>
      </div>  
      <form action="#" className="contact-form">

        <div className="main-details-containter">
           {/*<label htmlFor="name">Name</label>*/}
        <input className="contact-details" type="text" id="name" name="name" placeholder="Name" required/>

{/*<label htmlFor="email">Email</label>*/}
<input className="contact-details" type="email" id="email" name="email" placeholder="Email Address" required/>

        </div>
        {/*<label htmlFor="email">Subject</label>*/}
        <input type="text" id="subject" name="subject" placeholder="Subject" required/>

        {/*<label htmlFor="message">Message</label>*/}
        <textarea id="message" name="message" placeholder="Message" required></textarea>
        <button className="btn" type="submit">Submit</button>

      </form> 
      <div className="contact-footer">
        <div className="contact-footer-layout telephone">
          <i className="fa fa-phone contact-footer-icon"></i>
          <div>
          <p>07795523201</p>
          <br/>
            <br/>
          </div>
        </div>
        <div className="contact-footer-layout email">
        <i className="fa fa-envelope-o contact-footer-icon"></i>
        <div>
            <p>INFO@INTELLIDIGEST.COM</p>
            <br/>
            <br/>
        </div>
        </div>
        <div className="contact-footer-layout address">
        <i className="fa fa-location-arrow contact-footer-icon"></i>
            <p>Edinburgh Business School</p>
            <p>Heriot Watt University</p>
            <p>Currie, EH14 4AS</p>
        </div>

      </div>
    </div>
  );
}

export default Contact;
