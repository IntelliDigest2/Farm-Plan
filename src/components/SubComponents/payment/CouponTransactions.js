import React, { useState, useEffect } from 'react';
import { Badge, ListGroup, Button, Card, Modal, Spinner } from "react-bootstrap";
import { PageWrap } from '../PageWrap';
import "../Button.css";
import "./Transactions.css"
import Swal from 'sweetalert2';

import { getCurrencySymbol } from '../../../config/CurrerncyUtils';

import moment from 'moment';

import { connect } from "react-redux";

// Loading component to be displayed while waiting for data
const SpinnerComponent = () => {
  return (
    <Spinner animation="border" />
  );
};

const CouponTransaction = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [message, setMessage] = useState("Congratulations 🎉 , you have been gifted a World Food Tracker Coupon worth GBP0. Coupon Code: xxxxxxx");


  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"


  const userCountryCode = props.profile.country;
	const userCurrency = getCurrencySymbol(userCountryCode);

  // Fetch the user's wallet balance from the backend
  useEffect(() => {

    fetch(`${baseUrlProd}/v1/coupon/coupon-transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: props.profile.uid }),
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.userTransactions)) {
          setTransactions(data.userTransactions);
        } else {
          console.error('Invalid data format for transactions:', data);
        }
      })

      .catch(error => {
        console.error('Error fetching transanctions:', error);
      });
  }, [props.profile]);  // Empty dependency array ensures this effect runs only once

  //console.log("transactions", transactions)

   // Function to open the modal for a specific coupon
   const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

// Function to add emails to the emailList
const handleAddEmail = () => {
  // Split the input value by commas and trim whitespaces
  const newEmails = emailInput.split(',').map(email => email.trim());

  // Filter out empty strings and duplicate emails
  const uniqueEmails = Array.from(new Set(newEmails.filter(email => email !== '')));

  // Filter out emails already in the list
  const filteredUniqueEmails = uniqueEmails.filter(email => !emailList.includes(email));

  // Update the emailList state
  setEmailList(prevEmailList => [...prevEmailList, ...filteredUniqueEmails]);

  // Clear the email input
  setEmailInput('');
};

// Function to remove an email from the emailList
const handleRemoveEmail = (email) => {
  // Update the emailList state by filtering out the removed email
  setEmailList(prevEmailList => prevEmailList.filter(item => item !== email));
};



    // Function to update the email input value
    const handleEmailInputChange = (e) => {
      setEmailInput(e.target.value);
    };

      // Function to update the message input value
  const handleMessageInputChange = (e) => {
    setMessage(e.target.value);
  };


    const sendEmail = async (email, message) => {
      try {
        const response = await fetch(`${baseUrlProd}/v1/auth/send-email-voucher`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, message: message }),
        });
    
        if (response.ok) {
          console.log(`Email sent to ${email}`);
          Swal.fire({
            title: 'Success!',
            text: 'Email has been sent',
            icon: 'success',
          });
        } else {
          console.error(`Failed to send email to ${email}`);
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please contact us at info@intellidigest.com',
            icon: 'error',
          });
        }
      } catch (err) {
        console.error(`Error sending email to ${email}: ${err.message}`);
      }
    };

  // Function to handle sending email to multiple addresses
const handleSendEmails = async () => {
  const emailsArray = emailList;

  for (const email of emailsArray) {
    await sendEmail(email, message); // Assuming emailMessage is defined elsewhere
  }

  handleCloseModal(); // Close the modal after sending
};  

  return (
    <PageWrap goTo="/account" header="Wallet">

      <div className="page-container">
        <div className="list-container">
          {transactions.map((item, index) => (
            <div key={index} className={`list-item ${index !== 0 ? 'list-separator' : ''}`}>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                  <Button variant="primary" onClick={handleOpenModal}>
                      Share Coupon
                    </Button>
                  <div className="fw-bold">
                    <div className="d-flex align-items-center">
                      {/* <span className={`item-operation ${item.type === "Debit" ? "debit" : "credit"}`}>
                        {item.type}
                      </span> */}
                      <span className="item-amount">{item.code}</span>
                      
                    </div>
                    <div style={{ display: "block", color: "green" }}>
                        <span className="item-amount">{userCurrency}{item.amount}</span>
                      </div>
                    <div className="date">
                      {moment(item.createdAt).format("D MMM YYYY [at] HH:mm")}
                    </div>
                  </div>
                  </div>
                  <Badge bg="primary" pill className="transaction-id">
                    <div className="transaction-id-content">
                      <span className="operation">{item.totalRedemptions}</span>
                      {/* <span className="transaction-id">{item.transactionID}</span> */}
                    </div>
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </div>
          ))}
        </div>
      </div>

     
<Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Share Coupon</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Enter a list of emails separated by commas:</p>
    <div className="d-flex">
            <input 
              type="text" 
              value={emailInput}
              onChange={handleEmailInputChange} // Add this line to handle input changes
            />
            <Button variant="primary" onClick={handleAddEmail}>
              Add
            </Button>
            {/* Display added emails */}
          
          </div>

          {emailList.length > 0 && (
            <div>
              <p>Added Emails:</p>
              <ul>
                {emailList.map((email, index) => (
                  <li key={index}>{email}
                    <span 
                      className="remove-icon" 
                      onClick={() => handleRemoveEmail(email)}
                    >
                      &times;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
           {/* Message input */}
           <p>Enter a message:</p>
          <textarea
            rows="4"
            value={message}
            onChange={handleMessageInputChange}
          />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handleSendEmails}>
      Send Emails
    </Button>
  </Modal.Footer>
</Modal>

		</PageWrap>
  );
};

const mapStateToProps = (state) => {
    return {
      profile: state.firebase.profile,
    };
  };
 
export default connect(mapStateToProps)(CouponTransaction);