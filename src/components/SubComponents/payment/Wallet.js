import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Card, Modal, Spinner } from "react-bootstrap";
import { PageWrap } from '../PageWrap';
import "../Button.css";
import "./Wallet.css"

import logo from "../../../images/Revolut-logo-1.gif"

import RevolutPay from "./RevolutPay"

import { connect } from "react-redux";

// Loading component to be displayed while waiting for data
const SpinnerComponent = () => {
  return (
    <Spinner animation="border" />
  );
};

const WalletComponent = (props) => {
  const [balance, setBalance] = useState(0);
  const [amountTransfer, setAmountTransfer] = useState('');
  const [amountDeposit, setAmountDeposit] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalTransfer, setShowModalTransfer] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true); 

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="http://34.123.239.70:5000"


  // Fetch the user's wallet balance from the backend
  useEffect(() => {

    // const baseUrl = process.env.REACT_APP_BASE_URL_TEST;

    fetch(`${baseUrlProd}/v1/transaction/balance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: props.profile.uid }),
    })
      .then(response => response.json())
      .then(data => {
        setBalance(data.userBalance);
      })
      .catch(error => {
        console.error('Error fetching balance:', error);
      });
  }, [props.profile, balance]);  // Empty dependency array ensures this effect runs only once

  // Function to handle the transfer
  const handleTransfer = () => {
      
    const transferData = {
      user: props.profile.uid,
      amount: parseFloat(amountTransfer),
      email: recipientEmail,
    };

    // Make a POST request to the backend to initiate the transfer
    fetch(`${baseUrlProd}/v1/transaction/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transferData),
    })
      .then(response => response.json())
      .then(data => {
        // Update the balance after successful transfer
        setBalance(data.newBalance);
        // Reset the form fields
        setAmountTransfer('');
        setRecipientEmail('');
      })
      .catch(error => {
        console.error('Error transferring funds:', error);
      })
      .finally(() => {
        setIsLoadingBalance(false); // Mark balance loading as complete, regardless of success or error
      });
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalTransferOpen = () => {
    setShowModalTransfer(true);
  };

  const handleModalTransferClose = () => {
    setShowModalTransfer(false);
  };



  return (
    <PageWrap goTo="/account" header="Wallet">

    <div className="page-container">
      <div className="d-flex flex-column">

        {/* Wallet Balance */}
        <Card className=" custom-card mb-3">
        <div className="card-overlay"></div>
          <Card.Body>
            <h2 className='wallet-balance'>£{balance}</h2>
            <h5>Current Balance</h5>
          </Card.Body>
        </Card>

        {/* First Card */}
        <div className="d-flex">
          <Card className="mr-3">
            <Card.Body>
              <h5>Share Voucher</h5>
              <Form
                className="custom-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleModalTransferOpen(); 
                }}
              >
                <Form.Group>
                  <InputGroup>
                    <Form.Control
                      className="signup-input-meal-name"
                      id="quantity"
                      type="number"
                      placeholder='Enter Amount'
                      min="0"
                      step="1"
                      onChange={(e) => setAmountTransfer(e.target.value)}
                      value={amountTransfer}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <InputGroup>
                    <Form.Control
                      className="signup-input-meal-name"
                      placeholder='Enter Reciever Email'
                      id="quantity"
                      type="text"
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      value={recipientEmail}
                    />
                  </InputGroup>
                </Form.Group>
                <div style={{ alignItems: "center" }}>
                  <Button className="blue-btn shadow-none mt-3" type="submit">
                    Send
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Modal for the first card */}
          <Modal show={showModalTransfer} onHide={handleModalTransferClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Transfer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to transfer £{amountTransfer} to {recipientEmail}?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="grey-btn" onClick={handleModalTransferClose}>
                Cancel
              </Button>
              <Button className="blue-btn" onClick={() => {
                handleTransfer();
                handleModalTransferClose();
              }}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Second Card */}
          <Card>
            <Card.Body>
            <h5>Deposit Funds</h5>
            <Form
                    className="custom-form"
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleTransfer();
                    }}
                >
                <Form.Group>
                  <InputGroup>
                    <Form.Control
                      className="signup-input-meal-name"
                      id="quantity"
                      type="number"
                      placeholder='Enter Amount'
                      min="0"
                      step="1"
                      onChange={(e) => setAmountDeposit(e.target.value)}
                      value={amountDeposit}
                    />
                  </InputGroup>
                </Form.Group>
                <div style={{ alignItems: "center" }}>
                  <Button 
                  className="blue-btn shadow-none mt-3" 
                  onClick={handleModalOpen} // Open the modal
                  >
                    Deposit
                  </Button>
                </div>
                        
                </Form>

              {/* Modal for the second form */}
              <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Deposit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <RevolutPay amount={amountDeposit} />
                </Modal.Body>
              </Modal>

            </Card.Body>
          </Card>
        </div>
        {/* Powered by Logo */}
          <div className="powered-by-logo">
            <img
              src={logo}
              alt="Powered by Logo"
              className="powered-by-logo-img"
            />
            <p>Powered by</p>

          </div>   
      </div>
    </div>
		</PageWrap>

  );
};

const mapStateToProps = (state) => {
    return {
      profile: state.firebase.profile,
    };
  };
 
export default connect(mapStateToProps)(WalletComponent);
