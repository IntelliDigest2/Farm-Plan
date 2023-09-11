import React, { useState, useEffect } from 'react';
import { Badge, ListGroup, Button, Card, Modal, Spinner } from "react-bootstrap";
import { PageWrap } from '../PageWrap';
import "../Button.css";
import "./Reservations.css"

import moment from 'moment';

import { connect } from "react-redux";
import ConfirmDelivery from '../../Pages/Account/Personal/Marketplace/MealPlanComp/Icons/ConfirmDelivery';

const Reservations = (props) => {
  const [reservations, setReservations] = useState([]);

  console.log("profile", props.profile)

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  // Fetch the user's wallet balance from the backend
  useEffect(() => {

    fetch(`${baseUrlProd}/v1/payment/track-reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: props.profile.uid }),
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.userReservations)) {
          setReservations(data.userReservations);
        } else {
          console.error('Invalid data format for reservations:', data);
        }
      })

      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  }, [props.profile]);  // Empty dependency array ensures this effect runs only once

  //console.log("transactions", transactions)

  const measurementUnits = {
    '&lt;unit>': 'unit', // Add other mappings as needed
  };

  return (
    <PageWrap goTo="/account" header="Wallet">

      <div className="page-container">
        <div className="list-container">
          {reservations.map((item, index) => (
            <div key={index} className={`list-item ${index !== 0 ? 'list-separator' : ''}`}>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    <div className="d-flex align-items-center">
                      <span className={`item-operation ${item.status === "completed" ? "completed" : "pending"}`}>
                        {item.status || "pending"}
                      </span>
                      <span className="item-amount">${item.totalAmount}</span>
                    </div>
                    <div className="cart-items">
                      {item.cartItems.map((cartItem, cartIndex) => (
                        <div key={cartIndex}>
                          {cartItem.data} {cartItem.quantity} ({measurementUnits[cartItem.measure] || cartItem.measure}) - ${cartItem.price * cartItem.quantity}
                        </div>
                      ))}
                    </div>

                    <div className="date">
                      {`Delivery due in ${moment(item.deliveryDueDate).fromNow(true)}`}
                    </div>
                  </div>
                  </div>
                  <Badge bg="primary" pill className="transaction-id">
                    <div className="transaction-id-content">
                      <span className="operation">{moment(item.createdAt).format("D MMM YYYY")}</span>
                      <span className="transaction-id">{item.trackingID}</span>
                      {item.status !== "completed" ? (
                        <ConfirmDelivery
                          trackingID={item.trackingID}
                          farmerID={item.farmerID}
                          farmerRef={item.farmerRef}
                        />
                      ) : (
                        <></>
                      )}

                      
                    </div>
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </div>
          ))}
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
 
export default connect(mapStateToProps)(Reservations);