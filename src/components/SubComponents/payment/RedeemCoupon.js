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

const CouponComponent = (props) => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalRedeem, setShowModalRedeem] = useState(false);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true); 

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="http://34.123.239.70:5000"


  // Fetch the user's wallet balance from the backend
  useEffect(() => {

    // const baseUrl = process.env.REACT_APP_BASE_URL_TEST;

    fetch(`${baseUrlProd}/v1/coupon/balance`, {
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
  const handleRedeemCoupon = () => {
      
    const transferData = {
      code: couponCode,
      userID: props.profile.uid,
    };

    // Make a POST request to the backend to initiate the transfer
    fetch(`${baseUrlProd}/v1/coupon/redeem-coupon`, {
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

        <div className="d-flex flex-column flex-md-row">
          
          {/* Second Card */}
          <Card className="flex-grow-1 mb-3 mb-md-0">
            <Card.Body>
            <h5>Redeem Coupon</h5>
            <Form
                    className="custom-form"
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleModalRedeemOpen();
                    }}
                >
                <Form.Group>
                  <InputGroup>
                    <Form.Control
                      className="signup-input-meal-name"
                      id="quantity"
                      type="text"
                      placeholder='Enter Coupon Code'
                      onChange={(e) => setCouponCode(e.target.value)}
                      value={couponCode}
                    />
                  </InputGroup>
                </Form.Group>
                <div style={{ alignItems: "center" }}>
                <Button className="blue-btn shadow-none mt-3" type="submit">
                    Redeem
                  </Button>
                </div>
                        
                </Form>

              {/* Modal for the second card */}
          <Modal show={showModalRedeem} onHide={handleModalRedeemClose}>
            <Modal.Header closeButton>
              <Modal.Title>Redeem</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to coninue to redeem this coupon?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="grey-btn" onClick={handleModalRedeemClose}>
                Cancel
              </Button>
              <Button className="blue-btn" onClick={() => {
                handleRedeemCoupon();
                handleModalRedeemClose();
              }}>
                Yes
              </Button>
            </Modal.Footer>
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
 
export default connect(mapStateToProps)(CouponComponent);
