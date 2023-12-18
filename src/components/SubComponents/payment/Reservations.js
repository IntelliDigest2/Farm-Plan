import React, { useState, useEffect } from 'react';
import { Badge, ListGroup, Button, Card, Modal, Spinner } from "react-bootstrap";
import { PageWrap } from '../PageWrap';
import "../Button.css";
import "./Reservations.css"

import moment from 'moment';

import { connect } from "react-redux";
import ConfirmDelivery from '../../Pages/Account/Personal/Marketplace/MealPlanComp/Icons/ConfirmDelivery';

export const Reservations = (props) => {
  const [reservations, setReservations] = useState([]);

  console.log("profile", props.profile)

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  // Fetch the user's wallet balance from the backend
  useEffect(() => {

    fetch(`${baseUrlDev}/v1/payment/track-reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: props.profile.uid }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data received from res:", data.userReservations);
        if (data.userReservations) {
          setReservations(data.userReservations);
          console.log("print reservations:", reservations);

        } else {
          setReservations([]);
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

  console.log("xxreservations", reservations)
  console.log("xxreservations.length", reservations.length);
  console.log("xxxreservations", reservations);

  return (
   <>
    <p>Orders to be Sent</p>
      <div className="page-container">
        <div className="list-container">
          {reservations.length === 0 ? (
            <div className="no-reservations-message">No Item available</div>
          ) : (
            reservations.map((item, index) => (
              <div key={index} className={`list-item ${index !== 0 ? 'list-separator' : ''}`}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      <div className="d-flex align-items-center">
                        <span className={`item-operation ${item.status === "completed" ? "completed" : "pending"}`}>
                          {item.status || "pending"}
                        </span>
                        <span className="item-amount">
                          {item.convertedCurrency}{item.convertedTotalAmount}{' '}
                        </span>
                      </div>
                      <div className="cart-items">
                        {item.cartItems.map((cartItem, cartIndex) => (
                          <div key={cartIndex}>
                            {cartItem.data} {cartItem.quantity} ({item.orderID || measurementUnits[cartItem.measure] || cartItem.measure}) - {item.convertedCurrency} {cartItem.convertedPrice * cartItem.quantity}
                          </div>
                        ))}
                      </div>
  
                      <div className="date">
                      {item.cartItems.some(cartItem => cartItem.day_of_week) ? (
                        // Display cartItem.day_of_week if any cartItem has the day_of_week property
                        item.cartItems.map(cartItem => cartItem.day_of_week).join(', ')
                      ) : (
                        // Display estimated delivery if there is no cartItem with the day_of_week property
                        `Estimated Delivery is in ${moment(item.deliveryDueDate).fromNow(true)}`
                      )}
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
                            cartItems={item.cartItems}
                            receiversID={item.receiversID}
                            receiversName={item.receiversName}
                            currency={item.convertedCurrency}
                          />
                        ) : (
                          <></>
                        )}
  
                        
                      </div>
                    </Badge>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            ))
  
          )}

                  </div>
      </div>

   </>
  );
};

// const mapStateToProps = (state) => {
//     return {
//       profile: state.firebase.profile,
//     };
//   };
 
export default Reservations;