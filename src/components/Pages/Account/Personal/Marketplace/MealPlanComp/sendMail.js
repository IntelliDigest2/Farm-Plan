import React, { useRef } from "react";
import emailjs, { init } from "@emailjs/browser";

function SendMail() {
    init("pG3M3Ncz-i7qCJ2GD");
    const form = useRef();

    const handleSend = (e) => {
            e.preventDefault(); // Prevents default refresh by the browser
            emailjs.sendForm(`gmail`, process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_USER_ID)
            .then((result) => {
                alert("Message Sent, We will get back to you shortly", result.text);
            },
            (error) => {
                alert("An error occurred, Please try again", error.text);
        });
    };
    
  return (
    <div className="container">
      <form onSubmit={handleSend} ref={form}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="message">This item is close to expiry</label>
            <textarea
              type="text"
              className="form-control"
              id="inputmessage4"
              name="user_message"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default SendMail;