import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Card, Modal, Spinner } from "react-bootstrap";
import { PageWrap } from '../PageWrap';
import "../Button.css";
import "./Wallet.css"

import logo from "../../../images/Revolut-logo-1.gif"
import Swal from 'sweetalert2';

import RevolutPay from "./RevolutPay"

import { connect } from "react-redux";

// Loading component to be displayed while waiting for data
const SpinnerComponent = () => {
  return (
    <Spinner animation="border" />
  );
};

const CouponComponent = (props) => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalRedeem, setShowModalRedeem] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true); 

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"


  // Fetch the user's wallet balance from the backend
  useEffect(() => {

    // const baseUrl = process.env.REACT_APP_BASE_URL_TEST;

    fetch(`${baseUrlDev}/v1/transaction/balance`, {
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
  const handleCreateCoupon = () => {
      
    const transferData = {
      amount: parseFloat(amount),
      numberOfRecipients: recipient,
      userID: props.profile.uid,
    };

    // Make a POST request to the backend to initiate the transfer
    fetch(`${baseUrlDev}/v1/coupon/create-coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transferData),
    })
      .then(response => response.json())
      .then(data => {
        // Update the balance after successful transfer
        //setBalance(data.newBalance);
        // Reset the form fields
        setAmount('');
        setRecipient('');
        Swal.fire({
          title: 'Success!',
          text: 'Coupon has been created',
          icon: 'success',
        });
      })
      .catch(error => {
        console.error('Error transferring funds:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please check your wallet balance and try again',
          icon: 'error',
        });
      })
      .finally(() => {
        setIsLoadingBalance(false); // Mark balance loading as complete, regardless of success or error
      });
  };

  // Function to handle the transfer
  const handleRedeemCoupon = () => {
      
    const transferData = {
      code: couponCode,
      userID: props.profile.uid,
    };

    // Make a POST request to the backend to initiate the transfer
    fetch(`${baseUrlDev}/v1/coupon/redeem-coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transferData),
    })
      .then(response => response.json())
      .then(data => {
        // Reset the form fields
        setCouponCode('');
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

  const handleModalRedeemOpen = () => {
    setShowModalRedeem(true);
  };

  const handleModalRedeemClose = () => {
    setShowModalRedeem(false);
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
        <div className="d-flex flex-column flex-md-row">
        <Card className="flex-grow-1 mb-3 mb-md-0">
            <Card.Body>
              <h5>Create Voucher</h5>
              <Form
                className="custom-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleModalOpen(); 
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
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <InputGroup>
                    <Form.Control
                      className="signup-input-meal-name"
                      id="quantity"
                      type="number"
                      placeholder='Enter Number of recipient'
                      min="0"
                      step="1"
                      onChange={(e) => setRecipient(e.target.value)}
                      value={recipient}
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
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to create coupon worth £{amount} for {recipient} person?</p>
              <p>A service fee of 15% would be deducted from your account</p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="grey-btn" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button className="blue-btn" onClick={() => {
                handleCreateCoupon();
                handleModalClose();
              }}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
        {/* Powered by Logo */}
          {/* <div className="powered-by-logo">
            <img
              src={logo}
              alt="Powered by Logo"
              className="powered-by-logo-img"
            />
            <p>Powered by</p>

          </div>    */}
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
 
export default connect(mapStateToProps)(CouponComponent);
