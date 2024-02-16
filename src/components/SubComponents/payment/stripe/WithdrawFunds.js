import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, Card, Modal, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const WithdrawFunds = ( props ) => {
  const history = useHistory();

  const [businessType, setBusinessType] = useState('');
  const [pin, setPin] = useState(''); // State to store PIN entered by the user


  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"
  const currentHost = window.location.origin;
  const successUrl = `${currentHost}/payment-success`;

  const [amountWithdraw, setAmountWithdraw] = useState('');

  const [showModal, setShowModal] = useState(false);

  const userID = props.userID
  const currency = props.currency
  const accountID = props.profile.accountID


  const handleWithdraw = async () => {
    try {
      const pinVerificationResponse = await fetch(`${baseUrlProd}/v1/auth/verify-pin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          enteredPin: pin,
        }),
      });
  
      if (pinVerificationResponse.ok) {
        let endpoint;
        let requestBody;
  
        if (props.profile.region === 'Africa') {
          endpoint = `${baseUrlDev}/v1/payment/withdrawal-paystack`;
          requestBody = {
            userID: userID,
            amount: amountWithdraw,
          };
        } else {
          endpoint = `${baseUrlDev}/v1/payment/pay-out-fund`;
          requestBody = {
            userID: userID,
            accountID: accountID,
            amount: amountWithdraw,
          };
        }
  
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });
  
          if (response.ok) {
            const data = await response.json();
            const accountID = data.accountID;
            console.log("account id:", accountID);
  
            // Show a success alert
            Swal.fire({
              title: 'Success!',
              text: 'Withdrawal successful',
              icon: 'success',
            }).then(() => {
              history.push(`/withdrawal-success?amount=${amountWithdraw}&currency=${currency}`);
            });
          } else {
            const errorData = await response.json();
            if (errorData.error === 'InsufficientFunds') {
              // Show an error alert for insufficient funds
              Swal.fire({
                title: 'Error!',
                text: 'Insufficient funds in your wallet',
                icon: 'error',
              });
            } else {
              console.error("Failed to fetch account id", errorData);
              // Show an error alert for other withdrawal error
              Swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                icon: 'error',
              });
            }
          }
        } catch (error) {
          console.error("Error:", error);
          // Show a generic error alert for failed withdrawal
          Swal.fire({
            title: 'Error!',
            text: 'Failed to withdraw funds',
            icon: 'error',
          });
        }
      } else {
        console.error("PIN verification failed");
        // Show an error alert for wrong PIN
        Swal.fire({
          title: 'Error!',
          text: 'Wrong Withdrawal Pin',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      // Show a generic error alert for PIN verification failure
      Swal.fire({
        title: 'Error!',
        text: 'Failed to verify PIN',
        icon: 'error',
      });
    }
  };
  

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
      
  return (
   <>
   
            <Form
                    className="custom-form"
                    onSubmit={(e) => {
                    e.preventDefault();
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
                      onChange={(e) => setAmountWithdraw(e.target.value)}
                      value={amountWithdraw}
                    />
                  </InputGroup>
                </Form.Group>
                <div style={{ alignItems: "center" }}>
                  <Button 
                  className="blue-btn shadow-none mt-3" 
                  onClick={handleModalOpen} // Open the modal
                  >
                    Withdraw
                  </Button>
                </div>
                        
                </Form>

              {/* Modal for the second form */}
              <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Withdraw</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group>
                  <InputGroup>
                    <Form.Control
                      className="signup-input-meal-name"
                      id="pin"
                      type="password"
                      placeholder="Enter Your PIN"
                      onChange={(e) => setPin(e.target.value)}
                      value={pin}
                    />
                  </InputGroup>
                </Form.Group>       
                </Modal.Body>
                <Modal.Footer>
              <Button className="grey-btn" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button className="blue-btn" onClick={() => {
                handleWithdraw();
                handleModalClose();
              }}>
                Yes
              </Button>
            </Modal.Footer>
              </Modal>
   </>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(WithdrawFunds);