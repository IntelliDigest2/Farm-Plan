import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Card, Modal, Spinner } from "react-bootstrap";
import { PageWrap } from '../PageWrap';
import "../Button.css";
import "./Wallet.css"
import Swal from 'sweetalert2';

import logo from "../../../images/Revolut-logo-1.gif"

import RevolutPay from "./RevolutPay"

import { connect } from "react-redux";
import WithdrawFunds from './stripe/WithdrawFunds';
import ConnectAccount from './stripe/ConnectAccount';
import AddPayment from './paystack/AddPayment';

// Loading component to be displayed while waiting for data
const SpinnerComponent = () => {
  return (
    <Spinner animation="border" />
  );
};

const PinComponent = (userID) => {
  const uid = userID.userID
  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  const [pin, setPin] = useState('');
  const [confirmationPin, setConfirmationPin] = useState('');
  const [message, setMessage] = useState('');

  const handleSetPin = async () => {
    if (pin === confirmationPin) {

      const response = await fetch(`${baseUrlDev}/v1/auth/set-pin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: uid, pin }),
    })
      const data = await response.json();
      setMessage(data.message);
      Swal.fire({
        title: 'Success!',
        text: 'Your Pin has been set!',
        icon: 'success',
      });
    } else {
      setMessage('PINs do not match. Please try again.');
    }

  };

  return (
    <div>
      <h3>Set Your Pin</h3>
      <Form>
        <Form.Group controlId="pin">
          <Form.Label>Enter Your PIN</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="confirm PIN"
            value={confirmationPin}
            onChange={(e) => setConfirmationPin(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSetPin}
        >
          Set
        </Button>
        <p>{message}</p>
      </Form>
    </div>
  );
};

const WithdrawComponent = (props) => {
  const [cardInfo, setCardInfo] = useState('');
  const [hasPin, setHasPin] = useState(false);

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  // Function to format card number and include bankName
const formatCardInfo = (cardNumber, bankName) => {
  if (cardNumber) {
    const lastFourDigits = cardNumber.slice(-4);
    const maskedCardNumber = 'xxxx-xxxx-xxxx-' + lastFourDigits;
    return { cardNumber: maskedCardNumber, bankName };
  }
  return { cardNumber: '', bankName }; // Return an empty string for cardNumber if it's empty
}

useEffect(() => {
  const fetchData = async () => {
    const endpoint = props.profile.region === 'Africa'
      ? `${baseUrlDev}/v1/payment/transfer-recipient-info`
      : `${baseUrlDev}/v1/payment/connected-account-info`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: props.profile.uid }),
      });

      if (!response) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data = await response.json();
      const formattedCardInfo = formatCardInfo(data.cardNumber, data.bankName);
        setCardInfo(formattedCardInfo);
    } catch (error) {
      console.error('Error fetching card number:', error);
    }
  };

  fetchData();
}, [props.profile]);
  
  
  // Fetch the user's PIN status from the backend
  useEffect(() => {
    // ...

    // Check if the user has set a PIN
    fetch(`${baseUrlDev}/v1/auth/has-pin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: props.profile.uid }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHasPin(data.hasPin); // Set the hasPin state based on the response
      })
      .catch((error) => {
        console.error('Error fetching PIN status:', error);
      });
  }, [props.profile]);

  
  return (
    <PageWrap goTo="/account" header="Wallet">

    <div className="page-container">
      <div className="d-flex flex-column">

        {/* payment method */}
        <Card className=" custom-card mb-3">
        {/* <div className="card-overlay"></div> */}
          <Card.Body>
            {cardInfo ? (
              <>
                <h5>Card Details</h5>
                <p className="card-details">{cardInfo.bankName}</p>
                <p className="card-details">{cardInfo.cardNumber}</p>
              </>
            ) : (
              <>
                <h3>{props.profile.region === 'Africa' ? 'Add Payment Method' : 'Add Payment Method'}</h3>
                {props.profile.region === 'Africa' ? <AddPayment userID={props.profile.uid} /> : <ConnectAccount userID={props.profile.uid} />}
              </>
            )}
          </Card.Body>
        </Card>

        <div className="d-flex flex-column flex-md-row">
          
          {/* Second Card */}
          <Card className="flex-grow-1 mb-3 mb-md-0">
            <Card.Body>
            {hasPin ? (
                // If the user has set a PIN, render the withdrawal component
                <>
                  <h5>Withdraw Fund</h5>
                  <WithdrawFunds userID={props.profile.uid} currency={props.profile.currency}/>
                </>
              ) : (
                // If the user has not set a PIN, render the PIN component
                <PinComponent userID={props.profile.uid} />
              )}
            
            </Card.Body>
          </Card>

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
 
export default connect(mapStateToProps)(WithdrawComponent);
