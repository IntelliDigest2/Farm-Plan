import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, Card, Modal, Spinner } from "react-bootstrap";
import { connect } from "react-redux";

const WithdrawFunds = ( props ) => {

  const [businessType, setBusinessType] = useState('');
  const [pin, setPin] = useState(''); // State to store PIN entered by the user


  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"
  const currentHost = window.location.origin;
  const successUrl = `${currentHost}/payment-success`;

  const [amountWithdraw, setAmountWithdraw] = useState('');

  const [showModal, setShowModal] = useState(false);

  const userID = props.profile.uid
  const accountID = props.profile.accountID


  const handleWithdraw = async () => {

    try {

       // Verify the PIN before allowing the withdrawal
       const pinVerificationResponse = await fetch(`${baseUrlDev}/v1/auth/verify-pin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          enteredPin: pin, // Send the PIN entered by the user
        }),
      });

      if(pinVerificationResponse.ok){
        const response = await fetch(`${baseUrlDev}/v1/payment/pay-out-fund`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            userID: userID,
            accountID: accountID,
            amount: amountWithdraw,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const accountID = data.accountID
          console.log("account id:", accountID);
        } else {
          console.error("Failed to fetch account id");
        }

      } else {
        console.error("PIN verification failed");
        // You can handle the case where PIN verification fails, e.g., show an error message.
      }

      } catch (error) {
        console.error(error);
      }};

      const handleBusinessTypeChange = (e) => {
        // Update the businessType state when the user selects a new option
        setBusinessType(e.target.value);
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