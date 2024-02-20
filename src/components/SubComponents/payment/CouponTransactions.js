import React, { useState, useEffect } from 'react';
import { Badge, ListGroup, InputGroup, Button, Alert, Modal, Spinner, Form } from "react-bootstrap";
import { PageWrap } from '../PageWrap';
import "../Button.css";
import "./CouponTransactions.css"
import Swal from 'sweetalert2';

import { getCurrencySymbol } from '../../../config/CurrerncyUtils';

import moment from 'moment';
import * as XLSX from 'xlsx';

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
  const [phoneList, setPhoneList] = useState([]);
  const [phoneInput, setPhoneInput] = useState('');

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

// Function to add phone numbers to the phoneList
const handleAddPhone = () => {
  // Similar to handleAddEmail
  const newPhones = phoneInput.split(',').map(phone => phone.trim());
  const uniquePhones = Array.from(new Set(newPhones.filter(phone => phone !== '')));
  const filteredUniquePhones = uniquePhones.filter(phone => !phoneList.includes(phone));
  setPhoneList(prevPhoneList => [...prevPhoneList, ...filteredUniquePhones]);
  setPhoneInput('');
};

// Function to remove an email from the emailList
const handleRemoveEmail = (email) => {
  // Update the emailList state by filtering out the removed email
  setEmailList(prevEmailList => prevEmailList.filter(item => item !== email));
};

// Function to remove a phone number from the phoneList
const handleRemovePhone = (phone) => {
  setPhoneList(prevPhoneList => prevPhoneList.filter(item => item !== phone));
};

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const emailColumn = 'A'; // Assuming emails are in the first column

        // Extract email addresses and update the emailList state
        const extractedEmails = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          range: 1, // Start from the first row (assuming headers are in the first row)
        }).flat();

        console.log('Workbook:', workbook);
        console.log('Sheet Name:', sheetName);
        console.log('Sheet:', sheet);
        console.log('Extracted Emails:', extractedEmails);

        // Update the emailList state
        setEmailList((prevEmailList) => [...prevEmailList, ...extractedEmails]);
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  }
};

// Update the file upload function to handle phone numbers
const handlePhoneFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const emailColumn = 'A'; // Assuming emails are in the first column

        // Extract email addresses and update the emailList state
        const extractedPhoneNumbers = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          range: 1, // Start from the first row (assuming headers are in the first row)
        }).flat();

        console.log('Workbook:', workbook);
        console.log('Sheet Name:', sheetName);
        console.log('Sheet:', sheet);
        console.log('Extracted Emails:', extractedPhoneNumbers);

        // Update the emailList state
        setPhoneList((prevPhoneList) => [...prevPhoneList, ...extractedPhoneNumbers]);
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  }
};


    // Function to update the email input value
    const handleEmailInputChange = (e) => {
      setEmailInput(e.target.value);
    };

    // Function to update the email input value
    const handlePhoneInputChange = (e) => {
      setPhoneInput(e.target.value);
    };

      // Function to update the message input value
  const handleMessageInputChange = (e) => {
    setMessage(e.target.value);
  };


  // const sendEmail = async (email, message) => {
  //   try {
  //     const response = await fetch(`${baseUrlProd}/v1/auth/send-email-voucher`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: email, message: message }),
  //     });
  
  //     if (response.ok) {
  //       console.log(`Email sent to ${email}`);
  
  //       const customMessage = 'Hey, I just created a coupon with WFT! #WFT #WorldFoodTracker #Intellidigest';
  //       const encodedMessage = encodeURIComponent(customMessage);
  //       const couponURL = 'https://worldfoodtracker.com/create-coupon';
  
  //       // Create a div element for the social share buttons
  //       const socialShareContainer = document.createElement('div');
  //       socialShareContainer.className = 'social-share-container';
  
  //       // Facebook icon using Font Awesome
  //       const facebookIcon = document.createElement('i');
  //       facebookIcon.className = 'fab fa-facebook'; // Font Awesome classes for Facebook icon
  //       socialShareContainer.appendChild(facebookIcon);
  
  //       // Facebook share button
  //       const facebookShareButton = document.createElement('a');
  //       facebookShareButton.target = '_blank';
  //       facebookShareButton.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(couponURL)}&quote=${encodedMessage}`;
  //       facebookShareButton.className = 'facebook-share-button';
  //       facebookShareButton.innerText = 'Share';
  
  //       socialShareContainer.appendChild(facebookShareButton);
  
  //       // Twitter icon using Font Awesome
  //       const twitterIcon = document.createElement('i');
  //       twitterIcon.className = 'fab fa-twitter'; // Font Awesome classes for Twitter icon
  //       socialShareContainer.appendChild(twitterIcon);
  
  //       // Twitter share button
  //       const twitterShareButton = document.createElement('a');
  //       twitterShareButton.target = '_blank';
  //       twitterShareButton.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(couponURL)}&text=${encodedMessage}`;
  //       twitterShareButton.className = 'twitter-share-button';
  //       twitterShareButton.innerText = 'Tweet';
  
  //       socialShareContainer.appendChild(twitterShareButton);
  
  //       Swal.fire({
  //         title: 'Success!',
  //         text: 'Email has been sent',
  //         icon: 'success',
  //         html: socialShareContainer, // Set the HTML content of the modal
  //       });
  //     } else {
  //       console.error(`Failed to send email to ${email}`);
  //       Swal.fire({
  //         title: 'Error!',
  //         text: 'Something went wrong. Please contact us at info@intellidigest.com',
  //         icon: 'error',
  //       });
  //     }
  //   } catch (err) {
  //     console.error(`Error sending email to ${email}: ${err.message}`);
  //   }
  // };

  const sendCoupon = async (contact, message) => {
    try {
      const isEmail = /\S+@\S+\.\S+/.test(contact);
      const isPhoneNumber = /^\+?[1-9]\d{1,14}$/.test(contact);
  
      let response;
      if (isEmail) {
        response = await sendEmail(contact, message);
      } else if (isPhoneNumber) {
        response = await sendSMS(contact, message);
      }
  
      if (response.success) {
        // Display success modal only if the API call is successful
        const customMessage = 'Hey, I just created a coupon with WFT! #WFT #WorldFoodTracker #Intellidigest';
        const encodedMessage = encodeURIComponent(customMessage);
        const couponURL = 'https://worldfoodtracker.com/create-coupon';
  
        const socialShareContainer = document.createElement('div');
        socialShareContainer.className = 'social-share-container';
  
        const facebookIcon = document.createElement('i');
        facebookIcon.className = 'fab fa-facebook';
        socialShareContainer.appendChild(facebookIcon);
  
        const facebookShareButton = document.createElement('a');
        facebookShareButton.target = '_blank';
        facebookShareButton.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(couponURL)}&quote=${encodedMessage}`;
        facebookShareButton.className = 'facebook-share-button';
        facebookShareButton.innerText = 'Share';
  
        socialShareContainer.appendChild(facebookShareButton);
  
        const twitterIcon = document.createElement('i');
        twitterIcon.className = 'fab fa-twitter';
        socialShareContainer.appendChild(twitterIcon);
  
        const twitterShareButton = document.createElement('a');
        twitterShareButton.target = '_blank';
        twitterShareButton.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(couponURL)}&text=${encodedMessage}`;
        twitterShareButton.className = 'twitter-share-button';
        twitterShareButton.innerText = 'Tweet';
  
        socialShareContainer.appendChild(twitterShareButton);
  
        Swal.fire({
          title: 'Success!',
          text: response.message,
          icon: 'success',
          html: socialShareContainer,
        });
      } else {
        // Display error modal if the API call is not successful
        console.error(`Error sending coupon to ${contact}: ${response.message}`);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error sending coupon:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
      });
    }
  };
  
  
  const sendEmail = async (email, message) => {
    try {
      // ... (existing code for sending email)
      const response = await fetch(`${baseUrlProd}/v1/auth/send-email-voucher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, message: message }),
      });
  
      return { success: true, message: `Email sent to ${email}` };
    } catch (error) {
      console.error(`Error sending email to ${email}: ${error.message}`);
      throw new Error(`Error sending email to ${email}`);
    }
  };
  
  
  const sendSMS = async (phoneNumber, message) => {
    try {
      // ... (existing code for sending SMS)
      const response = await fetch(`${baseUrlProd}/v1/auth/send-sms-voucher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phoneNumber, message: message }),
      });
  
      return { success: true, message: `SMS sent to ${phoneNumber}` };
    } catch (error) {
      console.error(`Error sending SMS to ${phoneNumber}: ${error.message}`);
      throw new Error(`Error sending SMS to ${phoneNumber}`);
    }
  };
  
    
//   // Update the handleSendEmails function to also send SMS
// const handleSendEmails = async () => {
//   const emailsArray = emailList;
//   const phonesArray = phoneList;

//   for (const email of emailsArray) {
//     await sendEmail(email, message);
//   }

//   for (const phone of phonesArray) {
//     await sendSMS(phone, message);
//   }

//   handleCloseModal(); // Close the modal after sending
// };

// Function to handle sending email to multiple addresses
const handleSendEmails = async () => {
  const contactsArray = [...emailList, ...phoneList];

  for (const contact of contactsArray) {
    await sendCoupon(contact, message);
  }

  handleCloseModal(); // Close the modal after sending
};

const handleRemoveAllEmails = () => {
  setEmailList([]); // Clear the emailList
};

const handleRemoveAllPhoneNumbers = () => {
  setPhoneList([]); // Clear the emailList
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
    <Alert variant="primary">
      You can also add emails or phone numbers from an Excel sheet. Make sure emails/Phone numbers are in the first column.
    </Alert>
    <div className="d-flex">
      <Form>
        <Form.Group>
          <InputGroup>
              <Form.Control
                type="text" 
                placeholder='enter email'
                value={emailInput}
                onChange={handleEmailInputChange} // Add this line to handle input changes
                className=""   // Add this class
              />
              <Button 
                onClick={handleAddEmail} 
                className="green-btn shadow-none"
              >
                Add
              </Button>
          </InputGroup>
        </Form.Group>
      </Form>
        
            
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

          {/* Add this button for removing all emails */}
          {emailList.length > 0 && (
              <Button variant="danger" onClick={handleRemoveAllEmails}>
                Remove All Emails
              </Button>
            )}

          {/* Add this inside Modal.Body */}
          <div className="w-100">

            <input type="file" accept=".xlsx" onChange={handleFileUpload} className="w-100"  />

          </div>
           {/* Message input */}  
           <hr />
        
    <div className="d-flex">
      <Form>
        <Form.Group>
          <InputGroup>
              <Form.Control
                type="text" 
                placeholder='enter phone number'
                value={phoneInput}
                onChange={handlePhoneInputChange} // Add this line to handle input changes
                className=""   // Add this class
              />
              <Button 
                onClick={handleAddPhone} 
                className="green-btn shadow-none"
              >
                Add
              </Button>
          </InputGroup>
        </Form.Group>
      </Form>
        
            
            {/* Display added emails */}
          
          </div>

          {phoneList.length > 0 && (
            <div>
              <p>Added Phone Numbers:</p>
              <ul>
                {phoneList.map((phone, index) => (
                  <li key={index}>{phone}
                    <span 
                      className="remove-icon" 
                      onClick={() => handleRemovePhone(phone)}
                    >
                      &times;
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add this button for removing all emails */}
          {phoneList.length > 0 && (
              <Button variant="danger" onClick={handleRemoveAllPhoneNumbers}>
                Remove All Phone Numbers
              </Button>
            )}

          {/* Add this inside Modal.Body */}
          <div className="w-100 mb-3">
            <input type="file" accept=".xlsx" onChange={handlePhoneFileUpload} className="w-100"  />

          </div>
           {/* Message input */}
           {/* Adjust the width of the textarea to cover the modal body */}
          <div className="w-100" >
            <textarea
              rows="4"
              value={message}
              onChange={handleMessageInputChange}
              className="w-100" // Use Bootstrap class to make it full-width
            />            
          </div>
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